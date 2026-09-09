#!/usr/bin/env node
/**
 * CLI wrapper for the packaged seam scanner.
 *
 * Usage:
 *   node scripts/scan-0.1.5.mjs [--repo <path>] [--json <out.json>] [--seams M1,S3] [--quiet]
 *   npx --package dsh-plugin-upgrade dsh-plugin-upgrade-scan --repo <path>
 *
 * Exit codes: 0 = no error-severity hit, 1 = at least one error-severity hit,
 *             2 = usage or scan failure. The implementation lives in ../lib/scan.mjs
 * so the plugin, the CLI and the tests share one seam catalog.
 */
import { main } from '../lib/scan.mjs'

process.exit(main(process.argv.slice(2)))
