// SPDX-License-Identifier: Apache-2.0
// Print the CHANGELOG.md section for one version, for GitHub Release notes.
// Usage: node scripts/changelog-section.mjs <x.y.z>
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const version = process.argv[2]
if (!version) {
  console.error('usage: node scripts/changelog-section.mjs <x.y.z>')
  process.exit(2)
}
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const lines = readFileSync(join(root, 'CHANGELOG.md'), 'utf8').split(/\r?\n/)
const start = lines.findIndex(l => l.startsWith(`## [${version}]`))
if (start < 0) {
  console.error(`CHANGELOG.md has no "## [${version}]" section`)
  process.exit(1)
}
const rest = lines.slice(start + 1)
const end = rest.findIndex(l => l.startsWith('## ['))
process.stdout.write(`${rest.slice(0, end < 0 ? rest.length : end).join('\n').trim()}\n`)
