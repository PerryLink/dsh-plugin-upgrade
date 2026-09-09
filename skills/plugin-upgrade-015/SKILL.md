---
name: plugin-upgrade-015
description: Migrate a DeepSeek Harness plugin repo from the 0.1.3-alpha.1 line to 0.1.5-alpha.1. Runs a zero-dependency seam scanner (V3 session format, assistant/message.stream, SessionHandleReadResult, ctx.agent, Inbox, SubprocessHandle.pid, SystemPrompt persona, PTC rename, EpochHeader.system, and the tsconfig stale-path false-green), then walks the fix-and-verify loop with real-host smoke.
whenToUse: Use when a DSH plugin must support @deepseek-ai/dsh 0.1.5-alpha.1 (or any host line in >=0.1.3-alpha.1 <0.1.5-alpha.2) while keeping the 0.1.2-rc.1 peer band working. Not for 0.1.1→0.1.2 migrations (use the community convergence skill) and not for the DSH user-facing upgrade/repair path.
metadata:
  corridor: "0.1.3-alpha.1 -> 0.1.5-alpha.1"
  host-baseline: "0.1.5-alpha.1 (checkout 19d2e38480, tag dsh-v0.1.5-alpha.1 5dda764ed3)"
  evidence: "40 plugin repos, 2026-09-09 wave"
  status: "published"
user-invocable: true
---

# Plugin upgrade · 0.1.3-alpha.1 → 0.1.5-alpha.1

You are migrating **one plugin repository** to the DSH `0.1.5-alpha.1` line. The goal is not "make typecheck pass" — it is "prove the plugin still works on the target host". Local gates are necessary but not sufficient: two failure classes survive a green gate (stale-type false green, and tests mocked against the old shape).

## Hard rules

1. **Run the scanner first.** `node ./scripts/scan-0.1.5.mjs --repo <repo>` — it prints `file:line` facts. Do not trust a green `typecheck` before M1 is cleared.
2. **M1 is a blocker, not a warning.** If `tsconfig` `paths` do not resolve, TypeScript silently falls back to published types and every other signal is fake. Fix the paths, then re-run; new red is real signal.
3. **Only adapt what the card says changed.** Do not refactor beyond the card; keep the old peer band working (the repo must still boot on `0.1.2-rc.1`).
4. **Behavior change ⇒ test change ⇒ docs change, in one commit.** Five-language READMEs and CHANGELOG move with the code.
5. **Real-host smoke is the exit criterion.** Temp `DSH_HOME` (mkdtemp) + target CLI + `dsh plugin --profile web add <tarball>` + `--dump-config`. Never touch the user's real `~/.dsh`.

## Loop

1. **Identify** — record: repo, current version, peer band, target host tag, node/pnpm, and whether the repo has client half / tracked `lib/`.
2. **Baseline** — run the repo's own gate chain and *record pre-existing failures*; never let them be counted as migration regressions.
3. **Scan** — run `./scripts/scan-0.1.5.mjs`; load only the version card facts that hit.
4. **Plan** — group by host/client/config/distribution; list files, why they change, tests, rollback point. Get confirmation before editing.
5. **Adapt + verify per module** — fix, run the module's tests, keep commits conventional and independently revertable.
6. **Prove** — full gate chain + real-host smoke (+ resume round-trip for log writers, + browser assertion for client halves). Report done / not-hit / pre-existing / unverified / rollback.

## Reference

- `./references/v0.1.3-alpha.1-to-v0.1.5-alpha.1.md` — the version card: 10 seams with host path + commit + minimal fix + regression, and the 4 that no community PR covers yet (S3/S8/S9/M1).
- `./scripts/scan-0.1.5.mjs` — the detector (zero dependency, `file:line`, exit 1 on error-severity hits).
- The package's own test suite (`node --test`) — synthetic bad/good fixtures plus a live negative on a repo already adapted by this wave.
