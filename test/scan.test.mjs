// Self-test for lib/scan.mjs — synthetic bad/good fixtures plus a live negative on
// a real repo that the 2026-09-09 wave already adapted. Run: node --test
import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { scanRepo, SEAMS } from '../lib/scan.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const bad = path.join(root, 'fixtures', 'bad-repo')
const good = path.join(root, 'fixtures', 'good-repo')

test('scanner catalog covers every documented seam id', () => {
  const ids = new Set(SEAMS.map(s => s.id))
  for (const id of ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'M1']) {
    assert.ok(ids.has(id), `seam ${id} missing from the catalog`)
  }
})

test('bad fixture: the four gap seams plus the classic seams are flagged', () => {
  const report = scanRepo(bad)
  const got = new Set(report.hits.map(h => h.seam))
  for (const id of ['S3', 'S8', 'S9', 'M1', 'S4', 'S5', 'S6']) {
    assert.ok(got.has(id), `expected ${id} to be flagged, got ${[...got].join(',')}`)
  }
  assert.ok(report.hits.filter(h => h.severity === 'error').length >= 7, 'expected >=7 error-severity hits')
})

test('bad fixture: M1 detail names the unresolvable targets', () => {
  const report = scanRepo(bad, { seams: ['M1'] })
  assert.equal(report.hits.length, 2, 'both stale tsconfig aliases must be reported')
  for (const h of report.hits) {
    assert.equal(h.seam, 'M1')
    assert.match(h.detail, /does not exist/)
    assert.match(h.detail, /falls back/)
  }
})

test('good fixture: an adapted plugin produces zero error-severity hits', () => {
  const report = scanRepo(good)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual(errors, [], `unexpected error hits: ${JSON.stringify(errors, null, 1)}`)
})

test('live negative: a repo adapted by the 2026-09-09 wave has no error-severity hits', (t) => {
  const live = path.resolve(root, '..', 'dsh-defend')
  if (!fs.existsSync(live)) { t.skip('sibling repo dsh-defend not present (standalone checkout)'); return }
  const report = scanRepo(live)
  const errors = report.hits.filter(h => h.severity === 'error')
  assert.deepEqual(errors, [], `dsh-defend should be clean, got: ${errors.slice(0, 5).map(h => `${h.seam} ${h.file}:${h.line}`).join(' | ')}`)
})
