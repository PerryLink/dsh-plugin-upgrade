// SPDX-License-Identifier: Apache-2.0
/**
 * The corridor index: one package, one entry point, several closed corridors.
 *
 * Owner decision (2026-09-19): the family's earlier "a hop is a new package" rule
 * is superseded. This package carries a corridor index instead, and the scanner
 * picks the corridor that matches the repository under inspection. What does NOT
 * change: each corridor keeps its OWN evidence-bound catalog module - the seam
 * arrays are never merged, so every card claim stays traceable to its measurement.
 *
 * Routing is deliberately a heuristic over the target repository's declared band
 * (`engines.dsh`, dependencies on `@deepseek-ai/dsh*`), because the scanner is
 * read-only, dependency-free and offline: no registry lookup happens here. The
 * "which line is newest" question belongs to the agent running the skill, not to
 * this scanner. `--span <id>` overrides the guess, and an unknown band falls back
 * to the older corridor, which is what a repository predating 0.1.6 needs anyway.
 */
import { readFileSync } from 'node:fs'

/** @typedef {{ id: string, span: string, catalog: string, card: string, baselineTags: string[], evidence: string }} Corridor */

/** @type {Corridor[]} */
export const CORRIDORS = [
  {
    id: 'legAB',
    span: '0.1.3-alpha.1 -> 0.1.5-rc.1',
    catalog: '../lib/scan.mjs',
    card: 'skills/plugin-upgrade/references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md',
    baselineTags: ['dsh-v0.1.5-alpha.1', 'dsh-v0.1.5-rc.1'],
    evidence: 'docs/EVIDENCE.md section A (leg A provenance) and sections 1-10 (leg B records)',
  },
  {
    id: 'legC',
    span: '0.1.5-rc.2 -> 0.1.6-alpha.2',
    catalog: '../lib/scan-0.1.6.mjs',
    card: 'skills/plugin-upgrade/references/v0.1.5-rc.2-to-v0.1.6-alpha.2.md',
    baselineTags: ['dsh-v0.1.6-alpha.2'],
    evidence: 'docs/EVIDENCE.md section 11 (leg C records)',
  },
]

/** Accepts a corridor id ('legC'), a full span, or a bare mention of a line. */
export function corridorById(id) {
  if (typeof id !== 'string' || id.length === 0) return undefined
  const wanted = id.trim().toLowerCase()
  return CORRIDORS.find(
    c => c.id.toLowerCase() === wanted || c.span.toLowerCase() === wanted || c.span.toLowerCase().includes(wanted),
  )
}

/** The 0.1.6 line marker. Kept as one regex so the heuristic is auditable. */
const LEG_C_MARKER = /0\.1\.6-(alpha|beta|rc|0)/

/**
 * Reads the target repository's declared band: the text of every field that
 * carries a dsh version, or '' when nothing declares one.
 * @param {string} repoDir
 * @returns {string}
 */
export function declaredBand(repoDir) {
  try {
    const manifest = JSON.parse(readFileSync(`${repoDir.replace(/[\\/]+$/, '')}/package.json`, 'utf8'))
    const parts = []
    if (manifest.engines && typeof manifest.engines.dsh === 'string') parts.push(manifest.engines.dsh)
    for (const field of ['dependencies', 'devDependencies', 'peerDependencies']) {
      const block = manifest[field]
      if (!block || typeof block !== 'object') continue
      for (const [name, range] of Object.entries(block)) {
        if (name.startsWith('@deepseek-ai/dsh')) parts.push(String(range))
      }
    }
    return parts.join(' ')
  } catch {
    return ''
  }
}

/**
 * Chooses the corridor for a repository, or for an explicit span.
 * @param {{ repoDir?: string, span?: string }} [input]
 * @returns {Corridor}
 */
export function resolveCorridor(input = {}) {
  if (input.span) {
    const explicit = corridorById(input.span)
    if (explicit) return explicit
  }
  const band = input.repoDir ? declaredBand(input.repoDir) : ''
  if (LEG_C_MARKER.test(band)) return CORRIDORS.find(c => c.id === 'legC')
  return CORRIDORS.find(c => c.id === 'legAB')
}

/** Reads `--span <value>` out of an argv array without touching the other flags. */
export function spanFromArgv(argv) {
  const index = argv.findIndex(a => a === '--span')
  if (index >= 0 && typeof argv[index + 1] === 'string' && !argv[index + 1].startsWith('--')) return argv[index + 1]
  const inline = argv.find(a => a.startsWith('--span='))
  return inline ? inline.slice('--span='.length) : undefined
}

/** Reads `--repo <value>` (or `--repo=<value>`) out of an argv array. */
export function repoFromArgv(argv) {
  const index = argv.findIndex(a => a === '--repo')
  if (index >= 0 && typeof argv[index + 1] === 'string') return argv[index + 1]
  const inline = argv.find(a => a.startsWith('--repo='))
  return inline ? inline.slice('--repo='.length) : undefined
}

/** Loads the catalog module the corridor points at. */
export async function loadCatalog(corridor) {
  return import(new URL(corridor.catalog, import.meta.url).href)
}
