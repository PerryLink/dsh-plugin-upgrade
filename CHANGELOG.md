# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-09-12

## [0.1.0] - 2026-09-11

### Added

- **Merged corridor: one package for `0.1.3-alpha.1 → 0.1.5-rc.1`.** This package supersedes
  the two version-locked npm names `dsh-plugin-upgrade` (leg A, `0.1.3-alpha.1 →
  0.1.5-alpha.1`, seams `S1`–`S10` + `M1`) and `dsh-plugin-upgrade-rc1` (leg B,
  `0.1.5-alpha.1 → 0.1.5-rc.1`, seams `C1`, `C2`, `C4`, `C5`, `H1`–`H4`, `P1`). The npm name
  is new, so the version line restarts at `0.1.0`; the two retired names stay on the registry
  and their content is now historical.
- **One 20-seam catalog** — `lib/scan.mjs` carries both legs in catalog order (`S3`, `S8`,
  `S9`, `M1`, `S4`, `S5`, `S6`, `S7`, `S2`, `S1`, `S10`, `C1`, `C2`, `P1`, `C4`, `C5`, `H1`,
  `H2`, `H4`, `H3`) behind one CLI, one skill and one id-parity gate.
- **Seam `C3` was folded into `M1`.** Leg B's `C3` was the same defect as leg A's `M1` (a
  local gate compiling a stale type line), so the merged catalog has one seam carrying both
  causes: an unresolvable `tsconfig` `paths` alias and dev/test types pinned at
  `0.1.5-alpha.*`. `C3` is no longer a seam id — `--seams C3` matches nothing, `types.d.ts`
  does not accept it, and the merged card records the old spelling only in its fold notes.
- **Merged card with two labelled legs** —
  `skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md`: a preamble (the
  span, why it ends at rc.1, how to read it), **§1 Leg A** and **§2 Leg B** each carrying the
  retired card's full text, evidence and `path:line` citations, and **§3 the merged 20-seam
  index**.
- **Leg-routing skill body** — the skill is now `plugin-upgrade-015` (renamed directory,
  frontmatter, Config default and bundle row). Its body routes the caller to the leg that
  matches the peer band, and both legs' original frontmatter routing hints are preserved in
  the body.
- **Fixtures for both legs** — leg A's TypeScript/session-oriented pair is vendored as
  `fixtures/leg-a-bad-repo` / `fixtures/leg-a-good-repo`; the client-slot pair stays at
  `fixtures/bad-repo` / `fixtures/good-repo`. Each leg therefore has a bad fixture that trips
  its error-severity seams and a good fixture that stays clean.

### Changed

- The scanner CLI is now `dsh-plugin-upgrade-015-scan` (`scripts/scan-0.1.5.mjs`, plus the
  skill-local `skills/plugin-upgrade-015/scripts/scan-0.1.5.mjs`); the cordis row is
  `dsh-plugin-upgrade-015`.
- The dev/test pin and the monthly compat probe move to the published `0.1.5-rc.2` line (the
  newest published types verify the same seam catalog), while `dshWorkshop.compatibility.dshVersions`
  lists `0.1.2-rc.1` and `0.1.5-rc.2`. The peer band still keeps both segments
  (`>=0.1.2-rc.1 <0.2.0 || >=0.1.5-alpha.1 <0.2.0`) — `P1` forbids collapsing it.
- Rename the four translated READMEs to `README-<lang>.md`. npm selects the package-page readme as the first markdown file matching its `{README,README.*}` glob (`@npmcli/package-json`, publish path), and that glob order puts `README.<lang>.md` ahead of `README.md` — so npm was serving the Simplified-Chinese file for this package too (measured on 15/15 sampled packages of the family). The new names sit outside the glob, so the English source is served again. No content changed apart from the language-switcher link each translation holds to its siblings, and the repo readme gate still passes. Takes effect with the next release; an already-published version cannot gain a corrected readme retroactively.

## [0.1.0] - 2026-09-10 · retired package `dsh-plugin-upgrade-rc1` (leg B)

> *Historical entry, kept as published: every package name, CLI name and skill id below is as
> it was in the retired leg-B package (`dsh-plugin-upgrade-rc1`, skill
> `plugin-upgrade-015rc1`, CLI `dsh-plugin-upgrade-rc1-scan`). Their merged equivalents are in
> `[Unreleased]`. Leg B's seam `C3` below is the merged `M1`, and this entry is retained
> verbatim apart from that fold.*

### Added

- **Bundled agent skill `plugin-upgrade-015rc1`** — the version-locked `0.1.5-alpha.1 →
  0.1.5-rc.1` corridor: a 6-step fix-and-verify loop plus the corridor card with the
  from→to mapping, the seam catalog and the rewrite recipes.
- **Zero-dependency seam scanner** (`dsh-plugin-upgrade-rc1-scan`, also
  `dsh-plugin-upgrade-rc1/scan`) — reports `file:line` facts for ten seams re-read from the
  harness tag range on 2026-09-10; exit `1` on any error-severity hit.
- **Ten-seam catalog** — `C1` the bare client slot `conversation` deleted with no alias
  (silent unmount), `C2` the `dsh-client-ui-sidebar-textpreview` →
  `…-sidebar-documentpreview` package rename, `M1` the client-side false green from a stale
  type line or an unresolvable `tsconfig` `paths` alias (leg B's card spelled this seam `C3`;
  it is now one seam with leg A's `M1`), `C4` the new global main-panel model
  and the `usePanelInfo` standard prop, `C5` the `sidebar.right.tab.document` document
  preview slot and the `rightbar` → `rightbar.session` parent change, `H1` the two new
  fail-closed session event types, `H2` the `present` tool taking the `'present'` tool-view
  key, `H3` the additive capabilities (card-only, no detector), `H4` the DeepSeek adapter's
  default advisory catalog now led by `deepseek-flash`, and `P1` the peer-range trap where
  `>=0.1.2-rc.1 <0.2.0` alone rejects `0.1.5-rc.1`.
- **`C1` ruling and rewrite recipe** — the removal is documented as a **public
  extension-point break** (no alias, no shim, no upstream deprecation note, and
  `ctx.slots.inject()` never fires without the declaration), with the
  `conversation` → `main.conversation` / `main` recipe and a real-browser exit criterion.
- **Honest blast-radius record** — the card states that the family's own client halves use
  eight slot keys, all of which survive in rc.1, so this hop is latent breakage for them and
  actual breakage only for third-party halves that targeted the bare key.
- **`M1` (leg B's `C3`) and `P1` as structured checks** — they resolve `tsconfig` `paths` and
  the declared peer band instead of matching text, mirroring leg A's `M1` treatment.
- **Card↔catalog parity gate** — `test/card.test.mjs` asserts that the card and
  `lib/scan.mjs` name exactly the same seam ids with the same severities, turning the
  evidence-binding rule into a machine gate.
- **Plugin surface** — `enabled`, `skillName`, `skillsRoot`, `userInvocable` config keys; the
  skill registers through the injected `skills` service and unregisters with its effect
  disposer. A missing bundle, an empty body or a nameless frontmatter fails the mount loud.
- **Evidence seal** — `docs/EVIDENCE.md` records the command and the observed output behind
  every card claim, and marks what could not be verified.
- **Gates** — `node --test` against a real Cordis `Context` and the real `SkillRegistry`,
  five-language README consistency, self-contained import resolution, and a packed-tarball
  artifact check that also proves `test/`, `fixtures/` and `.github/` never ship.
- **Family-standard CI** — 3 OS × 2 Node `ci.yml`, a monthly `compat.yml` probe against the
  published `0.1.5-rc.1` line, OpenSSF `scorecard.yml`, the `plugin-doctor.yml` static R/K
  gate, and a tag-triggered `release.yml` that gates, publishes to npm with provenance and
  creates the GitHub Release behind an idempotent guard.
