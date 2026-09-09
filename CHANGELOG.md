# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2026-09-09

### Fixed

- **SKILL.md frontmatter on a CRLF checkout.** The parser required the `---\n`
  delimiter, so a Windows checkout (`core.autocrlf=true`) mounted the skill with the
  frontmatter leaked into the body and no description/`whenToUse`. Line endings are now
  normalized before parsing, `.gitattributes` pins every text file to LF, and the suite
  covers both a CRLF string and a CRLF-converted bundle on disk. Caught by the Windows
  CI leg of v0.1.0.

## [0.1.0] - 2026-09-09

### Added

- **Bundled agent skill `plugin-upgrade-015`** — the version-locked `0.1.3-alpha.1 → 0.1.5-alpha.1` upgrade corridor: a 6-step fix-and-verify loop plus the version card with host path, commit, minimal fix and regression for every seam.
- **Zero-dependency seam scanner** (`dsh-plugin-upgrade-scan`, also `dsh-plugin-upgrade/scan`) — reports `file:line` facts for ten seams measured against 40 real plugin repositories during the 2026-09-09 adaptation wave; exit `1` on any error-severity hit.
- **Ten-seam catalog** — `S1` V3 session format / generation-scoped log name, `S2` `EpochHeader.system` removal, `S3` `assistant/message.stream` required, `S4` `tool/code-dispatch` → `tool/ptc-dispatch`, `S5` `ctx.agent` removal, `S6` `Inbox` typed interface, `S7` `SubprocessHandle.pid` removal, `S8` `SessionHandleReadResult`, `S9` `SystemPrompt.persona` → `personaPrefix`/`personaSuffix`, `M1` stale `tsconfig` `paths` producing a silently fake-green typecheck.
- **M1 as a first-class defect** — the scanner resolves every checkout-style `tsconfig` alias and fails the scan when a target directory does not exist, instead of letting the repo compile against published types.
- **Plugin surface** — `enabled`, `skillName`, `skillsRoot`, `userInvocable` config keys; the skill registers through the injected `skills` service and unregisters with its effect disposer. A missing bundle, an empty body or a nameless frontmatter fails the mount loud.
- **Gates** — `node --test` against a real Cordis `Context` and the real `SkillRegistry`, five-language README consistency, self-contained import resolution, and a packed-tarball artifact check that imports the entry under plain Node.
