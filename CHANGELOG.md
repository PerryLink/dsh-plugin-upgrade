# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Rename the four translated READMEs to `README-<lang>.md`. npm selects the package-page readme as the first markdown file matching its `{README,README.*}` glob (`@npmcli/package-json`, publish path), and that glob order puts `README.<lang>.md` ahead of `README.md` — so npm was serving the Simplified-Chinese file for this package too (measured on 15/15 sampled packages of the family). The new names sit outside the glob, so the English source is served again. No content changed apart from the language-switcher link each translation holds to its siblings, and the repo readme gate still passes. Takes effect with the next release; an already-published version cannot gain a corrected readme retroactively.

## [0.1.0] - 2026-09-10

### Added

- **Bundled agent skill `plugin-upgrade-015rc1`** — the version-locked `0.1.5-alpha.1 →
  0.1.5-rc.1` corridor: a 6-step fix-and-verify loop plus the corridor card with the
  from→to mapping, the seam catalog and the rewrite recipes.
- **Zero-dependency seam scanner** (`dsh-plugin-upgrade-rc1-scan`, also
  `dsh-plugin-upgrade-rc1/scan`) — reports `file:line` facts for ten seams re-read from the
  harness tag range on 2026-09-10; exit `1` on any error-severity hit.
- **Ten-seam catalog** — `C1` the bare client slot `conversation` deleted with no alias
  (silent unmount), `C2` the `dsh-client-ui-sidebar-textpreview` →
  `…-sidebar-documentpreview` package rename, `C3` the client-side false green from a stale
  type line or an unresolvable `tsconfig` `paths` alias, `C4` the new global main-panel model
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
- **`C3` and `P1` as structured checks** — they resolve `tsconfig` `paths` and the declared
  peer band instead of matching text, mirroring the sibling corridor's `M1` treatment.
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
