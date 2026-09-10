# AGENTS.md

Standalone DeepSeek Harness plugin repository (`dsh-plugin-upgrade-rc1`). Development follows
the dsh-plugin-guide skill and the official plugin contract; this file records repo-local
decisions. Read `README.md` (external contract) and the packaged corridor card
(`skills/plugin-upgrade-015rc1/references/v0.1.5-alpha.1-to-v0.1.5-rc.1.md`) before changing
behavior.

## The corridor is locked

- **The corridor is locked.** This package upgrades plugins across `0.1.5-alpha.1 →
  0.1.5-rc.1` and nothing else. Do not widen the peer band or the card to "all versions":
  a drifting card is worse than no card. A new corridor is a new package.

That rule is inherited verbatim from the sibling corridor's `AGENTS.md:43-45`
(`dsh-plugin-upgrade`, locked on `0.1.3-alpha.1 → 0.1.5-alpha.1`), with only the version pair
replaced. It is a **family asset**, not one repository's private rule: the sibling's
`README.md` states "**One corridor only** … It is not a general migration framework", and
`0.1.5-rc.1`'s seams do not belong on that card any more than `0.1.3-alpha.1`'s belong here.

Consequences accepted by this repository:

- The seam catalog (`C1`–`C5`, `H1`–`H4`, `P1`) is evidence-bound to the tag range
  `dsh-v0.1.5-alpha.1..dsh-v0.1.5-rc.1`. A new hop (rc.2, the final release, anything later)
  is a **new package**, not a wider card.
- Session-format seams (`assistant/message.stream`, `SessionHandleReadResult`,
  `EpochHeader.system`, `ctx.agent`, `Inbox`, `SystemPrompt.persona`, the V3 log generation)
  are **not** restated here: they are unchanged in this range (measured: the whole
  `packages/core/session/src` diff is two added event-type literals and one comment line) and
  they belong to the sibling card. Restating them would be drift.
- The peer band is **unchanged** by this adaptation. `>=0.1.2-rc.1 <0.2.0` alone rejects
  `0.1.5-rc.1` under npm semver's prerelease-tuple rule (measured `false` on semver 7.8.5);
  the `|| >=0.1.5-alpha.1 <0.2.0` segment is what admits it.
- Zero code dependency on the sibling corridor: no `import`, no vendoring, no shared
  `SEAMS`. Each corridor keeps its own release flow and can roll back alone.
- The `C1` ruling (the bare `conversation` slot removal is a **public extension-point
  break**, kept at `error`, with a rewrite recipe and a real-browser exit criterion) is
  recorded in the card §3.3. Do not downgrade it to an advisory without new upstream
  evidence (an alias, a shim, or an official migration note).

## Layout (JS form, pure host, no browser half)

```
index.mjs             single host face: Config schema + skill bundle reader + apply()
types.d.ts            Config, SeamHit, ScanReport and the public function surface
lib/scan.mjs          zero-dependency seam catalog + scanner + CLI main()
scripts/scan-0.1.5-rc1.mjs   thin bin wrapper (npx dsh-plugin-upgrade-rc1-scan)
skills/plugin-upgrade-015rc1/scripts/scan-0.1.5-rc1.mjs  the same wrapper inside the skill
                      directory, so the skill body's `./scripts/...` resolves against its
                      resourceBase
scripts/sweep-all.mjs    maintainer tool: sweep a workspace of plugin repos into a table
scripts/changelog-section.mjs  print one CHANGELOG section for GitHub Release notes
scripts/verify-self-contained.mjs  every import resolves inside the package
scripts/verify-artifacts.mjs       pack + inspect the published tarball (also asserts that
                                   test/, fixtures/ and .github/ do NOT ship)
scripts/check-readme-sync.mjs      five-language README consistency
skills/plugin-upgrade-015rc1/SKILL.md  the bundled skill body (frontmatter name is the skill id)
skills/plugin-upgrade-015rc1/references/…  the corridor card
test/scan.test.mjs    synthetic bad/good fixtures + a live negative on an adapted repo
test/plugin.test.mjs  real Cordis Context + real SkillRegistry: register, dispose, negatives
test/card.test.mjs    the card↔catalog id/severity parity gate
fixtures/             scanner fixtures (bad-repo, good-repo) — never published
docs/EVIDENCE.md      the command→output record every card claim traces to
cordis.patch.yml      bundle declaration (insert dsh-plugin-upgrade-rc1); every Config key inline
pnpm-workspace.yaml   nearest-workspace root (isolates this repo from a surrounding harness checkout)
package.json          npm metadata; files whitelist = published content
.github/workflows/    CI (3 OS × 2 Node), monthly compat probe, v* npm release + GitHub
                      Release, plugin-doctor static R/K gate, OpenSSF Scorecard
README.md             English primary (GitHub default page; source of truth)
README.{zh,es,pt,hi}.md  translations, top switcher, updated in the same commit
CHANGELOG.md          Keep a Changelog, [Unreleased] at the top
SECURITY.md           private vulnerability reporting + scope
THIRD_PARTY_NOTICES.md  install-time dependencies (none bundled)
LICENSE               Apache-2.0
```

## Hard rules applied here

- **`C1` is an error, never a warning.** The deletion has no alias and the injection callback
  never runs, so the only honest level is error. Only promote `C4`/`C5`/`H1`/`H2`/`H4` from
  advisory to error with evidence and a fixture that proves the false positive is gone.
- **`C3` and `P1` are blockers, never warnings.** If the local type line is stale, or the peer
  band lost its second segment, every other local signal is fake.
- **`H3` is card-only.** It is documented, id-parity checked, and deliberately has no
  detector; `CARD_ONLY` encodes that and the test suite asserts it stays that way.
- **The scanner is read-only and dependency-free.** No network, no child process, no write
  inside `--repo`; `lib/scan.mjs` imports only `node:fs` and `node:path`. Keep it that way.
- **A clean scan is necessary, not sufficient.** Never describe a scan as proof of
  adaptation: this corridor's breakage is silent, so a client half needs a real browser
  assertion, and the card's exit criterion is a real-host smoke on a temp `DSH_HOME`.
- **The card and the catalog are one catalog.** `test/card.test.mjs` fails when their ids or
  severities disagree. Change the card first, then the catalog, in the same commit.
- **Mount loud.** A missing `SKILL.md`, an empty body, or a frontmatter without `name` must
  abort the mount. Never register a placeholder skill.
- **The skill id is the frontmatter name.** `skillName` selects the directory; the registered
  name comes from the file. Keep the three in sync (`plugin-upgrade-015rc1`: directory,
  frontmatter `name`, `package.json` Config default, `cordis.patch.yml`).
- **Registration is an effect.** `ctx.skills.register()` runs inside `ctx.effect()` so the
  disposer removes the contribution on unload; the test asserts that.
- **No build step.** Pure ESM: `index.mjs` + `lib/` are the shipped artifacts. There is no
  `build`/`prepare` script — keep it that way.
- **Optional seams fail closed.** `skills` is a hard `inject`; if the service is absent the
  plugin waits rather than registering into a void.
- **License headers.** `// SPDX-License-Identifier: Apache-2.0` is the first line of every
  source file; `# SPDX-License-Identifier: Apache-2.0` heads `cordis.patch.yml`.

## Checks

```sh
npm install                        # or: pnpm install (pnpm-lock.yaml is committed)
npm test                           # node --test: scanner + card parity + real-registry mount
npm run verify:self-contained      # every import resolves inside the package
npm run verify:artifacts           # tarball contents + entry import + dev-only content excluded
npm run check:readmes              # five-language README consistency
npm pack                           # the published tarball
```

`pnpm-workspace.yaml` keeps `minimumReleaseAge: 0`: pnpm 11 enables a 1440-minute age gate by
default and its frozen-install lockfile verification ignores `minimumReleaseAgeExclude`, so
the freshly published `@deepseek-ai` pins would otherwise keep a fresh install red for 24h
after every harness release.

## Release

Version is currently `0.1.0`. For a new version: bump `package.json#version`, stamp the
CHANGELOG `[Unreleased]` section into `## [<x.y.z>] - <UTC date>`, re-run the full gate,
commit `chore(release): <x.y.z>`, and `git tag -a v<x.y.z>`. `git push origin main
--follow-tags` triggers `.github/workflows/release.yml`, which re-runs the gate, publishes to
npm with provenance (skipped without the `NPM_TOKEN` secret) and creates the GitHub Release
from the stamped CHANGELOG section behind an idempotent `gh release view` guard. Never push a
tag for a version already on the registry.
**Publish incident (2026-09-10, the first tag).** `v0.1.0`'s first run failed in
`Publish to npm` with `*** is not a legal HTTP header value`, after the provenance statement
had already been signed and published to the transparency log. The step read the token through
setup-node's `${NODE_AUTH_TOKEN}` expansion at the time; it now normalises line breaks and
writes `//registry.npmjs.org/:_authToken=…` into `NPM_CONFIG_USERCONFIG` itself. The rewritten
step reports whether the secret carried line breaks, and it reported **no** — so the
trailing-newline hypothesis is disproven and the mechanism of the env-expanded failure is NOT
established. What is established: that path failed, the directly written userconfig publishes.
`v0.1.0` was re-tagged onto the fix (allowed: the version was not on the registry yet). Do not
reintroduce `${NODE_AUTH_TOKEN}` without re-testing it.

The scanner catalog is evidence-bound: a version bump that changes a seam must update the
card, `docs/EVIDENCE.md`, the fixtures and `CHANGELOG.md` in the same commit.

**Post-publish integration (not done in this repository's history yet).** The README badge
row expects `PerryLink/dsh-plugin-doctor` to carry a
`PerryLink__dsh-plugin-upgrade-rc1.svg` badge, and the family also enrols each package in the
Gitee mirror, the `dsh-catalog` directory and the omdsh workshop list. Those are release-side
steps performed from the family workspace after the first tag.

## Docs

- Five-language READMEs (`README.md` is the source; `README.zh.md`, `README.es.md`,
  `README.pt.md`, `README.hi.md` follow). Every behavior change updates all five in the same
  commit; `check:readmes` enforces the shared section count and the install line in CI.
- GitHub topics `dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`,
  `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (mirror
  `package.json` keywords; the ecosystem's visibility channel is the `dsh-plugin` topic).
- License is Apache-2.0 (`LICENSE` + the package.json `license` field).
  `THIRD_PARTY_NOTICES.md` documents install-time dependencies; nothing is bundled.
- Every factual claim in the card or the scanner traces to a command recorded in
  `docs/EVIDENCE.md`. Where a claim could not be verified it is marked **unverified** and
  kept out of the card.
