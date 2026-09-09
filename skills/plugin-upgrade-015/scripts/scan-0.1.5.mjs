#!/usr/bin/env node
/**
 * Skill-relative scanner entry.
 *
 * The skill body resolves its relative paths against this skill's own directory
 * (the `resourceBase`), so `./scripts/scan-0.1.5.mjs` must exist here as well as
 * at the package root. Both are thin wrappers over the single implementation in
 * `<package>/lib/scan.mjs`, so the skill, the CLI and the tests share one catalog.
 *
 * Usage: node ./scripts/scan-0.1.5.mjs --repo <path>
 */
import { main } from '../../../lib/scan.mjs'

process.exit(main(process.argv.slice(2)))
