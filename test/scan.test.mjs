// SPDX-License-Identifier: Apache-2.0
// Self-test for lib/scan.mjs — synthetic bad/good fixtures plus a live negative
// on a family repo that is already pinned to the 0.1.5-rc.1 line. Run: node --test
import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { scanRepo, SEAMS, SEAM_IDS, CARD_ONLY } from '../lib/scan.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const bad = path.join(root, 'fixtures', 'bad-repo')
const good = path.join(root, 'fixtures', 'good-repo')

test('scanner catalog covers every documented seam id, in card order', () => {
  assert.deepEqual(SEAM_IDS, ['C1', 'C2', 'C3', 'C4', 'C5', 'H1', 'H2', 'H3', 'H4', 'P1'])
})

test('exactly one seam is card-only (H3), and it never produces a hit', () => {
  // C3 and P1 also carry `test: null`, but they run dedicated structured
  // detectors; H3 is the only seam with no detector at all.
  assert.deepEqual(CARD_ONLY, ['H3'])
  assert.equal(SEAMS.find(s => s.id === 'H3').severity, 'info')
  const report = scanRepo(bad)
  assert.equal(report.hits.filter(h => h.seam === 'H3').length, 0, 'H3 must never be auto-detected')
})

test('bad fixture: every error seam of the corridor is flagged', () => {
  const report = scanRepo(bad)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual(
    [...new Set(errors.map(h => h.seam))].sort(),
    ['C1', 'C2', 'C3', 'P1'],
    `error seams: ${[...new Set(errors.map(h => h.seam))].join(',')}`,
  )
  const bySeam = {}
  for (const h of errors) bySeam[h.seam] = (bySeam[h.seam] || 0) + 1
  assert.deepEqual(bySeam, { C1: 3, C2: 2, C3: 2, P1: 1 })
})

test('bad fixture: the advisory seams are reported as leads, never as errors', () => {
  const report = scanRepo(bad)
  const advisories = report.hits.filter(h => h.severity !== 'error')
  for (const id of ['C4', 'C5', 'H1', 'H2', 'H4']) {
    assert.ok(advisories.some(h => h.seam === id), `expected advisory ${id}`)
  }
  assert.ok(!advisories.some(h => h.seam === 'C1' || h.seam === 'P1'))
})

test('bad fixture: C1 catches the multi-line inject form, not only the one-liner', () => {
  const report = scanRepo(bad, { seams: ['C1'] })
  assert.equal(report.hits.length, 3)
  const lines = report.hits.map(h => h.line).sort((a, b) => a - b)
  assert.deepEqual(lines, [12, 17, 18], 'both the key line and the register line of the multi-line block must hit')
})

test('bad fixture: C3 names both causes (stale pin and unresolvable paths)', () => {
  const report = scanRepo(bad, { seams: ['C3'] })
  assert.equal(report.hits.length, 2, 'one stale devDependency pin and one stale tsconfig alias')
  const details = report.hits.map(h => h.detail).join('\n')
  assert.match(details, /pinned at the 0\.1\.5-alpha line/)
  assert.match(details, /does not exist/)
  assert.match(details, /falls back/)
  assert.ok(report.hits.every(h => h.severity === 'error'))
})

test('bad fixture: P1 fails the collapsed peer band and leaves the two-segment one alone', () => {
  const report = scanRepo(bad, { seams: ['P1'] })
  assert.equal(report.hits.length, 1)
  assert.equal(report.hits[0].severity, 'error')
  assert.match(report.hits[0].snippet, />=0\.1\.2-rc\.1 <0\.2\.0/)
  assert.match(report.hits[0].detail, /prerelease-tuple/)
})

test('good fixture: an adapted client half produces zero error-severity hits', () => {
  const report = scanRepo(good)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual(errors, [], `unexpected error hits: ${JSON.stringify(errors, null, 1)}`)
})

test('good fixture: the rc.1 targets are recognized, so the catalog is not just silent', () => {
  const report = scanRepo(good)
  const ids = new Set(report.hits.map(h => h.seam))
  assert.ok(!ids.has('C1'), 'main.conversation must not be read as the deleted bare key')
  assert.ok(!ids.has('C2'))
  assert.ok(!ids.has('C3'), 'a resolvable paths alias and an rc.1 pin must pass C3')
  assert.ok(!ids.has('P1'))
})

test('the scan is read-only: the fixture tree is untouched apart from --json targets', () => {
  const before = fs.readdirSync(bad).sort()
  scanRepo(bad)
  assert.deepEqual(fs.readdirSync(bad).sort(), before)
})

test('live negative: a family repo already pinned to 0.1.5-rc.1 has no error-severity hits', (t) => {
  const live = path.resolve(root, '..', 'dsh-autotier')
  if (!fs.existsSync(live)) { t.skip('sibling repo dsh-autotier not present (standalone checkout)'); return }
  const report = scanRepo(live)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual(errors, [], `${'dsh-autotier'} should be clean, got: ${errors.slice(0, 5).map(h => `${h.seam} ${h.file}:${h.line}`).join(' | ')}`)
})
