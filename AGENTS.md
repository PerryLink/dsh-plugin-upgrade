# AGENTS.md

Standalone DeepSeek Harness plugin repository (`dsh-plugin-upgrade`). Development follows
the dsh-plugin-guide skill and the official plugin contract; this file records repo-local
decisions. Read `README.md` (external contract) and the packaged version card
(`skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-alpha.1.md`) before
changing behavior.

## Layout (JS form, pure host, no browser half)

```
index.mjs             single host face: Config schema + skill bundle reader + apply()
types.d.ts            Config, SeamHit, ScanReport and the public function surface
lib/scan.mjs          zero-dependency seam catalog + scanner + CLI main()
scripts/scan-0.1.5.mjs   thin bin wrapper (npx dsh-plugin-upgrade-scan)
skills/plugin-upgrade-015/scripts/scan-0.1.5.mjs  the same wrapper inside the skill directory,
                      so the skill body's `./scripts/...` resolves against its resourceBase
scripts/sweep-all.mjs    maintainer tool: sweep a workspace of plugin repos into a table
scripts/changelog-section.mjs  print one CHANGELOG section for GitHub Release notes
scripts/verify-self-contained.mjs  every import resolves inside the package
scripts/verify-artifacts.mjs       pack + inspect the published tarball
scripts/check-readme-sync.mjs      five-language README consistency
skills/plugin-upgrade-015/SKILL.md  the bundled skill body (frontmatter name is the skill id)
skills/plugin-upgrade-015/references/…  the version card
test/scan.test.mjs    synthetic bad/good fixtures + a live negative on an adapted repo
test/plugin.test.mjs  real Cordis Context + real SkillRegistry: register, dispose, negative
fixtures/             scanner fixtures (bad-repo, good-repo)
cordis.patch.yml      bundle declaration (insert dsh-plugin-upgrade); every Config key inline
pnpm-workspace.yaml   nearest-workspace root (isolates this repo from a surrounding harness checkout)
package.json          npm metadata; files whitelist = published content
.github/workflows/    CI (3 OS × 2 Node), monthly compat probe, v* npm release
README.md             English primary (GitHub default page; source of truth)
README.{zh,es,pt,hi}.md  translations, top switcher, updated in the same commit
CHANGELOG.md          Keep a Changelog, [Unreleased] at the top
SECURITY.md           private vulnerability reporting + scope
THIRD_PARTY_NOTICES.md  install-time dependencies (none bundled)
LICENSE               Apache-2.0
```

## Hard rules applied here

- **The corridor is locked.** This package upgrades plugins across `0.1.3-alpha.1 →
  0.1.5-alpha.1` and nothing else. Do not widen the peer band or the card to "all versions":
  a drifting card is worse than no card. A new corridor is a new package.
- **M1 is an error, never a warning.** If a `tsconfig` `paths` alias does not resolve, every
  other local signal is fake. The scanner must keep failing the run for it.
- **The scanner is read-only and dependency-free.** No network, no child process, no write
  inside `--repo`; `lib/scan.mjs` imports only `node:fs` and `node:path`. Keep it that way.
- **Advisory seams stay advisory.** `S7`/`S1`/`S2`/`S10` have legitimate matches; they are
  leads for manual review. Only promote one to `error` with evidence and a fixture that
  proves the false positive is gone.
- **A clean scan is necessary, not sufficient.** Never describe a scan as proof of
  adaptation; the card's exit criterion is a real-host smoke on a temp `DSH_HOME`.
- **Mount loud.** A missing `SKILL.md`, an empty body, or a frontmatter without `name` must
  abort the mount. Never register a placeholder skill.
- **The skill id is the frontmatter name.** `skillName` selects the directory; the registered
  name comes from the file. Keep the two in sync (`plugin-upgrade-015`).
- **Registration is an effect.** `ctx.skills.register()` runs inside `ctx.effect()` so the
  disposer removes the contribution on unload; the test asserts that.
- **No build step.** Pure ESM: `index.mjs` + `lib/` are the shipped artifacts. There is no
  `build`/`prepare` script — keep it that way.
- **Optional seams fail closed.** `skills` is a hard `inject`; if the service is absent the
  plugin waits rather than registering into a void.

## Checks

```sh
pnpm install
pnpm test                          # node --test (9 tests: scanner + real-registry mount)
pnpm run verify:self-contained     # dependency specs resolve from the registry
pnpm run verify:artifacts          # shipped files present + entry importable from the tarball
pnpm run check:readmes             # five-language README consistency
pnpm pack                          # the published tarball
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
npm with provenance (skipped without the `NPM_TOKEN` secret), and creates the GitHub Release
from the stamped CHANGELOG section. Never push a tag for a version already on the registry.

The scanner catalog is evidence-bound: a version bump that changes a seam must update the
card, the fixtures and `CHANGELOG.md` in the same commit.

## Docs

- Five-language READMEs (`README.md` is the source; `README.zh.md`, `README.es.md`,
  `README.pt.md`, `README.hi.md` follow). Every behavior change updates all five in the same
  commit; `check:readmes` enforces the shared surface in CI.
- GitHub topics `dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`,
  `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner` (mirror `package.json`
  keywords; the ecosystem's visibility channel is the `dsh-plugin` topic).
- License is Apache-2.0 (`LICENSE` + the package.json `license` field).
  `THIRD_PARTY_NOTICES.md` documents install-time dependencies; nothing is bundled.
