---
name: plugin-upgrade-015
description: Migrate a DeepSeek Harness plugin repo across the merged 0.1.3-alpha.1 -> 0.1.5-rc.1 corridor. Runs a zero-dependency seam scanner over one 20-seam catalog — leg A (V3 session format, assistant/message.stream, SessionHandleReadResult, ctx.agent, Inbox, SubprocessHandle.pid, SystemPrompt persona, PTC rename, EpochHeader.system, and the tsconfig stale-path false green) plus leg B (the removed bare `conversation` client slot, the sidebar textpreview -> documentpreview package rename, the stale-type-line false green, the new global main-panel model and usePanelInfo standard prop, the new `present` tool key, two new session event types, and the peer-range trap) — then walks the fix-and-verify loop with a real-host smoke, a resume round-trip for log writers and a real browser assertion for a client half.
whenToUse: Use when a DSH plugin must reach the DeepSeek Harness 0.1.5-rc.1 line (or any host line in >=0.1.2-rc.1 <0.2.0) while keeping the older peer band working. Read leg A first if the peer band is below 0.1.5-alpha.1 or the target is 0.1.5-alpha.1; read leg B if the target is 0.1.5-rc.1 or the plugin has a client/browser half. Not for 0.1.1 -> 0.1.2 migrations (use the community convergence skill), not for a hop after 0.1.5-rc.1 (a new corridor is a new package) and not for the DSH user-facing upgrade/repair path.
metadata:
  corridor: "0.1.3-alpha.1 -> 0.1.5-rc.1"
  legs: "leg A 0.1.3-alpha.1 -> 0.1.5-alpha.1 (S1-S10, M1) · leg B 0.1.5-alpha.1 -> 0.1.5-rc.1 (C1, C2, C4, C5, H1-H4, P1); leg B's C3 is leg A's M1"
  host-baseline: "0.1.5-rc.1 (tag dsh-v0.1.5-rc.1 = 183f08e9c6dde7e36cd2318eaee70b0da08fb35e); leg A baseline 0.1.5-alpha.1 (tag dsh-v0.1.5-alpha.1 = 5dda764ed3aa172535a7967b06ff95d9cbfe536a, checkout 19d2e38480)"
  evidence: "leg A: 2026-09-09 wave over 40 plugin repos · leg B: tag-range diff + public slot/service catalogs re-read 2026-09-10; family workspace sweep (15 repos with a client half, 8 slot keys). Both recorded in docs/EVIDENCE.md"
  status: "published"
  supersedes: "the version-locked packages dsh-plugin-upgrade (leg A) and dsh-plugin-upgrade-rc1 (leg B)"
user-invocable: true
---

# Plugin upgrade · 0.1.3-alpha.1 → 0.1.5-rc.1 (one package, two legs)

You are migrating **one plugin repository** across the merged DSH span `0.1.3-alpha.1 → 0.1.5-rc.1`. The goal is not "make typecheck pass" — it is "prove the plugin still works on the target host". Local gates are necessary but not sufficient, and two classes of failure survive a green gate: **stale-type false green** (the local gate compiles an old type line) and **silent non-mount** (the host drops a contribution with no error, no log line and no failed build). Read the leg that matches your peer band; both legs share one scanner and one catalog.

## 1. Locate your leg first

| Your situation | Read |
|---|---|
| Target host is `0.1.5-alpha.1`, or your peer band is below `0.1.5-alpha.1`, or you are bringing a repo up from the `0.1.3-alpha.1` line | **Leg A** — card §1, seams `S1`–`S10` + `M1` |
| Target host is `0.1.5-rc.1`, or the repo has a client/browser half, or its peer band already sits on `>=0.1.2-rc.1 <0.2.0` | **Leg B** — card §2, seams `C1`, `C2`, `C4`, `C5`, `H1`–`H4`, `P1` |
| A full `0.1.3-alpha.1 → 0.1.5-rc.1` upgrade | both legs, **A first then B**; card §1 then §2 |
| Your peer band is below `0.1.5-alpha.1` and you only need `0.1.5-alpha.1` | leg A only — do **not** apply leg B's rc.1 slot-catalog work |
| Target is a hop after `0.1.5-rc.1` | nothing on this card: a new corridor is a new package |

The card is `./references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md`. It is one document: a preamble with the corridor and how to read it, **§1 = Leg A's full card**, **§2 = Leg B's full card**, **§3 = the merged 20-seam index**. Each leg keeps its own evidence, `path:line` citations, fixtures and rollback path, so one leg can be rolled back without touching the other.

**`C3` no longer exists as a seam.** Leg B's card spelled the stale-type-line false green `C3`; it is the same defect as leg A's `M1` and is folded into it, so `M1` now carries both causes (a stale `0.1.5-alpha.*` dev/test pin and an unresolvable `tsconfig` `paths` alias). The card records the old spelling where it applies. Do not pass `C3` to `--seams`.

### Routing hints carried over from the two legs' frontmatter

Both legs' frontmatter `whenToUse` were routing hints; they cannot both live in one frontmatter, so they are preserved verbatim here — they are still the sharpest statement of each leg's boundary.

- **Leg A** (`0.1.3-alpha.1 → 0.1.5-alpha.1`): "Use when a DSH plugin must support @deepseek-ai/dsh 0.1.5-alpha.1 (or any host line in >=0.1.3-alpha.1 <0.1.5-alpha.2) while keeping the 0.1.2-rc.1 peer band working. Not for 0.1.1→0.1.2 migrations (use the community convergence skill) and not for the DSH user-facing upgrade/repair path."
- **Leg B** (`0.1.5-alpha.1 → 0.1.5-rc.1`): "Use when a DSH plugin must support the 0.1.5-rc.1 host line (or any host line in >=0.1.2-rc.1 <0.2.0) while keeping the older peer band working, especially when the plugin has a client/browser half. Not for 0.1.3-alpha.1 -> 0.1.5-alpha.1 migrations (use the sibling corridor dsh-plugin-upgrade) and not for the DSH user-facing upgrade/repair path."
  - **Merged-world correction:** the "sibling corridor dsh-plugin-upgrade" that hint points at is now **this same package's Leg A** — read card §1. There is no second package to install.

## 2. Hard rules

1. **Run the scanner first.** `node ./scripts/scan-0.1.5.mjs --repo <repo>` — it prints `file:line` facts. Clear `M1` (stale type line) and `P1` (peer band) before trusting anything else: a fake green and a mis-edited peer range make every later signal meaningless.
2. **`M1` is a blocker, not a warning.** Two independent causes, either one enough: a `tsconfig` `paths` alias that resolves to a missing directory (TypeScript silently falls back to the published types), or dev/test types pinned at `0.1.5-alpha.*` (the local gate compiles the old slot catalog). Fix the paths and the pin, then re-run — new red is real signal.
3. **`P1` is a blocker.** Never collapse the peer range to `>=0.1.2-rc.1 <0.2.0`: under npm semver's prerelease-tuple rule it rejects `0.1.5-rc.1` (measured `false` on semver 7.8.5). rc.1 adaptation does **not** change the peer range.
4. **`C1` is an error, never a warning.** The bare `conversation` client slot was deleted with no alias, and `ctx.slots.inject()` only runs its callback when the declaration exists — the plugin's UI disappears with no error, no log line and no failed build.
5. **Only adapt what the card says changed.** Do not refactor beyond the card, and do not re-litigate the other leg: on leg B the session-format seams (`assistant/message.stream`, `SessionHandleReadResult`, `EpochHeader.system`, `ctx.agent`, `Inbox`, `SystemPrompt.persona`, the V3 log generation) are unchanged in that hop and belong to leg A; on leg A the repo must still boot on `0.1.2-rc.1`, so keep the old peer band working.
6. **A client half needs a browser assertion.** `conversation`'s removal is not detectable at build time. For every `C1` / `C2` / `C5` / `H2` hit, confirm in a real page that the plugin's UI actually appears. A clean scan and a green `typecheck` are **not** evidence.
7. **Behavior change ⇒ test change ⇒ docs change, in one commit.** Five-language READMEs and CHANGELOG move with the code.
8. **Real-host smoke is the exit criterion.** Temp `DSH_HOME` (mkdtemp) + target CLI + `dsh plugin --profile web add <tarball>` + `--dump-config`. Never touch the user's real `~/.dsh`. Leg A adds a **resume round-trip** for anything that writes session logs (`S3`); leg B adds the **real browser assertion** for a client half.

## 3. Loop (both legs)

1. **Identify** — record: repo, current version, peer band, target host tag, node/pnpm, and whether the repo has a client half / tracked `lib/`.
2. **Baseline** — run the repo's own gate chain and *record pre-existing failures*; never let them be counted as migration regressions.
3. **Scan** — run `./scripts/scan-0.1.5.mjs`; load only the version-card facts that hit. **Locate the leg** (§1 above) before planning: a leg-A-only repo must not be planned against leg B's catalog, and vice versa.
4. **Plan** — group by the leg's own axes — leg A: session log / host vocabulary / config / distribution; leg B: client slot / package rename / type line / host vocabulary / config — list files, why they change, tests, rollback point. Get confirmation before editing.
5. **Adapt + verify per module** — fix, run the module's tests, keep commits conventional and independently revertable.
6. **Prove** — full gate chain + real-host smoke + (leg A) the resume round-trip for log writers + (leg B) a real browser assertion for a client half. Report done / not-hit / pre-existing / unverified / rollback, and say **which leg** each finding came from.

## 4. Leg-specific guidance

**Leg A (`0.1.3-alpha.1 → 0.1.5-alpha.1`, seams `S1`–`S10` + `M1`)**

- The four seams no community PR covered are the high-value ones: `S3` (an `assistant/message` written without the V3 required `stream` field), `S8` (`SessionHandle.read()` now returns `{ eventState, events }`), `S9` (`SystemPrompt` `persona` → `personaPrefix` / `personaSuffix`), and `M1`.
- `S3`'s failure shape is worse than a red gate: the log write succeeds and `Session.fromRestore` then refuses to resume the session.
- `S9`: do **not** substitute `includeHarnessIdentity: false` — it deletes the harness identity block, which is not equivalent.
- `S7` / `S1` / `S2` / `S10` are advisory leads for manual review; they have legitimate matches.
- The exit criterion is a temp-`DSH_HOME` smoke plus the `S3` resume round-trip where applicable.

**Leg B (`0.1.5-alpha.1 → 0.1.5-rc.1`, seams `C1`, `C2`, `C4`, `C5`, `H1`–`H4`, `P1`)**

- Rewrite `inject('conversation')` to `main.conversation` (the conversation content seat) or to `main` with your own `key` (a global central panel); card §2 §3.4 has the full recipe. Do **not** "rename to the nearest key" (`conversation.session` and its siblings are different seats).
- `C2` is a package rename with no shim: `@deepseek-ai/dsh-client-ui-sidebar-textpreview` → `…-sidebar-documentpreview`.
- `C4` / `C5` / `H1` / `H2` / `H4` are advisory leads; `H3` is card-only and deliberately has no detector.
- `P1` is about `package.json` peers **only**. `dshWorkshop.compatibility.dshVersions` is a different field: there, replace `0.1.5-alpha.1` with the line you target — do not append.
- Honest sizing: the family's own client halves use 8 slot keys that all survive rc.1, so for them this leg is latent breakage. Third-party halves that targeted the bare `conversation` key are the ones that break, and they break quietly.

## 5. Reference

- `./references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md` — the merged version card: preamble, **§1 Leg A** (10 seams with host path + commit + minimal fix + regression, and the 4 that no community PR covers yet), **§2 Leg B** (the from→to mapping, the `conversation` → `main.conversation` rewrite recipe, the boundary list), **§3 the 20-seam merged index**.
- `./scripts/scan-0.1.5.mjs` — the detector (zero dependency, `file:line`, exit 1 on error-severity hits, `--seams` to filter). It is a thin wrapper over the package's own `lib/scan.mjs`, shipped inside the skill directory so relative paths resolve.
- The package's own test suite (`node --test`) — synthetic bad/good fixtures **for both legs** (`fixtures/leg-a-*` for leg A, `fixtures/bad-repo` / `fixtures/good-repo` for leg B), a card↔catalog id-parity gate, and a live negative on a family repo.
- `docs/EVIDENCE.md` — the command→output record behind every card claim (§A is leg A's provenance, §1–§10 the leg-B records).
