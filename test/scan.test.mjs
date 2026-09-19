// SPDX-License-Identifier: Apache-2.0
// Self-test for lib/scan.mjs — synthetic bad/good fixtures for BOTH legs of the
// merged corridor (leg A `0.1.3-alpha.1 -> 0.1.5-alpha.1` in fixtures/leg-a-*,
// leg B `0.1.5-alpha.1 -> 0.1.5-rc.1` in fixtures/bad-repo + fixtures/good-repo),
// the `--seams` filter, and a live negative on a family repo pinned to the rc.1
// line. Run: node --test
import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { scanRepo, render, SEAMS, SEAM_IDS, CARD_ONLY } from '../lib/scan.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const cli = path.join(root, 'scripts', 'scan-0.1.5.mjs')
const legBBad = path.join(root, 'fixtures', 'bad-repo')
const legBGood = path.join(root, 'fixtures', 'good-repo')
const legABad = path.join(root, 'fixtures', 'leg-a-bad-repo')
const legAGood = path.join(root, 'fixtures', 'leg-a-good-repo')

/** Run the packaged CLI and return `{ status, stdout }` instead of throwing. */
function runCli(args) {
  try {
    return { status: 0, stdout: execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true }) }
  } catch (error) {
    return { status: error.status, stdout: String(error.stdout ?? '') }
  }
}

const bySeam = hits => hits.reduce((acc, h) => { acc[h.seam] = (acc[h.seam] || 0) + 1; return acc }, {})

test('scanner catalog covers every seam of both closed legs, in card order', () => {
  assert.deepEqual(SEAM_IDS, [
    'S3', 'S8', 'S9', 'M1', 'S4', 'S5', 'S6', 'S7', 'S2', 'S1', 'S10',
    'C1', 'C2', 'P1', 'C4', 'C5', 'H1', 'H2', 'H4', 'H3',
  ])
  // leg A
  for (const id of ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'M1']) {
    assert.ok(SEAM_IDS.includes(id), `leg-A seam ${id} missing from the merged catalog`)
  }
  // leg B, minus the folded `C3`
  for (const id of ['C1', 'C2', 'C4', 'C5', 'H1', 'H2', 'H3', 'H4', 'P1']) {
    assert.ok(SEAM_IDS.includes(id), `leg-B seam ${id} missing from the merged catalog`)
  }
  assert.ok(!SEAM_IDS.includes('C3'), 'C3 is folded into M1 and must not be a seam')
})

test('exactly one seam is card-only (H3), and it never produces a hit', () => {
  // M1 and P1 also carry `test: null`, but they run dedicated structured
  // detectors; H3 is the only seam with no detector at all.
  assert.deepEqual(CARD_ONLY, ['H3'])
  assert.equal(SEAMS.find(s => s.id === 'H3').severity, 'info')
  for (const dir of [legBBad, legABad]) {
    const report = scanRepo(dir)
    assert.equal(report.hits.filter(h => h.seam === 'H3').length, 0, 'H3 must never be auto-detected')
  }
})

test('leg-B bad fixture: every error seam of the rc.1 leg is flagged', () => {
  const report = scanRepo(legBBad)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual([...new Set(errors.map(h => h.seam))].sort(), ['C1', 'C2', 'M1', 'P1'])
  assert.deepEqual(bySeam(errors), { C1: 3, C2: 2, M1: 2, P1: 1 })
})

test('leg-B bad fixture: the advisory seams are reported as leads, never as errors', () => {
  const report = scanRepo(legBBad)
  const advisories = report.hits.filter(h => h.severity !== 'error')
  for (const id of ['C4', 'C5', 'H1', 'H2', 'H4']) {
    assert.ok(advisories.some(h => h.seam === id), `expected advisory ${id}`)
  }
  assert.ok(!advisories.some(h => h.seam === 'C1' || h.seam === 'P1'))
})

test('leg-B bad fixture: C1 catches the multi-line inject form, not only the one-liner', () => {
  const report = scanRepo(legBBad, { seams: ['C1'] })
  assert.equal(report.hits.length, 3)
  const lines = report.hits.map(h => h.line).sort((a, b) => a - b)
  assert.deepEqual(lines, [12, 17, 18], 'both the key line and the register line of the multi-line block must hit')
})

test('leg-B bad fixture: M1 names both causes (stale pin and unresolvable paths)', () => {
  const report = scanRepo(legBBad, { seams: ['M1'] })
  assert.equal(report.hits.length, 2, 'one stale devDependency pin and one stale tsconfig alias')
  const details = report.hits.map(h => h.detail).join('\n')
  assert.match(details, /pinned at the 0\.1\.5-alpha line/)
  assert.match(details, /does not exist/)
  assert.match(details, /falls back/)
  assert.ok(report.hits.every(h => h.severity === 'error'))
})

test('leg-B bad fixture: P1 fails the collapsed peer band and leaves the two-segment one alone', () => {
  const report = scanRepo(legBBad, { seams: ['P1'] })
  assert.equal(report.hits.length, 1)
  assert.equal(report.hits[0].severity, 'error')
  assert.match(report.hits[0].snippet, />=0\.1\.2-rc\.1 <0\.2\.0/)
  assert.match(report.hits[0].detail, /prerelease-tuple/)
})

test('leg-B good fixture: an adapted client half produces zero error-severity hits', () => {
  const report = scanRepo(legBGood)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual(errors, [], `unexpected error hits: ${JSON.stringify(errors, null, 1)}`)
  const ids = new Set(report.hits.map(h => h.seam))
  assert.ok(!ids.has('C1'), 'main.conversation must not be read as the deleted bare key')
  assert.ok(!ids.has('C2'))
  assert.ok(!ids.has('M1'), 'a resolvable paths alias and an rc.1 pin must pass M1')
  assert.ok(!ids.has('P1'))
})

test('leg-A bad fixture: the four exclusive seams plus the classic host seams are flagged', () => {
  const report = scanRepo(legABad)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual([...new Set(errors.map(h => h.seam))].sort(), ['M1', 'S3', 'S4', 'S5', 'S6', 'S8', 'S9'])
  assert.deepEqual(bySeam(errors), { S3: 1, S8: 1, S9: 1, S4: 1, S5: 1, S6: 2, M1: 2 })
  assert.ok(errors.length >= 7, 'the leg-A fixture must trip the error group, not only advisories')
})

test('leg-A bad fixture: M1 reports both unresolvable checkout aliases', () => {
  const report = scanRepo(legABad, { seams: ['M1'] })
  assert.equal(report.hits.length, 2, 'both stale tsconfig aliases must be reported')
  for (const h of report.hits) {
    assert.equal(h.seam, 'M1')
    assert.equal(h.severity, 'error')
    assert.match(h.detail, /does not exist/)
    assert.match(h.detail, /falls back/)
  }
})

test('leg-A bad fixture: S3 fires only for session-log writers that never mention stream', () => {
  const report = scanRepo(legABad, { seams: ['S3'] })
  assert.equal(report.hits.length, 1)
  assert.equal(report.hits[0].severity, 'error')
  assert.match(report.hits[0].detail, /assistant\/message/)
})

test('leg-A good fixture: an adapted plugin produces zero error-severity hits', () => {
  const report = scanRepo(legAGood)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual(errors, [], `unexpected error hits: ${JSON.stringify(errors, null, 1)}`)
  assert.ok(!report.hits.some(h => ['S3', 'S8', 'S9', 'M1'].includes(h.seam)), 'the adapted leg-A targets must be recognized')
})

test('--seams still filters, and the retired `C3` id matches nothing', () => {
  const onlyS3 = scanRepo(legABad, { seams: ['S3'] })
  assert.deepEqual([...new Set(onlyS3.hits.map(h => h.seam))], ['S3'])
  const onlyC1 = scanRepo(legBBad, { seams: ['C1', 'C2'] })
  assert.deepEqual([...new Set(onlyC1.hits.map(h => h.seam))].sort(), ['C1', 'C2'])
  const retired = scanRepo(legBBad, { seams: ['C3'] })
  assert.deepEqual(retired.hits, [], 'C3 is folded into M1 and must resolve to nothing')
  const structured = scanRepo(legBBad, { seams: ['M1'] })
  assert.ok(structured.hits.every(h => h.seam === 'M1'))
})

test('CLI: --seams restricts the run, --json writes the report, exit codes follow severity', () => {
  const tmp = fs.mkdtempSync(path.join(tmpdir(), 'dshup015-cli-'))
  try {
    const jsonPath = path.join(tmp, 'report.json')
    const legA = runCli(['--repo', legABad, '--seams', 'S3', '--quiet', '--json', jsonPath])
    assert.equal(legA.status, 1, 'an error-severity leg-A hit must exit 1')
    const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    assert.equal(report.hits.length, 1)
    assert.equal(report.hits[0].seam, 'S3')

    const clean = runCli(['--repo', legAGood, '--quiet'])
    assert.equal(clean.status, 0, 'an adapted repo must exit 0')

    const cardOnly = runCli(['--repo', legBBad, '--seams', 'H3', '--quiet'])
    assert.equal(cardOnly.status, 0, 'a card-only seam has no detector, so it cannot fail a run')

    const usage = runCli(['--nope'])
    assert.equal(usage.status, 2, 'an unknown argument must exit 2')
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true })
  }
})

test('render() reports the merged header, the seam groups and the card-only seam', () => {
  const out = render(scanRepo(legBBad))
  assert.match(out, /# scan-0\.1\.5 · /)
  assert.match(out, /## C1 \[error\]/)
  assert.match(out, /## P1 \[error\]/)
  assert.match(out, /H3 \[info\] card-only/)
})

test('the scan is read-only: the fixture trees are untouched', () => {
  for (const dir of [legBBad, legABad, legBGood, legAGood]) {
    const before = fs.readdirSync(dir).sort()
    scanRepo(dir)
    assert.deepEqual(fs.readdirSync(dir).sort(), before)
  }
})

test('live negative: a family repo already pinned to 0.1.5-rc.1 has no error-severity hits', (t) => {
  const live = path.resolve(root, '..', 'dsh-autotier')
  if (!fs.existsSync(live)) { t.skip('sibling repo dsh-autotier not present (standalone checkout)'); return }
  const report = scanRepo(live)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual(errors, [], `dsh-autotier should be clean, got: ${errors.slice(0, 5).map(h => `${h.seam} ${h.file}:${h.line}`).join(' | ')}`)
})
