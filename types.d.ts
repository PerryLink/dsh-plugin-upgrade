/**
 * Public type surface for dsh-plugin-upgrade.
 * @module dsh-plugin-upgrade
 */

/** Plugin configuration (Schemastery-backed; every field is a deployment choice). */
export interface Config {
  /** Register the packaged skill (default true). */
  enabled?: boolean
  /** Skill name published to the model catalog (default 'plugin-upgrade-015'). */
  skillName?: string
  /** Skill root inside the package; must contain `<skillName>/SKILL.md`. */
  skillsRoot?: string
  /** Mark the skill user-invocable in addition to model-invocable (default true). */
  userInvocable?: boolean
}

/** One seam hit produced by the scanner. */
export interface SeamHit {
  /** Seam id: S1..S10 or M1. */
  seam: string
  /** 'error' fails the scan; 'warn' is a manual-review lead. */
  severity: 'error' | 'warn'
  /** Absolute path of the file carrying the hit. */
  file: string
  /** 1-based line number. */
  line: number
  /** Trimmed source line (truncated to 200 characters). */
  snippet: string
  /** Human-readable explanation, including the suggested action for M1. */
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

/** Scan a repository directory for the 0.1.3-alpha.1 -> 0.1.5-alpha.1 seams. */
export declare function scanRepo(repoDir: string, options?: { seams?: string[] }): ScanReport

/** Render a report for a terminal. */
export declare function render(report: ScanReport): string

/** CLI entry point; returns the process exit code. */
export declare function main(argv: string[]): number

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
