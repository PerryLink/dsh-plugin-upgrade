<div align="center">

# ⬆️ dsh-plugin-upgrade-rc1
- **1024 store channel**: `npm i -g dsh1024` once, then `dsh1024 plugin --profile web add dsh-plugin-upgrade-rc1` (counts toward the [deepseek1024.com](https://deepseek1024.com) install ranking).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade-rc1)

**Version-locked plugin upgrade skill for DeepSeek Harness — `0.1.5-alpha.1` → `0.1.5-rc.1`.**

*A corridor card plus a zero-dependency seam scanner, so a client half that stopped mounting silently is never mistaken for "typecheck is green".*

> **Official repository.** This is the only official repository of dsh-plugin-upgrade-rc1, maintained by PerryLink. Same-name repositories under other accounts are not affiliated.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade-rc1.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![Node](https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-brightgreen.svg)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/PerryLink/dsh-plugin-upgrade-rc1/ci.yml?branch=main&label=CI)](https://github.com/PerryLink/dsh-plugin-upgrade-rc1/actions)
[![Version](https://img.shields.io/github/v/tag/PerryLink/dsh-plugin-upgrade-rc1?label=version)](https://github.com/PerryLink/dsh-plugin-upgrade-rc1/releases)
[![npm version](https://img.shields.io/npm/v/dsh-plugin-upgrade-rc1)](https://www.npmjs.com/package/dsh-plugin-upgrade-rc1)
[![npm downloads](https://img.shields.io/npm/dm/dsh-plugin-upgrade-rc1)](https://www.npmjs.com/package/dsh-plugin-upgrade-rc1)

[English](README.md) · [简体中文](README-zh.md) · [Español](README-es.md) · [Português](README-pt.md) · [हिन्दी](README-hi.md)

</div>

---

## Compatibility

| Surface | Status |
|---|---|
| Harness | DeepSeek Harness `0.1.5-rc.1` (tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`; corridor start `dsh-v0.1.5-alpha.1` = `5dda764ed3aa`). Peer band `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Platforms | Anywhere Node runs; the scanner is filesystem-only and platform-neutral |
| Model | Text-only models fully supported; the skill is a Markdown body, no tool or vision requirement |
| Scope | **One corridor only**: `0.1.5-alpha.1` → `0.1.5-rc.1`. It is not a general migration framework. |
| Sibling corridor | `0.1.3-alpha.1` → `0.1.5-alpha.1` is [`dsh-plugin-upgrade`](https://github.com/PerryLink/dsh-plugin-upgrade). Read that card first if your peer band is below `0.1.5-alpha.1`; this package does not re-cover those seams. |

## What you get

Two halves, one seam catalog:

- **A bundled agent skill (`plugin-upgrade-015rc1`)** — the corridor card and a fix-and-verify loop. The model loads it only when a task actually needs it; the package contributes no system-prompt paragraph and no tool.
- **A zero-dependency CLI (`dsh-plugin-upgrade-rc1-scan`)** — reports `file:line` facts for ten seams (`C1`–`C5`, `H1`–`H4`, `P1`) re-read from the harness tag range on 2026-09-10. Exit `1` on any error-severity hit, so it drops straight into CI.

The point is the failure mode this corridor exists to kill: **this hop's breakage is silent.** The bare `conversation` client slot was deleted with no alias, and `ctx.slots.inject()` only runs its callback when the declaration exists — so a client half that still targets it stops mounting with no error, no log line and no failed build. Two classes of breakage survive `typecheck` + `test`:

1. the type line is stale, so the repo compiles against the **old** slot catalog (seam `C3`);
2. the tests are mocked against the old shape, so they pass while the host drops the contribution.

Honest sizing: this package's own workspace sweep found that the family's client halves use only **8** slot keys, all of which survive in rc.1 — for them the breakage is **latent, not actual**. Third-party client plugins that targeted the bare `conversation` key are the ones that break, and they break quietly.

## Quick start

```sh
# 1. install the bundle into your profile
dsh plugin --profile web add dsh-plugin-upgrade-rc1

# 2. verify the row mounted
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade-rc1'

# 3. scan the plugin you are upgrading
npx dsh-plugin-upgrade-rc1-scan --repo ../my-plugin
```

Then ask the agent to use the `plugin-upgrade-015rc1` skill, or drive the loop yourself with the card at
`skills/plugin-upgrade-015rc1/references/v0.1.5-alpha.1-to-v0.1.5-rc.1.md`.

## Install & uninstall

```sh
dsh plugin --profile web add dsh-plugin-upgrade-rc1            # from npm
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade-rc1#main"   # from source
dsh plugin --profile web remove dsh-plugin-upgrade-rc1         # uninstall (reversible)
```

Installing the bundle only registers a skill; removing the row removes the skill. The CLI is a normal `npx` target and needs no profile at all.

## Configuration

Every key is optional and lives in the profile patch:

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Register the packaged skill. Set `false` to keep the dependency mounted but silent. |
| `skillName` | `plugin-upgrade-015rc1` | Directory under `skillsRoot` to register, and the name shown in the catalog. |
| `skillsRoot` | the package's own `./skills` | Where `<skillName>/SKILL.md` lives. Point it at your own card to reuse the plumbing. |
| `userInvocable` | `true` | Whether a human can invoke the skill by name in addition to the model. |

```yaml
- insert:
    - id: dsh-plugin-upgrade-rc1
      name: dsh-plugin-upgrade-rc1
      config:
        skillName: plugin-upgrade-015rc1
```

The plugin mounts loud: a missing `SKILL.md`, an empty body, or a frontmatter without `name` fails the mount instead of registering an empty skill.

## Surfaces

**Skill** — `plugin-upgrade-015rc1` (model- and user-invocable by default). Body: the 6-step loop. References: the corridor card. Scripts: the detector, shipped inside the skill directory so relative paths resolve.

**CLI** — `dsh-plugin-upgrade-rc1-scan`:

```sh
dsh-plugin-upgrade-rc1-scan [--repo <path>] [--json <out.json>] [--seams C1,P1] [--quiet]
```

| Flag | Meaning |
|---|---|
| `--repo <path>` | Repository to scan (default: cwd). |
| `--json <out.json>` | Also write the machine-readable report (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams C1,P1` | Restrict to specific seams. |
| `--quiet` | Suppress the human rendering (pair with `--json`). |

Exit codes: `0` no error-severity hit · `1` at least one error-severity hit · `2` usage or scan failure. A clean scan is necessary but not sufficient — this corridor's exit criterion is a real-host smoke **and** a real browser assertion for the client half.

## The ten seams

| Id | Severity | What changed in the `0.1.5-rc.1` line |
|---|---|---|
| `C1` | error | The bare client slot `conversation` was deleted and replaced by `main` + `main.conversation`, with **no alias**. `ctx.slots.inject()` only fires when the declaration exists, so a plugin targeting it stops mounting **silently**. |
| `C2` | error | `@deepseek-ai/dsh-client-ui-sidebar-textpreview` was renamed `…-sidebar-documentpreview`; the old name is gone with no shim package. |
| `C3` | error | Client-side false green: dev/test types pinned at the `0.1.5-alpha.*` line, or a `tsconfig` `paths` alias pointing at a missing checkout directory, makes TypeScript fall back to the old catalog. |
| `C4` | warn | rc.1 added a global main-panel model (`main`, `sidebar.panellist`, `ctx.layout.selectPanel(MainPanelId \| null)`) and appended a `usePanelInfo` standard prop to almost every slot. |
| `C5` | warn | Document preview moved to the keyed slot `sidebar.right.tab.document` (`DocumentContent`); `sidebar.right.pane.tab` survives but its parent entry became `rightbar.session`. |
| `H1` | warn | `KNOWN_SESSION_EVENT_TYPES` gained `deliverables/presented` and `subagent/catalog` — the fail-closed vocabulary grew. |
| `H2` | warn | The new `present` tool's row occupies `tool.call.toolview` key `'present'`, which was free in alpha.1. |
| `H3` | info | New optional capabilities: `ctx.sessionFeedback`, `ctx.layout.beginNavigation()`, `ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`. Listed on the card; deliberately not auto-detected. |
| `H4` | info | The DeepSeek adapter's default advisory catalog now leads with `deepseek-flash` (DeepSeek-V41-Flash). |
| `P1` | error | The peer band must keep its second segment: `>=0.1.2-rc.1 <0.2.0` alone **rejects** `0.1.5-rc.1` under npm semver's prerelease-tuple rule (measured `false` on semver 7.8.5). |

`C4`, `C5`, `H1`, `H2` and `H4` are deliberately advisory: they have legitimate matches (a repo that already uses the new API, a documentation snapshot, a plugin's own model-id table), so the scanner reports them as leads for manual review rather than failures.

## What this does not cover

- **The earlier corridor.** `0.1.3-alpha.1` → `0.1.5-alpha.1` is `dsh-plugin-upgrade`. Read its card first if your peer band is below `0.1.5-alpha.1`; this package does not re-cover those seams.
- **Session-format seams.** `assistant/message.stream`, `SessionHandleReadResult`, `EpochHeader.system`, `ctx.agent`, `Inbox` and `SystemPrompt.persona` are **unchanged** in this hop (the whole `packages/core/session/src` diff is two added event-type literals and one comment line), so re-stating them here would be drift. They live on the sibling card.
- **Future lines.** `0.1.5-rc.1` → final and anything after it are out of scope; the card is version-locked on purpose, because a card that drifts is worse than no card.
- **The DSH user-facing upgrade path.** This package upgrades *plugin source code*, not a user's harness installation.
- **Theme tokens.** `docs/web-styling.md` has zero changes in this range.
- **Proof.** A clean scan is a hypothesis. The exit criterion is a real-host smoke (temp `DSH_HOME`, rc.1 CLI, `plugin add <tarball>`, `--dump-config`) plus a real browser assertion for every client-side hit.

## Security boundaries

- **Read-only scan.** The CLI never writes inside the scanned repository; `--json` writes only to the path you pass.
- **No network, no shell.** The scanner imports nothing beyond Node's standard library and never spawns a process.
- **No secrets.** Nothing in the package reads credentials, environment tokens, or session data.
- **Sandboxed smoke recipe.** The card's real-host check uses a `mkdtemp` `DSH_HOME`; it never touches your real `~/.dsh`.

## Development

```sh
npm install                        # or: pnpm install (the repo ships a pnpm-lock.yaml)
npm test                           # node --test: scanner, card<->catalog parity, real Cordis + SkillRegistry
npm run verify:self-contained      # every import resolves inside the package
npm run verify:artifacts           # the packed tarball carries the skill, CLI and patch, and excludes tests
npm run check:readmes              # five-language README consistency
npm pack
```

The scanner has its own synthetic `fixtures/bad-repo` (every error seam present on purpose) and `fixtures/good-repo` (adapted), plus a live negative on a family repository already pinned to `0.1.5-rc.1`, so a regression in the catalog fails the suite rather than a downstream user. `test/card.test.mjs` asserts that the card and `lib/scan.mjs` name **exactly** the same seam ids with the same severities — the evidence-binding rule as a machine gate.

## Topics

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (mirror `package.json` keywords; `dsh-plugin` is the ecosystem's visibility channel).

## PerryLink DSH Plugin Family

Part of the PerryLink DSH plugin family — 40+ repositories covering sessions, memory, permissions, delivery, observability and developer tooling. Browse the catalog at [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) or the [`dsh-plugin` topic](https://github.com/topics/dsh-plugin).

## License

Apache-2.0 — see [LICENSE](LICENSE). Install-time dependencies and their licenses are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); nothing is bundled.
