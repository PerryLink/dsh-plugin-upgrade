---
name: plugin-upgrade-015rc1
description: Migrate a DeepSeek Harness plugin repo from the 0.1.5-alpha.1 line to 0.1.5-rc.1. Runs a zero-dependency seam scanner (the removed bare `conversation` client slot, the sidebar textpreview -> documentpreview package rename, the stale-type false green, the new global main-panel model and usePanelInfo prop, the new `present` tool key, two new session event types, and the peer-range trap), then walks the fix-and-verify loop with a real-host smoke and a real browser assertion.
whenToUse: Use when a DSH plugin must support the 0.1.5-rc.1 host line (or any host line in >=0.1.2-rc.1 <0.2.0) while keeping the older peer band working, especially when the plugin has a client/browser half. Not for 0.1.3-alpha.1 -> 0.1.5-alpha.1 migrations (use the sibling corridor dsh-plugin-upgrade) and not for the DSH user-facing upgrade/repair path.
metadata:
  corridor: "0.1.5-alpha.1 -> 0.1.5-rc.1"
  host-baseline: "0.1.5-rc.1 (tag dsh-v0.1.5-rc.1 = 183f08e9c6dde7e36cd2318eaee70b0da08fb35e; from tag dsh-v0.1.5-alpha.1 = 5dda764ed3aa172535a7967b06ff95d9cbfe536a)"
  evidence: "tag-range diff + public slot/service catalogs re-read 2026-09-10; family workspace sweep (15 repos with a client half, 8 slot keys)"
  status: "published"
  sibling-corridor: "dsh-plugin-upgrade (0.1.3-alpha.1 -> 0.1.5-alpha.1)"
user-invocable: true
---

# Plugin upgrade · 0.1.5-alpha.1 → 0.1.5-rc.1

You are migrating **one plugin repository** to the DSH `0.1.5-rc.1` line. The goal is not "make typecheck pass" — it is "prove the plugin still works on the target host". Local gates are necessary but not sufficient, and this corridor's breakage is **silent**: the bare `conversation` slot was removed with no alias, and `ctx.slots.inject()` only runs its callback when the declaration exists, so a client half that still targets it stops mounting with no error at all.

## Hard rules

1. **Run the scanner first.** `node ./scripts/scan-0.1.5-rc1.mjs --repo <repo>` — it prints `file:line` facts. Clear `C3` (stale type line) and `P1` (peer band) before trusting anything else.
2. **`C3` is a blocker, not a warning.** A `tsconfig` `paths` alias that resolves to a missing directory, or dev/test types pinned at `0.1.5-alpha.*`, makes TypeScript fall back to the old slot catalog: every other local signal is fake.
3. **`P1` is a blocker.** Never collapse the peer range to `>=0.1.2-rc.1 <0.2.0`: under npm semver's prerelease-tuple rule it rejects `0.1.5-rc.1` (measured `false` on semver 7.8.5). rc.1 adaptation does **not** change the peer range.
4. **Only adapt what the card says changed.** Do not re-litigate the session-format seams (they are unchanged in this hop and belong to the sibling corridor) and do not refactor beyond the card.
5. **A client half needs a browser assertion.** `conversation`'s removal is not detectable at build time. For every `C1` / `C2` / `C5` / `H2` hit, confirm in a real page that the plugin's UI actually appears. A clean scan and a green `typecheck` are **not** evidence.
6. **Behavior change ⇒ test change ⇒ docs change, in one commit.** Five-language READMEs and CHANGELOG move with the code.
7. **Real-host smoke is the exit criterion.** Temp `DSH_HOME` (mkdtemp) + rc.1 CLI + `dsh plugin --profile web add <tarball>` + `--dump-config`. Never touch the user's real `~/.dsh`.

## Loop

1. **Identify** — record: repo, current version, peer band, target host tag, node/pnpm, and whether the repo has a client half / tracked `lib/`.
2. **Baseline** — run the repo's own gate chain and *record pre-existing failures*; never let them be counted as migration regressions.
3. **Scan** — run `./scripts/scan-0.1.5-rc1.mjs`; load only the version-card facts that hit.
4. **Plan** — group by client slot / package rename / type line / host vocabulary / config / distribution; list files, why they change, tests, rollback point. Get confirmation before editing.
5. **Adapt + verify per module** — fix, run the module's tests, keep commits conventional and independently revertable.
6. **Prove** — full gate chain + real-host smoke + (for a client half) a real browser assertion. Report done / not-hit / pre-existing / unverified / rollback.

## Reference

- `./references/v0.1.5-alpha.1-to-v0.1.5-rc.1.md` — the version card: the from→to mapping, the seam catalog (`C1`–`C5`, `H1`–`H4`, `P1`), the `conversation` → `main.conversation` rewrite recipe, and the boundary list.
- `./scripts/scan-0.1.5-rc1.mjs` — the detector (zero dependency, `file:line`, exit 1 on error-severity hits).
- The package's own test suite (`node --test`) — synthetic bad/good fixtures, a card↔catalog id-parity gate, and a live negative on a family repo.
