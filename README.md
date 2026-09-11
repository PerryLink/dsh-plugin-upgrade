<div align="center">

# ⬆️ dsh-plugin-upgrade-0.1.3-0.1.5
- **1024 store channel**: `npm i -g dsh1024` once, then `dsh1024 plugin --profile web add dsh-plugin-upgrade-0.1.3-0.1.5` (counts toward the [deepseek1024.com](https://deepseek1024.com) install ranking).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade-0.1.3-0.1.5)

**Merged, version-locked plugin upgrade skill for DeepSeek Harness — `0.1.3-alpha.1` → `0.1.5-rc.1`, carried as two closed legs.**

*Leg A `0.1.3-alpha.1` → `0.1.5-alpha.1`, leg B `0.1.5-alpha.1` → `0.1.5-rc.1`: one corridor card plus one zero-dependency seam scanner over the merged 20-seam catalog, so a client half that stopped mounting silently is never mistaken for "typecheck is green".*

> **Official repository.** This is the only official repository of dsh-plugin-upgrade-0.1.3-0.1.5, maintained by PerryLink. It supersedes the two version-locked packages `dsh-plugin-upgrade` (leg A) and `dsh-plugin-upgrade-rc1` (leg B). Same-name repositories under other accounts are not affiliated.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade-0.1.3-0.1.5.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![Node](https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-brightgreen.svg)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5/ci.yml?branch=main&label=CI)](https://github.com/PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5/actions)
[![Version](https://img.shields.io/github/v/tag/PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5?label=version)](https://github.com/PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5/releases)
[![npm version](https://img.shields.io/npm/v/dsh-plugin-upgrade-0.1.3-0.1.5)](https://www.npmjs.com/package/dsh-plugin-upgrade-0.1.3-0.1.5)
[![npm downloads](https://img.shields.io/npm/dm/dsh-plugin-upgrade-0.1.3-0.1.5)](https://www.npmjs.com/package/dsh-plugin-upgrade-0.1.3-0.1.5)

[English](README.md) · [简体中文](README-zh.md) · [Español](README-es.md) · [Português](README-pt.md) · [हिन्दी](README-hi.md)

</div>

---

## Compatibility

| Surface | Status |
|---|---|
| Harness | DeepSeek Harness `0.1.5-rc.1` (tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`; leg A→B handoff `dsh-v0.1.5-alpha.1` = `5dda764ed3aa`; corridor start `0.1.3-alpha.1`). Peer band `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Platforms | Anywhere Node runs; the scanner is filesystem-only and platform-neutral |
| Model | Text-only models fully supported; the skill is a Markdown body, no tool or vision requirement |
| Scope | **Two closed legs, one span**: leg A `0.1.3-alpha.1` → `0.1.5-alpha.1` plus leg B `0.1.5-alpha.1` → `0.1.5-rc.1`. A corridor never widens: a hop after `0.1.5-rc.1` is a new package. |
| Legs | Both legs live in this package: leg A keeps the `S1`–`S10` + `M1` seams, leg B keeps `C1`, `C2`, `C4`, `C5`, `H1`–`H4`, `P1` — each with its own evidence, card section, fixtures and rollback path. There is no sibling package to install. |
| `C3` | Retired: leg B's card spelled the stale-type-line false green `C3`, which is the same defect as leg A's `M1`. The fold is recorded on the card; `--seams C3` matches nothing. |

## What you get

Two halves, one seam catalog:

- **A bundled agent skill (`plugin-upgrade-015`)** — the merged corridor card and a fix-and-verify loop. The body first routes the caller to the leg that matches its peer band; the model loads it only when a task actually needs it, and the package contributes no system-prompt paragraph and no tool.
- **A zero-dependency CLI (`dsh-plugin-upgrade-015-scan`)** — reports `file:line` facts for the merged twenty seams (`S3`, `S8`, `S9`, `M1`, `S4`, `S5`, `S6`, `S7`, `S2`, `S1`, `S10`, `C1`, `C2`, `P1`, `C4`, `C5`, `H1`, `H2`, `H4`, `H3`) re-read from the harness tag ranges on 2026-09-09 (leg A) and 2026-09-10 (leg B). Exit `1` on any error-severity hit, so it drops straight into CI.

The point is the failure mode this corridor exists to kill: **this span's breakage is mostly silent, from both ends.** The type line can be stale, so the repo compiles against the **old** catalog (seam `M1`), and the bare `conversation` client slot was deleted with no alias while `ctx.slots.inject()` only runs its callback when the declaration exists — so a client half that still targets it stops mounting with no error, no log line and no failed build (seam `C1`). Three classes of breakage survive `typecheck` + `test`:

1. the local gate compiles a stale type line — old `paths` alias, or dev/test types pinned at `0.1.5-alpha.*` (seam `M1`);
2. a log writer omits the V3 required `stream` field, so the session imports and then refuses to resume (seam `S3`);
3. the tests are mocked against the old shape, so they pass while the host drops the contribution (seam `C1`).

Honest sizing: leg B's workspace sweep found that the family's client halves use only **8** slot keys, all of which survive in rc.1 — for them the rc.1 breakage is **latent, not actual**. Third-party client plugins that targeted the bare `conversation` key are the ones that break, and they break quietly. Leg A's sweep found the opposite texture: 40 repos, 11 of them hit `M1`, and fixing the stale path exposed real TypeScript errors in 3 repos that were previously "green".

## Quick start

```sh
# 1. install the bundle into your profile
dsh plugin --profile web add dsh-plugin-upgrade-0.1.3-0.1.5

# 2. verify the row mounted
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade-0.1.3-0.1.5'

# 3. scan the plugin you are upgrading
npx dsh-plugin-upgrade-015-scan --repo ../my-plugin
```

Then ask the agent to use the `plugin-upgrade-015` skill, or drive the loop yourself with the card at
`skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md` (leg A is §1, leg B is §2, the merged seam index is §3).

## Install & uninstall

```sh
dsh plugin --profile web add dsh-plugin-upgrade-0.1.3-0.1.5            # from npm
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5#main"   # from source
dsh plugin --profile web remove dsh-plugin-upgrade-0.1.3-0.1.5         # uninstall (reversible)
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
    - id: dsh-plugin-upgrade-0.1.3-0.1.5
      name: dsh-plugin-upgrade-0.1.3-0.1.5
      config:
        skillName: plugin-upgrade-015
```

The plugin mounts loud: a missing `SKILL.md`, an empty body, or a frontmatter without `name` fails the mount instead of registering an empty skill.

## Surfaces

**Skill** — `plugin-upgrade-015` (model- and user-invocable by default). Body: leg routing table, the 8 hard rules and the 6-step loop. References: the merged corridor card. Scripts: the detector, shipped inside the skill directory so relative paths resolve.

**CLI** — `dsh-plugin-upgrade-015-scan`:

```sh
dsh-plugin-upgrade-015-scan [--repo <path>] [--json <out.json>] [--seams S3,C1,P1] [--quiet]
```

| Flag | Meaning |
|---|---|
| `--repo <path>` | Repository to scan (default: cwd). |
| `--json <out.json>` | Also write the machine-readable report (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams S3,C1,P1` | Restrict to specific seams of the merged catalog. |
| `--quiet` | Suppress the human rendering (pair with `--json`). |

Exit codes: `0` no error-severity hit · `1` at least one error-severity hit · `2` usage or scan failure. A clean scan is necessary but not sufficient — the exit criterion is a real-host smoke, plus a resume round-trip for log writers (leg A) and a real browser assertion for the client half (leg B).

## The twenty seams

Order follows the catalog in `lib/scan.mjs` (leg A first, then leg B), which is also the order `test/card.test.mjs` pins the card to.

| Id | Severity | What changed on the way to `0.1.5-rc.1` |
|---|---|---|
| `S3` | error | `assistant/message` gained a required `stream` field (session format V3): a log written without it imports successfully and then refuses to resume (`Session.fromRestore` throws `invalid settlement fields`). |
| `S8` | error | `SessionHandle.read()` returns `SessionHandleReadResult` (`{ eventState, events }`) instead of the event array; array operations must unwrap `.events`. |
| `S9` | error | `SystemPrompt`'s config renamed `persona` → `personaPrefix` / `personaSuffix`. Substituting `includeHarnessIdentity: false` is **not** equivalent — it deletes the harness identity block. |
| `M1` | error | The local gate compiles a stale type line: dev/test types pinned at `0.1.5-alpha.*`, or a `tsconfig` `paths` alias resolving to a missing checkout directory, makes TypeScript fall back silently to the published types. Green gate, wrong ruler. |
| `S4` | error | `tool/code-dispatch` was renamed `tool/ptc-dispatch`; the old label is no longer recognized in V3 sessions. |
| `S5` | error | `ctx.agent` was removed: the caller must pass the Agent explicitly (e.g. the second parameter of `setup(agentCtx, agent)`). |
| `S6` | error | `Inbox` is a type interface, not a constructable class; fixtures use the official unsupported shape and runtime code reads `agent.inbox`. |
| `S7` | warn | `SubprocessHandle.pid` was removed (only `SubprocessTerminalHandle.pid` remains); drop the field from test fixtures. |
| `S2` | warn | `EpochHeader.system` was removed: the system prompt is surface node 0's `system/message` now. |
| `S1` | warn | Session format V3 and generation-suffixed log names — the current generation is `session.v3.jsonl.zstd`, so scripts that hardcode `session.jsonl.zstd` fail silently. |
| `S10` | warn | Plugin-authored session events must go through the host's fail-closed adaptation gate: `Session.append` has no `ignorable` write channel, so an unconditional append can make a session unreadable. |
| `C1` | error | The bare client slot `conversation` was deleted and replaced by `main` + `main.conversation`, with **no alias**. `ctx.slots.inject()` only fires when the declaration exists, so a plugin targeting it stops mounting **silently**. |
| `C2` | error | `@deepseek-ai/dsh-client-ui-sidebar-textpreview` was renamed `…-sidebar-documentpreview`; the old name is gone with no shim package. |
| `P1` | error | The peer band must keep its second segment: `>=0.1.2-rc.1 <0.2.0` alone **rejects** `0.1.5-rc.1` under npm semver's prerelease-tuple rule (measured `false` on semver 7.8.5). |
| `C4` | warn | rc.1 added a global main-panel model (`main`, `sidebar.panellist`, `ctx.layout.selectPanel(MainPanelId \| null)`) and appended a `usePanelInfo` standard prop to almost every slot. |
| `C5` | warn | Document preview moved to the keyed slot `sidebar.right.tab.document` (`DocumentContent`); `sidebar.right.pane.tab` survives but its parent entry became `rightbar.session`. |
| `H1` | warn | `KNOWN_SESSION_EVENT_TYPES` gained `deliverables/presented` and `subagent/catalog` — the fail-closed vocabulary grew. |
| `H2` | warn | The new `present` tool's row occupies `tool.call.toolview` key `'present'`, which was free in alpha.1. |
| `H4` | info | The DeepSeek adapter's default advisory catalog now leads with `deepseek-flash` (DeepSeek-V41-Flash). |
| `H3` | info | New optional capabilities: `ctx.sessionFeedback`, `ctx.layout.beginNavigation()`, `ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`. Listed on the card; deliberately not auto-detected. |

`S7`, `S2`, `S1`, `S10`, `C4`, `C5`, `H1`, `H2` and `H4` are deliberately advisory: they have legitimate matches (a repo that already uses the new API, a documentation snapshot, a plugin's own model-id table, a Node `ChildProcess.pid`), so the scanner reports them as leads for manual review rather than failures. `M1` and `P1` are **structured** checks — they resolve `package.json` and `tsconfig*.json` instead of matching text — and `H3` is **card-only**: documented, id-parity checked, and deliberately without a detector (`CARD_ONLY = ['H3']`).

## What this does not cover

- **A hop after `0.1.5-rc.1`.** The merged span ends at rc.1 by construction: the harness hop `0.1.5-rc.1` → `0.1.5-rc.2` added no plugin-facing seam (this package's own dev/test pin and CI probe run on the `0.1.5-rc.2` line so the catalog is verified against the newest published types). Anything that adds a seam later is a **new package** — a card that drifts is worse than no card.
- **The `0.1.1` → `0.1.2` hop.** Use the community convergence skill.
- **Restating across legs.** Leg A owns the session-format seams (`assistant/message.stream`, `SessionHandleReadResult`, `EpochHeader.system`, `ctx.agent`, `Inbox`, `SystemPrompt.persona`, the V3 log generation) and leg B does not restate them — the whole `packages/core/session/src` diff in leg B's range is two added event-type literals and one comment line. Each leg's card section keeps its own scope statement.
- **The DSH user-facing upgrade path.** This package upgrades *plugin source code*, not a user's harness installation.
- **Theme tokens.** `docs/web-styling.md` has zero changes in leg B's range.
- **Proof.** A clean scan is a hypothesis. The exit criterion is a real-host smoke (temp `DSH_HOME`, target CLI, `plugin add <tarball>`, `--dump-config`) plus a resume round-trip for session-log writers (leg A) and a real browser assertion for every client-side hit (leg B).

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

The scanner has a synthetic fixture pair **per leg**: `fixtures/leg-a-bad-repo` (leg A's session/config seams, every error seam present on purpose) with `fixtures/leg-a-good-repo` (adapted), and `fixtures/bad-repo` (leg B's client-slot seams) with `fixtures/good-repo` (adapted) — plus a live negative on a family repository already pinned to `0.1.5-rc.1`, so a regression in the catalog fails the suite rather than a downstream user. `test/card.test.mjs` asserts that the merged card index and `lib/scan.mjs` name **exactly** the same twenty seam ids with the same severities, and that `CARD_ONLY` is exactly `['H3']` — the evidence-binding rule as a machine gate.

## Topics

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (mirror `package.json` keywords; `dsh-plugin` is the ecosystem's visibility channel).

## PerryLink DSH Plugin Family

Part of the PerryLink DSH plugin family — 40+ repositories covering sessions, memory, permissions, delivery, observability and developer tooling. Browse the catalog at [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) or the [`dsh-plugin` topic](https://github.com/topics/dsh-plugin).

## License

Apache-2.0 — see [LICENSE](LICENSE). Install-time dependencies and their licenses are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); nothing is bundled.
