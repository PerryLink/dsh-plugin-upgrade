#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
/**
 * scan-0.1.5-rc1.mjs — zero-dependency detector for the DSH `0.1.5-alpha.1 →
 * 0.1.5-rc.1` plugin-adaptation seams.
 *
 * Why this exists: this corridor's breakage is mostly *silent*. The bare
 * `conversation` slot was deleted with no alias, and `ctx.slots.inject()`
 * only runs its callback when the declaration exists — so a client half that
 * still targets it stops mounting without an error, a log line or a failed
 * build. A green local gate is therefore NOT evidence of adaptation: the
 * published type line hides the deletion entirely.
 *
 * The catalog below is the single source of truth shared by the version card,
 * the packaged skill and this CLI. `test/card.test.mjs` fails when the card and
 * this catalog disagree about the seam ids.
 *
 * Usage:
 *   node scan-0.1.5-rc1.mjs [--repo <path>] [--json <out.json>] [--seams C1,P1] [--quiet]
 *
 * Exit codes: 0 = no error-severity hit, 1 = at least one error-severity hit,
 *             2 = usage/scan failure.
 *
 * Provenance: every upstream fact behind a seam was re-read from the harness
 * checkout on 2026-09-10 and recorded with `path:line` in
 * `docs/EVIDENCE.md` and in the version card
 * (`skills/plugin-upgrade-015rc1/references/v0.1.5-alpha.1-to-v0.1.5-rc.1.md`).
 * This scanner ships so a plugin author can re-measure their own repository; it
 * imports nothing outside Node's standard library and never writes inside the
 * scanned tree.
 */

import fs from 'node:fs'
import path from 'node:path'

const SKIP_DIRS = new Set(['node_modules', 'lib', 'dist', '.git', '.tmp', 'coverage', '_scratch', '_archive', 'downloads', 'upstream', 'dev'])
const SCAN_EXT = /\.(ts|tsx|mts|cts|mjs|cjs|js|jsx|json|yml|yaml)$/

/**
 * @typedef {object} Seam
 * @property {string} id
 * @property {string} title
 * @property {'error'|'warn'|'info'} severity
 * @property {string} action
 * @property {RegExp|null} test  null = card-only seam, deliberately not detected
 * @property {(line: string) => boolean} [lineFilter]
 * @property {(lines: string[], i: number) => boolean} [windowFilter]
 */

/** @type {Seam[]} */
export const SEAMS = [
  {
    id: 'C1',
    title: '裸 slot `conversation` 已删除（无别名）→ UI 静默不挂载',
    severity: 'error',
    action: '把 `ctx.slots.inject(\'conversation\', …)` / `slots.register({ name: \'conversation\' })` 改写成 `main.conversation`（会话内容位）或 `main`（全局中央面板，需 `key`）。rc.1 没有别名，也没有 deprecation 说明：回调永不执行，插件 UI 消失且没有任何报错。',
    test: /['"]conversation['"]/,
    // Same-line and multi-line call forms both count; the key must sit in a
    // slot-facing context, never in prose or an unrelated settings string.
    windowFilter: (lines, i) => {
      const win = lines.slice(Math.max(0, i - 2), i + 2).join('\n')
      return /\.inject\s*\(/.test(win) || /register\s*\(\s*\{/.test(win) || /name\s*:\s*['"]conversation['"]/.test(win)
    },
  },
  {
    id: 'C2',
    title: 'npm 包改名：`dsh-client-ui-sidebar-textpreview` → `…-sidebar-documentpreview`',
    severity: 'error',
    action: '把 peer / optional peer / import / lockfile 里的 `@deepseek-ai/dsh-client-ui-sidebar-textpreview` 改为 `@deepseek-ai/dsh-client-ui-sidebar-documentpreview`。旧名在 rc.1 的 `packages/client/` 下已不存在，也没有 shim 包；做文档预览的插件改注册到 `sidebar.right.tab.document`。',
    test: /sidebar-textpreview/,
  },
  {
    id: 'C3',
    title: '本地门禁编译的是 alpha.1 类型线（client 侧假绿）',
    severity: 'error',
    action: 'dev/test 依赖钉在 `0.1.5-alpha.1`（或 `alpha.2`）、或 `tsconfig` `paths` 指向不存在的 checkout 目录时，TypeScript 会静默回退到旧类型：rc.1 删掉的 slot key 在本地仍然「编译通过」。把 dev/test 依赖钉到 `0.1.5-rc.1`，并保证每条 checkout 别名都能解析。',
    test: null,
  },
  {
    id: 'C4',
    title: 'rc.1 新增全局面板模型，且每个 slot 多一个 `usePanelInfo` 标准 prop',
    severity: 'warn',
    action: '纯增量：rc.1 给几乎每个 slot 的 standardProps 追加了 `usePanelInfo: UsePanelInfo`（47 个文件提及），并新增 `main`（keyed/root）、`sidebar.panellist`（list/root）、`ctx.layout.selectPanel(MainPanelId | null)`、`ctx.layout.beginNavigation()`。用官方 `ComposedProps` 的仓零改动；手写 props 接口的组件需要复核。',
    test: /usePanelInfo|selectPanel\(|sidebar\.panellist|MainPanelId|beginNavigation\(/,
  },
  {
    id: 'C5',
    title: '右侧文档预览迁到 keyed slot `sidebar.right.tab.document`',
    severity: 'warn',
    action: 'TextPreview 的行为迁到 `sidebar.right.tab.document`（keyed/session，ownerProps = `DocumentContent`）。`sidebar.right.pane.tab` / `.title` 仍然存在，但 `declaredBy` 从 `rightbar` 变成 `rightbar.session`：inject `rightbar` 取得 pane 的插件要复核注入目标。',
    test: /sidebar\.right\.pane\.tab|TextPreview|DocumentContent/,
  },
  {
    id: 'H1',
    title: 'fail-closed 会话事件词表新增两个类型',
    severity: 'warn',
    action: '`KNOWN_SESSION_EVENT_TYPES` 新增 `deliverables/presented` 与 `subagent/catalog`。枚举过该词表、或自建事件白名单 / 计数快照的读取方要重新快照；否则新事件从「未知跳过」变成进入 surface，计数与渲染都会变。',
    test: /KNOWN_SESSION_EVENT_TYPES|deliverables\/presented|subagent\/catalog/,
  },
  {
    id: 'H2',
    title: '新工具 `present` 占用了 tool view 的 key `\'present\'`',
    severity: 'warn',
    action: 'rc.1 的新工具 `present` 自带 PresentRow，注册在 `tool.call.toolview` 的 key `\'present\'`（`packages/client/ui-deliverables/src/client/index.ts:62`），并且 `present` 因此进入 `conversation.chat.node` 的 already-taken keyDomain（`grep` 与 `read` 之间）。alpha.1 时该 key 是空闲的：已占用它的插件会被官方行顶掉，请换 key。',
    test: /['"]present['"]/,
    lineFilter: line => /toolview|tool\.call|chat\.node|key\s*:\s*['"]present['"]/.test(line),
  },
  {
    id: 'H3',
    title: 'rc.1 新增可选能力（纯增量，卡片列出，不做自动检测）',
    severity: 'info',
    action: '`ctx.sessionFeedback`（`command-feedback`）；`ctx.layout.selectPanel()` / `beginNavigation()`；`ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`；新品牌类型 `MainPanelId`。全部是增量：不接入不会有任何破坏，接入是可选收益。本接缝刻意没有自动检测。',
    test: null,
  },
  {
    id: 'H4',
    title: 'DeepSeek 适配器的默认咨询模型目录改以 `deepseek-flash` 打头',
    severity: 'info',
    action: 'rc.1 起 `llm-deepseek` 的默认 `models` 目录第一项是 `deepseek-flash`（name `DeepSeek-V41-Flash`，commit `bc5fd3b8dc`），README 的 `models` 默认行同步改为「V41 Flash + V4 Flash + V4 Pro + V4 Flash Vision Exp」。硬编码模型 id、或假定目录首项即默认模型的插件复核。',
    test: /['"]deepseek-(?:chat|reasoner|v[0-9][a-z0-9.-]*|flash[a-z0-9.-]*)['"]/,
  },
  {
    id: 'P1',
    title: 'peer 区间缺了第二段 → `0.1.5-rc.1` 被 semver 拒绝',
    severity: 'error',
    action: '`>=0.1.2-rc.1 <0.2.0` 单段在 semver 下**不满足** `0.1.5-rc.1`（实测 semver 7.8.5 → false）：npm 的 prerelease-tuple 规则只在同一 `[major,minor,patch]` 元组上存在带 prerelease 的 comparator 时才放行。必须保留 `|| >=0.1.5-alpha.1 <0.2.0` 这一段，rc.1 适配**不改** peer 区间。',
    test: null,
  },
]

/** Seam ids in card order; the version card must name exactly this set. */
export const SEAM_IDS = SEAMS.map(s => s.id)

/** Seams implemented structurally (not by regex), like the sibling card's M1. */
const STRUCTURED = new Set(['C3', 'P1'])

/**
 * Seams that are documented on the card and id-parity checked, but deliberately
 * have no automatic detection (pure additive capabilities).
 */
export const CARD_ONLY = SEAMS.filter(s => s.test === null && !STRUCTURED.has(s.id)).map(s => s.id)

function* walk(dir, depth = 0) {
  if (depth > 8) return
  let ents
  try { ents = fs.readdirSync(dir, { withFileTypes: true }) } catch { return }
  for (const e of ents) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      yield* walk(path.join(dir, e.name), depth + 1)
    } else if (SCAN_EXT.test(e.name)) {
      yield path.join(dir, e.name)
    }
  }
}

/** 1-based line number of the first line containing `needle`, or 1. */
function lineOf(text, needle) {
  const lines = text.split(/\r?\n/)
  const i = lines.findIndex(l => l.includes(needle))
  return i < 0 ? 1 : i + 1
}

/** Read and parse the repository's top-level package.json, or null. */
function readManifest(repoDir) {
  const file = path.join(repoDir, 'package.json')
  try { return { file, text: fs.readFileSync(file, 'utf8'), json: JSON.parse(fs.readFileSync(file, 'utf8')) } } catch { return null }
}

/**
 * C3 — the client-side false green. Two independent causes:
 *   (a) a `@deepseek-ai/*` dev/test dependency pinned one hop behind, at the
 *       `0.1.5-alpha.*` line, so local typecheck cannot see rc.1's deletions;
 *   (b) a `tsconfig` `paths` alias that points at a checkout directory which
 *       does not exist, where TypeScript silently falls back to node_modules.
 * @param {string} repoDir
 * @param {Set<string>} imports bare `@deepseek-ai/*` specifiers the repo imports
 */
function checkClientTypeLine(repoDir, imports) {
  const hits = []
  const manifest = readManifest(repoDir)
  if (manifest) {
    const dev = manifest.json.devDependencies && typeof manifest.json.devDependencies === 'object' ? manifest.json.devDependencies : {}
    for (const [dep, spec] of Object.entries(dev)) {
      if (!dep.startsWith('@deepseek-ai/')) continue
      if (typeof spec !== 'string') continue
      // Exact-ish pins on the alpha line only: a deliberate range that still
      // covers rc.1 (`>=0.1.2-rc.1 <0.2.0 || >=0.1.5-alpha.1 <0.2.0`) is fine.
      if (!/^[\^~]?0\.1\.5-alpha\.[12]$/.test(spec.trim())) continue
      hits.push({
        seam: 'C3', severity: 'error', file: manifest.file, line: lineOf(manifest.text, `"${dep}"`),
        snippet: `"${dep}": "${spec}"`,
        detail: `dev/test types are pinned at the 0.1.5-alpha line (${spec}) → local typecheck cannot see the rc.1 slot catalog (green gate is fake)`,
      })
    }
  }
  const names = (() => { try { return fs.readdirSync(repoDir).filter(f => /^tsconfig.*\.json$/.test(f)) } catch { return [] } })()
  for (const f of names) {
    const full = path.join(repoDir, f)
    let json
    try { json = JSON.parse(fs.readFileSync(full, 'utf8')) } catch { continue }
    const opts = json.compilerOptions || {}
    const paths = opts.paths
    if (!paths || typeof paths !== 'object') continue
    const base = path.resolve(repoDir, opts.baseUrl || '.')
    for (const [alias, targets] of Object.entries(paths)) {
      if (!Array.isArray(targets)) continue
      for (const t of targets) {
        if (typeof t !== 'string') continue
        // Only checkout-style aliases are in scope: they must point at the harness tree.
        const looksCheckout = /(?:^|\/)(?:packages|vendor)\//.test(t) || t.includes('deepseek-harness')
        if (!looksCheckout) continue
        // An alias the repo never imports cannot cause a false green: skip it.
        const aliasBase = alias.replace(/\/\*$/, '')
        if (imports && imports.size && !imports.has(aliasBase)) continue
        const probe = t.includes('*') ? t.slice(0, t.indexOf('*')) : t
        const resolved = path.resolve(base, probe)
        if (!fs.existsSync(resolved)) {
          hits.push({
            seam: 'C3', severity: 'error', file: full, line: 1,
            snippet: `"${alias}": ["${t}"]`,
            detail: `resolves to ${resolved} which does not exist → TypeScript silently falls back to node_modules (green gate is fake)`,
          })
        }
      }
    }
  }
  return hits
}

/**
 * P1 — the peer band must keep its second segment. `>=0.1.2-rc.1 <0.2.0` alone
 * rejects `0.1.5-rc.1` under npm semver's prerelease-tuple rule.
 * @param {string} repoDir
 */
function checkPeerBand(repoDir) {
  const hits = []
  const manifest = readManifest(repoDir)
  if (!manifest) return hits
  const peers = manifest.json.peerDependencies && typeof manifest.json.peerDependencies === 'object' ? manifest.json.peerDependencies : {}
  for (const [dep, spec] of Object.entries(peers)) {
    if (!dep.startsWith('@deepseek-ai/dsh-')) continue
    if (typeof spec !== 'string') continue
    const text = spec.trim()
    if (!/0\.1\.2-rc\.1/.test(text)) continue
    if (/0\.1\.5-alpha\.1/.test(text) || /0\.1\.5-rc\.1/.test(text)) continue
    hits.push({
      seam: 'P1', severity: 'error', file: manifest.file, line: lineOf(manifest.text, `"${dep}"`),
      snippet: `"${dep}": "${text}"`,
      detail: 'peer band lost its `>=0.1.5-alpha.1 <0.2.0` segment → 0.1.5-rc.1 is rejected by semver\'s prerelease-tuple rule (measured false on semver 7.8.5)',
    })
  }
  return hits
}

/**
 * Scan one repo.
 * @param {string} repoDir
 * @param {{ seams?: string[] }} [options]
 * @returns {{ repo: string, scannedAt: string, files: number, hits: any[], bySeam: Record<string, number> }}
 */
export function scanRepo(repoDir, options = {}) {
  const wanted = options.seams && options.seams.length ? new Set(options.seams) : null
  const hits = []
  const imports = new Set()
  let files = 0
  for (const file of walk(repoDir)) {
    files++
    let text
    try { text = fs.readFileSync(file, 'utf8') } catch { continue }
    for (const m of text.matchAll(/(?:from|require\()\s*['"](@deepseek-ai\/[^'"]+)['"]/g)) imports.add(m[1])
    const lines = text.split(/\r?\n/)
    for (const seam of SEAMS) {
      if (wanted && !wanted.has(seam.id)) continue
      if (seam.test === null) continue // card-only seam
      if (STRUCTURED.has(seam.id)) continue // handled separately (structured, not regex)
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim()
        // Comment-only lines carry prose, not code: never a seam hit.
        if (/^(?:\/\/|\/\*|\*|#)/.test(trimmed)) continue
        if (!seam.test.test(lines[i])) continue
        if (seam.lineFilter && !seam.lineFilter(lines[i])) continue
        if (seam.windowFilter && !seam.windowFilter(lines, i)) continue
        hits.push({
          seam: seam.id, severity: seam.severity, file, line: i + 1,
          snippet: lines[i].trim().slice(0, 200),
          detail: seam.title,
        })
      }
    }
  }
  if (!wanted || wanted.has('C3')) hits.push(...checkClientTypeLine(repoDir, imports))
  if (!wanted || wanted.has('P1')) hits.push(...checkPeerBand(repoDir))
  const bySeam = {}
  for (const h of hits) bySeam[h.seam] = (bySeam[h.seam] || 0) + 1
  return { repo: repoDir, scannedAt: new Date().toISOString(), files, hits, bySeam }
}

/** Human-readable rendering. Error group first, advisory seams after. */
export function render(report) {
  const L = []
  L.push(`# scan-0.1.5-rc1 · ${report.repo}`)
  L.push(`files scanned: ${report.files} · hits: ${report.hits.length}`)
  const order = ['C1', 'C2', 'C3', 'P1', 'C4', 'C5', 'H1', 'H2', 'H4']
  if (!report.hits.length) {
    L.push('no seam hits — still verify with a real-host smoke AND a real browser assertion for the client half')
    L.push('(this scanner is necessary, not sufficient: the rc.1 breakage this corridor covers is silent)')
  }
  for (const id of order) {
    const group = report.hits.filter(h => h.seam === id)
    if (!group.length) continue
    const seam = SEAMS.find(s => s.id === id)
    L.push('')
    L.push(`## ${id} [${seam.severity}] ${seam.title} — ${group.length} hit(s)`)
    L.push(`   action: ${seam.action}`)
    for (const h of group.slice(0, 12)) L.push(`   ${path.relative(process.cwd(), h.file)}:${h.line}  ${h.snippet}`)
    if (group.length > 12) L.push(`   ... ${group.length - 12} more`)
  }
  L.push('')
  L.push('H3 [info] card-only: the rc.1 additive capabilities are listed on the version card and are never auto-detected.')
  return L.join('\n')
}

export function main(argv) {
  const args = { repo: process.cwd(), json: null, seams: null, quiet: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--repo') args.repo = argv[++i]
    else if (a === '--json') args.json = argv[++i]
    else if (a === '--seams') args.seams = String(argv[++i]).split(',').map(s => s.trim()).filter(Boolean)
    else if (a === '--quiet') args.quiet = true
    else if (a === '--help' || a === '-h') { console.log('usage: node scan-0.1.5-rc1.mjs [--repo <path>] [--json <out.json>] [--seams C1,P1] [--quiet]'); return 0 }
    else { console.error(`unknown argument: ${a}`); return 2 }
  }
  const repoDir = path.resolve(args.repo)
  if (!fs.existsSync(repoDir)) { console.error(`repo not found: ${repoDir}`); return 2 }
  const report = scanRepo(repoDir, { seams: args.seams })
  if (!args.quiet) console.log(render(report))
  if (args.json) fs.writeFileSync(path.resolve(args.json), JSON.stringify(report, null, 1), 'utf8')
  return report.hits.some(h => h.severity === 'error') ? 1 : 0
}

if (process.argv[1]?.endsWith('scan.mjs') || process.argv[1]?.endsWith('scan-0.1.5-rc1.mjs')) {
  process.exit(main(process.argv.slice(2)))
}
