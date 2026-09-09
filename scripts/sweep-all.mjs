// Sweep every plugin repo under a workspace root and write the evidence table.
// Usage: node sweep-all.mjs [<workspaceRoot>] [<out.md>]
import fs from 'node:fs'
import path from 'node:path'
import { scanRepo } from '../lib/scan.mjs'

const ROOT = path.resolve(process.argv[2] || '.')
const OUT = path.resolve(process.argv[3] || path.join(ROOT, 'scan-0.1.5-sweep.md'))
const SKIP = new Set(['adp-list', 'audit-dsh-infinite-gen-2', 'pan17-dsh-wechat', 'dsh-autotier', 'dsh-personal-directive'])
const dirs = fs.readdirSync(ROOT, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
  .filter(n => !n.startsWith('_') && !n.startsWith('.') && !SKIP.has(n))
  .filter(n => fs.existsSync(path.join(ROOT, n, 'package.json'))).sort()

const rows = []
for (const n of dirs) {
  const r = scanRepo(path.join(ROOT, n))
  const errors = r.hits.filter(h => h.severity === 'error')
  const warns = r.hits.filter(h => h.severity === 'warn')
  rows.push({ repo: n, files: r.files, errors: errors.length, warns: warns.length, errorSeams: [...new Set(errors.map(h => h.seam))].join(',') || '-' })
}
const L = []
L.push('# scan-0.1.5 · workspace sweep evidence')
L.push('')
L.push(`Generated ${new Date().toISOString()} · scanner \`scripts/scan-0.1.5.mjs\` · workspace \`${ROOT}\``)
L.push('')
L.push('All repos below were adapted to `0.1.5-alpha.1` by the 2026-09-09 wave. Error-severity hits are expected to be **zero**; warn-severity hits are heuristic leads for manual review (S1/S2/S10).')
L.push('')
L.push('| repo | files | errors | warns | error seams |')
L.push('|---|---|---|---|---|')
for (const r of rows) L.push(`| ${r.repo} | ${r.files} | ${r.errors} | ${r.warns} | ${r.errorSeams} |`)
L.push('')
const withErr = rows.filter(r => r.errors > 0)
L.push(`**Totals**: ${rows.length} repos · ${rows.reduce((a, r) => a + r.files, 0)} files · ${rows.reduce((a, r) => a + r.errors, 0)} error hits · ${rows.reduce((a, r) => a + r.warns, 0)} warn hits · repos with errors: ${withErr.length ? withErr.map(r => r.repo).join(', ') : 'none'}`)
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, L.join('\n'), 'utf8')
console.log(L.join('\n'))
