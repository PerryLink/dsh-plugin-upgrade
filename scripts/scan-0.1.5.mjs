#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
/**
 * CLI wrapper for the packaged `0.1.3-alpha.1 -> 0.1.5-rc.1` merged seam scanner.
 *
 * Usage:
 *   node scripts/scan-0.1.5.mjs [--repo <path>] [--json <out.json>] [--seams S3,C1,P1] [--quiet]
 *   npx --package dsh-plugin-upgrade-0.1.3-0.1.5 dsh-plugin-upgrade-015-scan --repo <path>
 *
 * Exit codes: 0 = no error-severity hit, 1 = at least one error-severity hit,
 *             2 = usage or scan failure. The implementation lives in
 *             ../lib/scan.mjs so the plugin, the CLI, the packaged skill and
 *             the tests share one seam catalog.
 */
import { main } from '../lib/scan.mjs'

process.exit(main(process.argv.slice(2)))
