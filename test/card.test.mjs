// SPDX-License-Identifier: Apache-2.0
// The evidence-binding gate: the version card and the scanner catalog are two
// renderings of ONE catalog, so their seam ids and severities must match
// exactly. Without this test the card and `lib/scan.mjs` drift silently, which
// is the failure mode the corridor rules exist to prevent.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SEAMS, SEAM_IDS, CARD_ONLY } from '../lib/scan.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const cardPath = path.join(root, 'skills', 'plugin-upgrade-015rc1', 'references', 'v0.1.5-alpha.1-to-v0.1.5-rc.1.md')
const card = readFileSync(cardPath, 'utf8')

/** The catalog section of the card: `## 2. …` up to the next `## `. */
function catalogSection(text) {
  const lines = text.split(/\r?\n/)
  const start = lines.findIndex(l => l.startsWith('## 2.'))
  assert.ok(start >= 0, 'the card must keep its numbered catalog section (`## 2.`)')
  const rest = lines.slice(start + 1)
  const end = rest.findIndex(l => l.startsWith('## '))
  return rest.slice(0, end < 0 ? rest.length : end).join('\n')
}

const section = catalogSection(card)
const rows = [...section.matchAll(/^\|\s*`([CHP]\d+)`\s*\|\s*\*{0,2}(error|warn|info)\*{0,2}\s*\|/gmu)]
  .map(m => ({ id: m[1], severity: m[2] }))

test('the card names exactly the catalog seams, in catalog order', () => {
  assert.deepEqual(rows.map(r => r.id), SEAM_IDS)
})

test('the card states each seam severity exactly as the catalog does', () => {
  assert.deepEqual(
    rows.map(r => `${r.id}:${r.severity}`),
    SEAMS.map(s => `${s.id}:${s.severity}`),
  )
})

test('the card declares the locked corridor and the id-parity rule it is bound by', () => {
  assert.match(card, /^# 版本卡 · `0\.1\.5-alpha\.1` → `0\.1\.5-rc\.1`/m)
  assert.match(card, /只对 `0\.1\.5-alpha\.1 → 0\.1\.5-rc\.1` 负责/)
  assert.match(card, /姊妹走廊/)
})

test('the card carries the C1 rewrite recipe and records that upstream shipped no deprecation note', () => {
  assert.match(card, /main\.conversation/)
  assert.match(card, /没有别名/)
  assert.match(card, /deprecation/)
  assert.match(card, /公开扩展点的破坏性移除/)
})

test('the card is honest about the family-side blast radius being latent', () => {
  assert.match(card, /latent|潜在破坏/)
  assert.match(card, /8\*\* 个 slot key|只用 \*\*8\*\*/)
})

test('the card-only seam is documented on the card', () => {
  for (const id of CARD_ONLY) assert.match(section, new RegExp(`\\|\\s*\`${id}\`\\s*\\|`))
})

test('the skill directory, the frontmatter name and the bundle default agree', () => {
  const skill = readFileSync(path.join(root, 'skills', 'plugin-upgrade-015rc1', 'SKILL.md'), 'utf8')
  assert.match(skill, /^name: plugin-upgrade-015rc1$/m)
  assert.match(skill, /^  corridor: "0\.1\.5-alpha\.1 -> 0\.1\.5-rc\.1"$/m)
  const patch = readFileSync(path.join(root, 'cordis.patch.yml'), 'utf8')
  assert.match(patch, /skillName: plugin-upgrade-015rc1/)
  const entry = readFileSync(path.join(root, 'index.mjs'), 'utf8')
  assert.match(entry, /default\('plugin-upgrade-015rc1'\)/, 'the Config default must name the packaged skill')
})
