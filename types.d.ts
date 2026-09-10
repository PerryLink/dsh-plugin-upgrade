// SPDX-License-Identifier: Apache-2.0
/**
 * Public type surface for dsh-plugin-upgrade-rc1.
 * @module dsh-plugin-upgrade-rc1
 */

/** Plugin configuration (Schemastery-backed; every field is a deployment choice). */
export interface Config {
  /** Register the packaged skill (default true). */
  enabled?: boolean
  /** Skill name published to the model catalog (default 'plugin-upgrade-015rc1'). */
  skillName?: string
  /** Skill root inside the package; must contain `<skillName>/SKILL.md`. */
  skillsRoot?: string
  /** Mark the skill user-invocable in addition to model-invocable (default true). */
  userInvocable?: boolean
}

/** One seam hit produced by the scanner. */
export interface SeamHit {
  /** Seam id: C1..C5, H1..H4 or P1. */
  seam: string
  /** 'error' fails the scan; 'warn' and 'info' are manual-review leads. */
  severity: 'error' | 'warn' | 'info'
  /** Absolute path of the file carrying the hit. */
  file: string
  /** 1-based line number. */
  line: number
  /** Trimmed source line (truncated to 200 characters). */
  snippet: string
  /** Human-readable explanation, including the suggested action. */
  detail: string
}

/** Scanner report for one repository. */
export interface ScanReport {
  repo: string
  scannedAt: string
  files: number
  hits: SeamHit[]
  bySeam: Record<string, number>
}

/**
 * One entry of the seam catalog shared by the card, the CLI and the plugin.
 * `test` is null for a card-only seam (H3): it is documented and id-parity
 * checked but deliberately has no automatic detection.
 */
export interface Seam {
  id: string
  title: string
  severity: 'error' | 'warn' | 'info'
  action: string
  test: RegExp | null
}

/** Scan a repository directory for the 0.1.5-alpha.1 -> 0.1.5-rc.1 seams. */
export declare function scanRepo(repoDir: string, options?: { seams?: string[] }): ScanReport

/** Render a report for a terminal. */
export declare function render(report: ScanReport): string

/** CLI entry point; returns the process exit code. */
export declare function main(argv: string[]): number

/** The seam catalog. The version card must name exactly these ids. */
export declare const SEAMS: Seam[]

/** Seam ids in card order; `test/card.test.mjs` pins the card to this list. */
export declare const SEAM_IDS: string[]

/** Seams documented on the card with no automatic detection (H3). */
export declare const CARD_ONLY: string[]

/** Split a SKILL.md frontmatter block into its routing fields and body. */
export declare function splitFrontmatter(text: string): { description?: string, whenToUse?: string, body: string }

/** Read and validate a packaged skill bundle (fails loud). */
export declare function readSkillBundle(skillsRoot: string, skillName: string): {
  frontmatterName: string
  description?: string
  whenToUse?: string
  body: string
  skillDir: string
}

export declare const name: string
export declare const inject: string[]
export declare const Config: unknown
export declare function apply(ctx: unknown, config?: Config): void
