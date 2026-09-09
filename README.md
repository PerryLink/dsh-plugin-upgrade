<div align="center">

# ⬆️ dsh-plugin-upgrade
- **1024 store channel**: `npm i -g dsh1024` once, then `dsh1024 plugin --profile web add dsh-plugin-upgrade` (counts toward the [deepseek1024.com](https://deepseek1024.com) install ranking).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade)

**Version-locked plugin upgrade skill for DeepSeek Harness — `0.1.3-alpha.1` → `0.1.5-alpha.1`.**

*A version card plus a zero-dependency seam scanner, so "typecheck is green" is never mistaken for "the plugin still works".*

> **Official repository.** This is the only official repository of dsh-plugin-upgrade, maintained by PerryLink. Same-name repositories under other accounts are not affiliated.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![Node](https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-brightgreen.svg)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/PerryLink/dsh-plugin-upgrade/ci.yml?branch=main&label=CI)](https://github.com/PerryLink/dsh-plugin-upgrade/actions)
[![Version](https://img.shields.io/github/v/tag/PerryLink/dsh-plugin-upgrade?label=version)](https://github.com/PerryLink/dsh-plugin-upgrade/releases)
[![npm version](https://img.shields.io/npm/v/dsh-plugin-upgrade)](https://www.npmjs.com/package/dsh-plugin-upgrade)
[![npm downloads](https://img.shields.io/npm/dm/dsh-plugin-upgrade)](https://www.npmjs.com/package/dsh-plugin-upgrade)

[English](README.md) · [简体中文](README.zh.md) · [Español](README.es.md) · [Português](README.pt.md) · [हिन्दी](README.hi.md)

</div>

---

## Compatibility

| Surface | Status |
|---|---|
| Harness | DeepSeek Harness `0.1.5-alpha.1` (checkout `19d2e38480`, tag `dsh-v0.1.5-alpha.1` = `5dda764ed3`). Peer band `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Platforms | Anywhere Node runs; the scanner is filesystem-only and platform-neutral |
| Model | Text-only models fully supported; the skill is a Markdown body, no tool or vision requirement |
| Scope | **One corridor only**: `0.1.3-alpha.1` → `0.1.5-alpha.1`. It is not a general migration framework. |

## What you get

Two halves, one seam catalog:

- **A bundled agent skill (`plugin-upgrade-015`)** — a version card and a fix-and-verify loop. The model loads it only when a task actually needs it; the package contributes no system-prompt paragraph and no tool.
- **A zero-dependency CLI (`dsh-plugin-upgrade-scan`)** — reports `file:line` facts for ten seams measured against 40 real plugin repositories during the 2026-09-09 adaptation wave. Exit `1` on any error-severity hit, so it drops straight into CI.

The point is the failure mode the card exists to kill: **a green local gate is not evidence of adaptation.** Two classes of breakage survive `typecheck` + `test`:

1. the published type line hides the seam, and the repo compiles against stale types (seam `M1`);
2. the tests are mocked against the old shape, so they pass while the host rejects the new one.

Four of the ten seams — `S3`, `S8`, `S9`, `M1` — were still uncovered by any community upgrade PR when this package was written; the other six are cross-checked against the wave evidence.

## Quick start

```sh
# 1. install the bundle into your profile
dsh plugin --profile web add dsh-plugin-upgrade

# 2. verify the row mounted
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade'

# 3. scan the plugin you are upgrading
npx dsh-plugin-upgrade-scan --repo ../my-plugin
```

Then ask the agent to use the `plugin-upgrade-015` skill, or drive the loop yourself with the card at
`skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-alpha.1.md`.

## Install & uninstall

```sh
dsh plugin --profile web add dsh-plugin-upgrade            # from npm
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade#main"   # from source
dsh plugin --profile web remove dsh-plugin-upgrade         # uninstall (reversible)
```

Installing the bundle only registers a skill; removing the row removes the skill. The CLI is a normal `npx` target and needs no profile at all.

## Configuration

Every key is optional and lives in the profile patch:

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Register the packaged skill. Set `false` to keep the dependency mounted but silent. |
| `skillName` | `plugin-upgrade-015` | Directory under `skillsRoot` to register, and the name shown in the catalog. |
| `skillsRoot` | the package's own `./skills` | Where `<skillName>/SKILL.md` lives. Point it at your own card to reuse the plumbing. |
| `userInvocable` | `true` | Whether a human can invoke the skill by name in addition to the model. |

```yaml
- insert:
    - id: dsh-plugin-upgrade
      name: dsh-plugin-upgrade
      config:
        skillName: plugin-upgrade-015
```

The plugin mounts loud: a missing `SKILL.md`, an empty body, or a frontmatter without `name` fails the mount instead of registering an empty skill.

## Surfaces

**Skill** — `plugin-upgrade-015` (model- and user-invocable by default). Body: the 6-step loop. References: the version card. Scripts: the detector, shipped inside the skill directory so relative paths resolve.

**CLI** — `dsh-plugin-upgrade-scan`:

```sh
dsh-plugin-upgrade-scan [--repo <path>] [--json <out.json>] [--seams S3,S8,M1] [--quiet]
```

| Flag | Meaning |
|---|---|
| `--repo <path>` | Repository to scan (default: cwd). |
| `--json <out.json>` | Also write the machine-readable report (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams S3,S8,M1` | Restrict to specific seams. |
| `--quiet` | Suppress the human rendering (pair with `--json`). |

Exit codes: `0` no error-severity hit · `1` at least one error-severity hit · `2` usage or scan failure. A clean scan is necessary but not sufficient — the card's exit criterion is a real-host smoke on a temporary `DSH_HOME`.

## The ten seams

| Id | Severity | What changed in the `0.1.5-alpha.1` line |
|---|---|---|
| `S1` | warn | Session format is V3; the log file is generation-scoped (`session.v3.jsonl.zstd`). Hardcoded `session.jsonl.zstd` paths silently stop working. |
| `S2` | warn | `EpochHeader.system` is gone; the system prompt is `system/message` at surface node 0. Readers need a structural fallback. |
| `S3` | error | `assistant/message` requires `stream`; without it the session imports but cannot be resumed (`Session.fromRestore` rejects invalid settlement fields). |
| `S4` | error | `tool/code-dispatch` was renamed `tool/ptc-dispatch`. |
| `S5` | error | `ctx.agent` was removed; callers receive the `Agent` explicitly. |
| `S6` | error | `Inbox` became a type interface — it can no longer be constructed; use `agent.inbox` and the official fixture shape. |
| `S7` | warn | `SubprocessHandle.pid` was removed (only `SubprocessTerminalHandle` keeps `pid`). |
| `S8` | error | `SessionHandle.read()` now returns `SessionHandleReadResult` — unwrap `.events`. |
| `S9` | error | `SystemPrompt` config `persona` became `personaPrefix` / `personaSuffix`. |
| `M1` | error | A `tsconfig` `paths` alias that points at a missing checkout directory makes TypeScript silently fall back to published types — the local gate turns **fake green**. |

`S7`, `S1`, `S2` and `S10` are deliberately advisory: they have legitimate matches (Node's own `pid`, legacy-generation readers, a plugin's own adaptive event gate), so the scanner reports them as leads for manual review rather than failures.

## What this does not cover

- **Other corridors.** `0.1.1` → `0.1.2` and future lines are out of scope; the card is version-locked on purpose, because a card that drifts is worse than no card.
- **The DSH user-facing upgrade path.** This package upgrades *plugin source code*, not a user's harness installation.
- **Client/browser behavior.** The scanner is static. A client half still needs a real browser assertion.
- **Proof.** A clean scan is a hypothesis. The exit criterion is a real-host smoke (temp `DSH_HOME`, target CLI, `plugin add <tarball>`, `--dump-config`, plus a resume round-trip for session-log writers).

## Security boundaries

- **Read-only scan.** The CLI never writes inside the scanned repository; `--json` writes only to the path you pass.
- **No network, no shell.** The scanner imports nothing beyond Node's standard library and never spawns a process.
- **No secrets.** Nothing in the package reads credentials, environment tokens, or session data.
- **Sandboxed smoke recipe.** The card's real-host check uses a `mkdtemp` `DSH_HOME`; it never touches your real `~/.dsh`.

## Development

```sh
pnpm install
pnpm test                          # node --test (real Cordis + real SkillRegistry)
pnpm run verify:self-contained     # every import resolves inside the package
pnpm run verify:artifacts          # the packed tarball carries the skill, CLI and patch
pnpm run check:readmes             # five-language README consistency
pnpm pack
```

The scanner has its own synthetic `fixtures/bad-repo` and `fixtures/good-repo` plus a live negative on a repository already adapted by the wave, so a regression in the catalog fails the suite rather than a downstream user.

## Topics

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner` (mirror `package.json` keywords; `dsh-plugin` is the ecosystem's visibility channel).

## PerryLink DSH Plugin Family

Part of the PerryLink DSH plugin family — 40 repositories covering sessions, memory, permissions, delivery, observability and developer tooling. Browse the catalog at [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) or the [`dsh-plugin` topic](https://github.com/topics/dsh-plugin).

## License

Apache-2.0 — see [LICENSE](LICENSE). Install-time dependencies and their licenses are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); nothing is bundled.
