#!/usr/bin/env node
/**
 * scan-0.1.5.mjs — zero-dependency detector for the DSH `0.1.3-alpha.1 → 0.1.5-alpha.1`
 * plugin-adaptation seams.
 *
 * Why this exists: typecheck passing is NOT evidence of adaptation. Two classes of
 * failure survive a green local gate — (a) seams the published type line hides
 * because the repo compiles against stale types, and (b) seams whose tests are
 * mocked against the old shape. This scanner reports `file:line` facts for ten
 * seams measured against 40 real plugin repos during the 2026-09-09 wave, and
 * treats the "tsconfig silently resolves to the wrong types" case (M1) as a
 * first-class defect, not a warning.
 *
 * Usage:
 *   node scan-0.1.5.mjs [--repo <path>] [--json <out.json>] [--seams S3,S8,M1] [--quiet]
 *
 * Exit codes: 0 = no error-severity hit, 1 = at least one error-severity hit,
 *             2 = usage/scan failure.
 *
 * Provenance: evidence for every seam lives in the 2026-09-09 batch report
 * (40 plugin repos) and the per-repo cards produced by that wave. The scanner
 * ships in this package so a plugin author can re-measure their own repo; it
 * imports nothing outside Node's standard library.
 */

import fs from 'node:fs'
import path from 'node:path'

const SKIP_DIRS = new Set(['node_modules', 'lib', 'dist', '.git', '.tmp', 'coverage', '_scratch', '_archive', 'downloads', 'upstream', 'dev'])
const SCAN_EXT = /\.(ts|tsx|mts|cts|mjs|cjs|js|jsx|json|yml|yaml)$/

/** @typedef {{ id: string, title: string, severity: 'error'|'warn'|'info', action: string, test: RegExp }} Seam */

/** @type {Seam[]} */
export const SEAMS = [
  {
    id: 'S3',
    title: 'assistant/message 缺 stream（V3 必填）',
    severity: 'error',
    action: '写入会话日志的 assistant/message 必须带 `stream: []`（或真实分片）；缺了导入成功但会话不可续聊（Session.fromRestore 抛 invalid settlement fields）。',
    test: /assistant\/message/,
    // Only object construction / append calls, never comparisons or prose.
    lineFilter: line => /type\s*:\s*['"]assistant\/message['"]|append\(\s*['"]assistant\/message['"]|['"]assistant\/message['"]\s*,/.test(line),
    // Only production code that actually writes session logs, and only when the file
    // never mentions `stream` (comments excluded).
    fileCheck: (text, file) => !/(^|[\\/])(tests?|__tests__)[\\/]/.test(file) &&
      /(\.append\(|writeFileSync|writeFile\(|writeSync|persist)/.test(text) &&
      /assistant\/message/.test(text) && !/\bstream\b/.test(stripComments(text)),
  },
  {
    id: 'S8',
    title: 'SessionHandle.read() 返回形状（{eventState,events}）',
    severity: 'error',
    action: 'handle.read() 现在返回 SessionHandleReadResult；数组操作要改成 `(await handle.read()).events`。',
    test: /\.read\s*\([^)]*\)\s*\.\s*(filter|find|findLast|map|some|every|forEach|slice|length)\b|await\s+[\w.$]+\s*\.\s*read\s*\(/,
    // Only session-persistence handles are in scope (Web Streams readers also expose read()).
    fileCheck: text => /sessionPersistence|SessionHandle|session-persistence|handle\.read\b/.test(text),
    // A file that unwraps `.events` (property, destructuring, or a shared normalizer) is adapted.
    fileCheck2: text => {
      const awaitsRead = /await\s+[\w.$]+\s*\.\s*read\s*\(/.test(text)
      if (!awaitsRead) return true
      return !(/\.events\b/.test(text) || /\{[^}]*\bevents\b[^}]*\}\s*=\s*await/.test(text) || /normalizeReadResult/.test(text))
    },
  },
  {
    id: 'S9',
    title: 'SystemPrompt Config.persona 已改名',
    severity: 'error',
    action: '`persona` 改为 `personaPrefix` / `personaSuffix`（`includeHarnessIdentity: false` 不等价，会删 harness identity 段）。',
    test: /\{\s*persona\s*:|\bpersona\s*:\s*['"`]/,
    // `persona:` is only the SystemPrompt seam when the call site is a SystemPrompt mount.
    windowFilter: (lines, i) => lines.slice(Math.max(0, i - 3), i + 1).join('\n').includes('SystemPrompt'),
  },
  {
    id: 'M1',
    title: 'tsconfig 的 checkout 路径解析失败 → typecheck 静默回退',
    severity: 'error',
    action: 'tsconfig `paths` 指向不存在的目录时 TypeScript 会静默回退到 node_modules 的已发布类型，本地门禁变成假绿。路径应为 `../../../../deepseek-harness/packages/...`（相对仓库根）。',
    test: /__tsconfig_paths_probe__/,
  },
  {
    id: 'S4',
    title: 'tool/code-dispatch 已改名 tool/ptc-dispatch',
    severity: 'error',
    action: '事件名改为 `tool/ptc-dispatch`；旧标签在 V3 会话里不再被识别（保留双标签需归一化器）。',
    test: /tool\/code-dispatch/,
    // A file that also names `tool/ptc-dispatch` is handling the legacy alias on purpose.
    downgradeIf: text => /tool\/ptc-dispatch/.test(text),
  },
  {
    id: 'S5',
    title: 'ctx.agent 已移除',
    severity: 'error',
    action: '调用方必须显式传 Agent（如 `setup(agentCtx, agent)` 的第 2 参），不要读 `ctx.agent`。',
    test: /ctx\.agent\b|ctx\['agent'\]|ctx\.get\(\s*['"]agent['"]\s*\)/,
    // Deliberate back-compat fallbacks are legitimate while the old peer band is supported.
    downgradeIf: text => /legacy|0\.1\.4|backward|back-compat|compat/i.test(text),
  },
  {
    id: 'S6',
    title: 'Inbox 已改为类型接口',
    severity: 'error',
    action: '`Inbox` 不再可构造；夹具改用官方 unsupportedInbox() 形状，运行时用 `agent.inbox`。',
    test: /\bnew\s+Inbox\s*\(|import\s*\{[^}]*\bInbox\b[^}]*\}\s*from\s*['"]@deepseek-ai\/dsh-agent['"]/,
    // A harness pinned to a pre-0.1.5 ruler may still construct Inbox on purpose.
    downgradeIf: text => /0\.1\.3|0\.1\.2|pinned|legacy/i.test(text),
  },
  {
    id: 'S7',
    title: 'SubprocessHandle.pid 已移除',
    severity: 'warn',
    action: 'handle 不再有 `pid`（只剩 SubprocessTerminalHandle.pid）；测试夹具删掉该字段。',
    test: /\bpid\s*:\s*\d+|\.pid\b/,
    // Node ChildProcess.pid and plugin-owned process info also match: keep this advisory.
    downgradeIf: () => true,
  },
  {
    id: 'S2',
    title: 'EpochHeader.system 已移除（系统提示词进消息历史）',
    severity: 'warn',
    action: '系统提示词现在是 surface node 0 的 `system/message`；`request/header.system` 只在旧线存在，读取方需要结构式回退。',
    test: /header\.system\b|EpochHeader/,
  },
  {
    id: 'S1',
    title: '会话格式 V3 / 日志文件名世代化',
    severity: 'warn',
    action: '当前世代是 `session.v3.jsonl.zstd`；硬编码 `session.jsonl.zstd` 的读写脚本会静默失效（建议从新到旧枚举 vN）。',
    test: /SESSION_FORMAT_VERSION|session\.jsonl(?!\.v\d)/,
  },
  {
    id: 'S10',
    title: '插件自建会话事件必须走自适应门',
    severity: 'warn',
    action: '宿主事件词表 fail-closed 且 `Session.append` 无 `ignorable` 写入通道；无条件 append 会让会话不可读，请保留"探测后降级"的写法。',
    test: /SessionEventMap|\.append\(/,
  },
]

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

/** Strip comment-only lines so prose never satisfies a code-level check. */
function stripComments(text) {
  return text.split(/\r?\n/).filter(l => !/^\s*(?:\/\/|\/\*|\*|#)/.test(l)).join('\n')
}

/** M1: resolve every `paths` entry; a missing target means silent fallback. */
function checkTsconfigPaths(repoDir, imports) {
  const hits = []
  const files = fs.readdirSync(repoDir).filter(f => /^tsconfig.*\.json$/.test(f))
  for (const f of files) {
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
        // Wildcard aliases (`.../lib/types/*`) are checked at their static prefix.
        const probe = t.includes('*') ? t.slice(0, t.indexOf('*')) : t
        const resolved = path.resolve(base, probe)
        if (!fs.existsSync(resolved)) {
          hits.push({
            seam: 'M1', severity: 'error', file: path.join(repoDir, f), line: 1,
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
      if (seam.id === 'M1') continue // handled separately (structured, not regex)
      if (seam.fileCheck && !seam.fileCheck(text, file)) continue
      if (seam.fileCheck2 && !seam.fileCheck2(text, file)) continue
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim()
        // Comment-only lines carry prose, not code: never a seam hit.
        if (/^(?:\/\/|\/\*|\*|#)/.test(trimmed)) continue
        if (!seam.test.test(lines[i])) continue
        if (seam.lineFilter && !seam.lineFilter(lines[i])) continue
        if (seam.windowFilter && !seam.windowFilter(lines, i)) continue
        // S7 is noisy: only report when the file is about subprocess handles.
        if (seam.id === 'S7' && !/Subprocess|subprocess/.test(text)) continue
        // S6 only for value imports / constructor calls, never type-only.
        if (seam.id === 'S6' && /import\s+type\s*\{/.test(lines[i])) continue
        // S9 only in a SystemPrompt-ish context or a test harness.
        if (seam.id === 'S9' && !/SystemPrompt|system-prompt|systemPrompt/.test(text)) continue
        const downgraded = seam.downgradeIf ? seam.downgradeIf(text) : false
        hits.push({
          seam: seam.id, severity: downgraded ? 'warn' : seam.severity, file, line: i + 1,
          snippet: lines[i].trim().slice(0, 200),
          detail: downgraded ? `${seam.title} (legacy alias handling — verify it is intentional)` : seam.title,
        })
      }
    }
  }
  if (!wanted || wanted.has('M1')) hits.push(...checkTsconfigPaths(repoDir, imports))
  const bySeam = {}
  for (const h of hits) bySeam[h.seam] = (bySeam[h.seam] || 0) + 1
  return { repo: repoDir, scannedAt: new Date().toISOString(), files, hits, bySeam }
}

/** Human-readable rendering. */
export function render(report) {
  const L = []
  L.push(`# scan-0.1.5 · ${report.repo}`)
  L.push(`files scanned: ${report.files} · hits: ${report.hits.length}`)
  if (!report.hits.length) { L.push('no seam hits — still verify with real-host smoke (this scanner is necessary, not sufficient)'); return L.join('\n') }
  const order = ['S3', 'S8', 'S9', 'M1', 'S4', 'S5', 'S6', 'S7', 'S2', 'S1', 'S10']
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
    else if (a === '--help' || a === '-h') { console.log('usage: node scan-0.1.5.mjs [--repo <path>] [--json <out.json>] [--seams S3,S8,M1] [--quiet]'); return 0 }
    else { console.error(`unknown argument: ${a}`); return 2 }
  }
  const repoDir = path.resolve(args.repo)
  if (!fs.existsSync(repoDir)) { console.error(`repo not found: ${repoDir}`); return 2 }
  const report = scanRepo(repoDir, { seams: args.seams })
  if (!args.quiet) console.log(render(report))
  if (args.json) fs.writeFileSync(path.resolve(args.json), JSON.stringify(report, null, 1), 'utf8')
  return report.hits.some(h => h.severity === 'error') ? 1 : 0
}

if (process.argv[1]?.endsWith('scan.mjs') || process.argv[1]?.endsWith('scan-0.1.5.mjs')) {
  process.exit(main(process.argv.slice(2)))
}
