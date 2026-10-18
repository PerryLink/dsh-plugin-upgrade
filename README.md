<div align="center">

# ⬆️ dsh-plugin-upgrade
- **1024 store channel**: `npm i -g dsh1024` once, then `dsh1024 plugin --profile web add dsh-plugin-upgrade` (counts toward the [deepseek1024.com](https://deepseek1024.com) install ranking).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade)
[![dshfind](https://dshfind.com/api/badge/PerryLink/dsh-plugin-upgrade?metric=downloads)](https://dshfind.com/plugins/PerryLink/dsh-plugin-upgrade?ref=badge)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/PerryLink/dsh-plugin-upgrade/badge)](https://api.securityscorecards.dev/projects/github.com/PerryLink/dsh-plugin-upgrade)

**Plugin upgrade skill for DeepSeek Harness — one package, one corridor index, two closed corridors: `0.1.3-alpha.1` → `0.1.5-rc.1` (`legAB`) and `0.1.5-rc.2` → `0.1.6-alpha.2` (`legC`).**

*The scanner routes itself: it reads the target repository's declared dsh band (or takes `--span`), then applies that corridor's own evidence-bound catalog — `legAB`'s 20 seams (leg A `0.1.3-alpha.1` → `0.1.5-alpha.1` plus leg B `0.1.5-alpha.1` → `0.1.5-rc.1`) or `legC`'s 5 seams (`E1`–`E5`). One entry point, so a client half that stopped mounting silently is never mistaken for "typecheck is green".*

> **Official repository.** This is the only official repository of dsh-plugin-upgrade, maintained by PerryLink. It supersedes the retired version-locked packages `dsh-plugin-upgrade` (leg A) and `dsh-plugin-upgrade-rc1` (leg B), and it is the package the `0.1.5-rc.2` → `0.1.6-alpha.2` corridor (leg C) was folded into — the `dsh-plugin-upgrade-016` name never reached the registry. **Both `dsh-plugin-upgrade-015` and `dsh-plugin-upgrade-016` are retired as of 2026-10-05 and receive no further fixes, releases or security updates**; every plugin upgrade continues here, and the corridor is chosen by the version the target repository declares for itself, so no version-locked package per host hop is needed. Same-name repositories under other accounts are not affiliated.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![DSH Market](https://raw.githubusercontent.com/2BingLing/dsh-market/master/assets/readme/badge-listed-en.svg)](https://dsh.market/)
[![Node](https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-brightgreen.svg)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/PerryLink/dsh-plugin-upgrade/ci.yml?branch=main&label=CI)](https://github.com/PerryLink/dsh-plugin-upgrade/actions)
[![Version](https://img.shields.io/github/v/tag/PerryLink/dsh-plugin-upgrade?label=version)](https://github.com/PerryLink/dsh-plugin-upgrade/releases)
[![npm version](https://img.shields.io/npm/v/dsh-plugin-upgrade)](https://www.npmjs.com/package/dsh-plugin-upgrade)
[![npm downloads](https://img.shields.io/npm/dm/dsh-plugin-upgrade)](https://www.npmjs.com/package/dsh-plugin-upgrade)

[English](README.md) · [简体中文](README-zh.md) · [Español](README-es.md) · [Português](README-pt.md) · [हिन्दी](README-hi.md)

```sh
dsh plugin --profile <name> add dsh-plugin-upgrade
```


</div>

---

**📖 Ecosystem knowledge base** — measured data, not marketing: [plugin development guide · plugin-selection data · maintenance criteria](https://perrylink.github.io/dsh-plugin-guide/).

<!-- star-cta -->
## Install & uninstall

```sh
dsh plugin --profile web add dsh-plugin-upgrade            # from npm
dsh plugin --profile web add github:PerryLink/dsh-plugin-upgrade   # from source
dsh plugin --profile web remove dsh-plugin-upgrade         # uninstall (reversible)
```

Installing the bundle only registers a skill; removing the row removes the skill. The CLI is a normal `npx` target and needs no profile at all.

## ⭐ 如果它帮到了你

这个插件是 [DSH 插件家族](https://github.com/PerryLink)的一员（95 个，全部 Apache-2.0）。如果你在用，**给个 star** —— 它不会解锁任何功能，但会让下一个人在搜索里更容易找到它。

*English:* part of a 95 plugin family for DeepSeek Harness. If it is useful, **a star helps the next person find it** — nothing is gated behind it.


## What is dsh-plugin-upgrade?

Plugin upgrade skill for DeepSeek Harness — one package, one corridor index, two closed corridors: `0.1.3-alpha.1` → `0.1.5-rc.1` (`legAB`) and `0.1.5-rc.2` → `0.1.6-alpha.2` (`legC`).

The scanner routes itself: it reads the target repository's declared dsh band (or takes `--span`), then applies that corridor's own evidence-bound catalog — `legAB`'s 20 seams (leg A `0.1.3-alpha.1` → `0.1.5-alpha.1` plus leg B `0.1.5-alpha.1` → `0.1.5-rc.1`) or `legC`'s 5 seams (`E1`–`E5`). One entry point, so a client half that stopped mounting silently is never mistaken for "typecheck is green".

![Terminal demo of dsh-plugin-upgrade: dsh-plugin-upgrade — corridor scan of a sibling plugin repo](https://raw.githubusercontent.com/PerryLink/dsh-plugin-upgrade/main/docs/assets/dsh-plugin-upgrade-hero.png)

![Animated terminal demo of dsh-plugin-upgrade](https://raw.githubusercontent.com/PerryLink/dsh-plugin-upgrade/main/docs/assets/dsh-plugin-upgrade-demo.gif)

*The same run, animated.*

## Comparison

![Measured comparison chart for dsh-plugin-upgrade](https://raw.githubusercontent.com/PerryLink/dsh-plugin-upgrade/main/docs/assets/dsh-plugin-upgrade-evidence.png)

40 family repos swept · README §What you get (leg A, 2026-09-09)

## Compatibility

| Surface | Status |
|---|---|
| Harness | DeepSeek Harness `dsh-v0.2.1-alpha.1` (current line; dev/test pins `0.2.1-alpha.1`). The corridor index is evidence-bound to the spans it measured: `legAB` = `0.1.3-alpha.1 → 0.1.5-rc.1` (tag `dsh-v0.1.7-alpha.2` = `183f08e9c6dd`; leg A→B handoff `dsh-v0.1.7-alpha.2` = `5dda764ed3aa`) and `legC` = `0.1.5-rc.2 → 0.1.6-alpha.2` (tag `dsh-v0.1.7-alpha.2`). Peer band `@deepseek-ai/dsh-skill >=0.1.6-0 <0.2.0 \|\| >=0.2.0-0 <0.3.0 \|\| >=0.2.1-0 <0.3.0`, `@deepseek-ai/cordis ^4.0.5-alpha.1`, `@deepseek-ai/schemastery ^3.18.5-alpha.1`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Platforms | Anywhere Node runs; the scanner is filesystem-only and platform-neutral |
| Model | Text-only models fully supported; the skill is a Markdown body, no tool or vision requirement |
| Corridor index | One package, one entry point. `lib/route.mjs` holds the closed corridors and the CLI routes to the matching one from the target repo's declared band (`engines.dsh`, the `@deepseek-ai/dsh*` ranges); `--span legAB\|legC` overrides the guess and an undeclared band falls back to the older corridor. The two catalogs are never merged: each corridor keeps its own seam array, card, evidence, fixtures and parity gate. |
| Scope | **Two closed corridors**: `legAB` = `0.1.3-alpha.1` → `0.1.5-rc.1` (leg A + leg B), `legC` = `0.1.5-rc.2` → `0.1.6-alpha.2`. A corridor never widens: a hop that adds a seam is a new corridor — a new card and a new index row, not a new package. |
| Legs | Every leg lives in this package: leg A keeps the `S1`–`S10` + `M1` seams, leg B keeps `C1`, `C2`, `C4`, `C5`, `H1`–`H4`, `P1`, and leg C keeps `E1`–`E5` — each with its own evidence, card section, fixtures and rollback path. There is no sibling package to install. |
| `C3` | Retired: leg B's card spelled the stale-type-line false green `C3`, which is the same defect as leg A's `M1`. The fold is recorded on the card; `--seams C3` matches nothing. |
| Sibling | Do not mount the retired `dsh-plugin-upgrade` in the same profile: both register the agent skill `plugin-upgrade`, so the second mount collides on the skill name. That package is deprecated on npm and its repository is retired; this package replaces both of its legs. |

## What you get

Two halves, one seam catalog per corridor:

- **A bundled agent skill (`plugin-upgrade`)** — the corridor cards and a fix-and-verify loop. The body first routes the caller to the corridor that matches its peer band; the model loads it only when a task actually needs it, and the package contributes no system-prompt paragraph and no tool.
- **A zero-dependency CLI (`dsh-plugin-upgrade-scan`)** — resolves the corridor and reports `file:line` facts for that corridor's seams: `legAB`'s twenty (`S3`, `S8`, `S9`, `M1`, `S4`, `S5`, `S6`, `S7`, `S2`, `S1`, `S10`, `C1`, `C2`, `P1`, `C4`, `C5`, `H1`, `H2`, `H4`, `H3`) re-read from the harness tag ranges on 2026-09-09 (leg A) and 2026-09-10 (leg B), or `legC`'s five (`E1`–`E5`) measured on `dsh-v0.1.7-alpha.1` (2026-09-19). Exit `1` on any error-severity hit, so it drops straight into CI.

The point is the failure mode this corridor exists to kill: **this span's breakage is mostly silent, from both ends.** The type line can be stale, so the repo compiles against the **old** catalog (seam `M1`), and the bare `conversation` client slot was deleted with no alias while `ctx.slots.inject()` only runs its callback when the declaration exists — so a client half that still targets it stops mounting with no error, no log line and no failed build (seam `C1`). Three classes of breakage survive `typecheck` + `test`:

1. the local gate compiles a stale type line — old `paths` alias, or dev/test types pinned at `0.1.5-alpha.*` (seam `M1`);
2. a log writer omits the V3 required `stream` field, so the session imports and then refuses to resume (seam `S3`);
3. the tests are mocked against the old shape, so they pass while the host drops the contribution (seam `C1`).

Honest sizing: leg B's workspace sweep found that the family's client halves use only **8** slot keys, all of which survive in rc.1 — for them the rc.1 breakage is **latent, not actual**. Third-party client plugins that targeted the bare `conversation` key are the ones that break, and they break quietly. Leg A's sweep found the opposite texture: 40 repos, 11 of them hit `M1`, and fixing the stale path exposed real TypeScript errors in 3 repos that were previously "green".

## Quick start

```sh
dsh plugin --profile web add github:PerryLink/dsh-plugin-upgrade
```

```sh
# 1. install the bundle into your profile
dsh plugin --profile web add dsh-plugin-upgrade

# 2. verify the row mounted
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade'

# 3. scan the plugin you are upgrading
npx dsh-plugin-upgrade-scan --repo ../my-plugin
```

Then ask the agent to use the `plugin-upgrade` skill, or drive the loop yourself with the card that matches your band: `skills/plugin-upgrade/references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md` (`legAB` — leg A is §1, leg B is §2, the merged seam index is §3) or `skills/plugin-upgrade/references/v0.1.5-rc.2-to-v0.1.6-alpha.2.md` (`legC`). The scanner picks the corridor for you; add `--span legC` when the declared band is ambiguous.

## Configuration

Every key is optional and lives in the profile patch:

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Register the packaged skill. Set `false` to keep the dependency mounted but silent. |
| `skillName` | `plugin-upgrade` | Directory under `skillsRoot` to register, and the name shown in the catalog. |
| `skillsRoot` | the package's own `./skills` | Where `<skillName>/SKILL.md` lives. Point it at your own card to reuse the plumbing. |
| `userInvocable` | `true` | Whether a human can invoke the skill by name in addition to the model. |

```yaml
- insert:
    - id: dsh-plugin-upgrade
      name: dsh-plugin-upgrade
      config:
        skillName: plugin-upgrade
```

The plugin mounts loud: a missing `SKILL.md`, an empty body, or a frontmatter without `name` fails the mount instead of registering an empty skill.

## Surfaces

**Skill** — `plugin-upgrade` (model- and user-invocable by default). Body: leg routing table, the 8 hard rules and the 6-step loop. References: the merged corridor card. Scripts: the detector, shipped inside the skill directory so relative paths resolve.

**CLI** — `dsh-plugin-upgrade-scan`:

```sh
dsh-plugin-upgrade-scan [--repo <path>] [--span legAB|legC|<span>] [--json <out.json>] [--seams S3,C1,P1] [--quiet]
```

| Flag | Meaning |
|---|---|
| `--repo <path>` | Repository to scan (default: cwd). Its declared dsh band chooses the corridor. |
| `--span legAB\|legC\|<span>` | Force a corridor instead of guessing from the declared band. An unknown band falls back to `legAB`. |
| `--json <out.json>` | Also write the machine-readable report (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams S3,C1,P1` | Restrict to specific seams of the resolved corridor's catalog (ids are never shared between corridors). |
| `--quiet` | Suppress the human rendering (pair with `--json`). |

Exit codes: `0` no error-severity hit · `1` at least one error-severity hit · `2` usage or scan failure. A clean scan is necessary but not sufficient — the exit criterion is a real-host smoke, plus a resume round-trip for log writers (leg A) and a real browser assertion for the client half (leg B).

## The twenty `legAB` seams

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

## The five `legC` seams (`0.1.5-rc.2` → `0.1.6-alpha.2`)

Order follows the catalog in `lib/scan-0.1.6.mjs`, which is also the order `test/card.test.mjs` pins the `legC` card to. Every seam here is `error` and every one is detected (`CARD_ONLY = []`).

| Id | Severity | What changed on the way to `0.1.6-alpha.2` |
|---|---|---|
| `E1` | error | `agent/created` listeners are dispatched serially: a listener that throws — or that does slow work — blocks agent creation outright. Wrap synchronous work in `try`/`catch` and defer the rest with `queueMicrotask`/`setImmediate` or your own queue. |
| `E2` | error | An async `apply()` whose first `await` precedes its registrations: anything registered afterwards lands in the unload window and throws `INACTIVE_EFFECT`, while the old closure keeps running. Register everything before the first `await`, inside one `ctx.effect()`. |
| `E3` | error | Deleted slot/state keys: `settings.plugin.item` became the keyed→list `plugins.item`, and `SessionListState.current` is gone — a settings card disappears **silently** (`spec === undefined` early return), and `current` casts keep compiling while the feature is dead. |
| `E4` | error | Deleted client API: `sessions.open` / `openSubagent` / `clear` became `retain` / `using` / `retainInfo`. |
| `E5` | error | Deleted model literals: `deepseek-v4-flash*` and `deepseek-v4-vision-exp`. The default model catalog shrank from 4 to 2, and an uncatalogued id passes through as text-only. |

The same discipline applies as for `legAB`: a clean scan is necessary, not sufficient. `legC` breakage is silent or runtime-only (the published type line hides the deletions), so the exit criterion stays a real-host smoke on a temp `DSH_HOME`, plus the log-writer round-trip and the real-browser assertion where they apply.

## What this does not cover

- **A hop past every corridor here.** `legAB` ends at `0.1.5-rc.1` by construction: the harness hop `0.1.5-rc.1` → `0.1.5-rc.2` added no plugin-facing seam (this package's own dev/test pin now runs on the `0.1.7-rc.2` line, so the catalog is verified against those published types; the compat workflow's probe still anchors `0.1.6-alpha.2`), and `legC` covers `0.1.5-rc.2` → `0.1.6-alpha.2`. A later hop that adds a seam is **not** covered: a corridor is closed, and widening a card is worse than adding one. It gets a new card and a new index row — not a new package.
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

The scanner has a synthetic fixture pair **per `legAB` leg**: `fixtures/leg-a-bad-repo` (leg A's session/config seams, every error seam present on purpose) with `fixtures/leg-a-good-repo` (adapted), and `fixtures/bad-repo` (leg B's client-slot seams) with `fixtures/good-repo` (adapted) — plus a live negative on a family repository already pinned to `0.1.5-rc.1`, so a regression in the catalog fails the suite rather than a downstream user. `test/card.test.mjs` asserts that each card's index and its own catalog (`lib/scan.mjs` for `legAB`, `lib/scan-0.1.6.mjs` for `legC`) name **exactly** the same seam ids with the same severities, that `legAB`'s `CARD_ONLY` is exactly `['H3']` while `legC`'s is empty, and that the two catalogs share no seam id — the evidence-binding rule as a machine gate, per corridor.

## Topics

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (mirror `package.json` keywords; `dsh-plugin` is the ecosystem's visibility channel).

## PerryLink DSH Plugin Family

This project is one of the **87 actively maintained** DeepSeek Harness plugins from [PerryLink](https://github.com/PerryLink). The family roster is **95** plugins in total — **5 frozen**, **3 retired** — and stays collapsed below so every README keeps a short first screen. Expand it to see every row, with the reason in the Status column.

<details>
<summary>Expand all 95 plugins</summary>

| Plugin | One-liner | Status |
|---|---|---|
| **[dsh-aqua-input-check](https://github.com/PerryLink/dsh-aqua-input-check)** | 水产养殖投入品记录核对（按投入品用量、休药期与起捕间隔核对记录自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-archive-check](https://github.com/PerryLink/dsh-archive-check)** | 档案归档完整性与保管期限核对（依据《档案法》及配套规定，仅提示差异，不作出定性结论） |  |
| **[dsh-auto-review](https://github.com/PerryLink/dsh-auto-review)** | Second-model auto-review on the approval chain, fail-closed by default |  |
| **[dsh-autotier](https://github.com/PerryLink/dsh-autotier)** | Automatic strong/cheap model-tier routing with deterministic risk guards and a `/tier` command |  |
| **[dsh-background-agents](https://github.com/PerryLink/dsh-background-agents)** | Durable background child agents with a Web UI sidebar, messaging and interrupt | 🚫 RETIRED — see the repo README |
| **[dsh-bid-ca-precheck](https://github.com/PerryLink/dsh-bid-ca-precheck)** | 投标文件符合性预检（按招标文件逐条核对响应情况，仅提示差异，不作出定性结论） |  |
| **[dsh-bid-qual-check](https://github.com/PerryLink/dsh-bid-qual-check)** | 投标人资格条件核对（按资格条件与证明材料核对逐条响应，仅提示差异，不作出定性结论） |  |
| **[dsh-budget](https://github.com/PerryLink/dsh-budget)** | Cost governance for DeepSeek Harness: budgets, carbon, and latency in one panel. | 🧊 FROZEN — see the repo README |
| **[dsh-cert-mcp](https://github.com/PerryLink/dsh-cert-mcp)** | Read-only MCP server exposing the certification registry: grades, snapshots and five-dimension evidence |  |
| **[dsh-checkpoint-rewind](https://github.com/PerryLink/dsh-checkpoint-rewind)** | Claude Code /rewind-equivalent: snapshots, session forks, one-shot restore |  |
| **[dsh-claude-move](https://github.com/PerryLink/dsh-claude-move)** | Migrate Claude Code sessions, memory, skills and CLAUDE.md into DSH | 🧊 FROZEN — see the repo README |
| **[dsh-click](https://github.com/PerryLink/dsh-click)** | Cross-platform native desktop control for DeepSeek Harness — Windows first. |  |
| **[dsh-composer-history](https://github.com/PerryLink/dsh-composer-history)** | Terminal-style input history for the web composer: arrows, Ctrl+R search |  |
| **[dsh-contract-stance](https://github.com/PerryLink/dsh-contract-stance)** | 合同条款立场台账核对（按立场、风险等级与退让底线核对台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-customs-doc-check](https://github.com/PerryLink/dsh-customs-doc-check)** | 报关单证一致性核对（按公开的报关单填制规范核对单证间字段一致性，仅提示差异，不作出定性结论） |  |
| **[dsh-data-quality](https://github.com/PerryLink/dsh-data-quality)** | Dataset quality checks and citation cross-checks (the optional numeric bridge consumed here) |  |
| **[dsh-defend](https://github.com/PerryLink/dsh-defend)** | Prompt-injection, jailbreak, and secret-leak defense for DeepSeek Harness. | 🧊 FROZEN — see the repo README |
| **[dsh-demurrage-ledger](https://github.com/PerryLink/dsh-demurrage-ledger)** | 滞箱费台账核对（按免箱期与费率核对超期天数与金额的自洽性，仅提示差异，不作出定性结论） |  |
| **[dsh-doublecheck](https://github.com/PerryLink/dsh-doublecheck)** | Engineering-discipline guard: requirements grill, test gates, adversary review |  |
| **[dsh-draw](https://github.com/PerryLink/dsh-draw)** | Unified static-image generation routing for DeepSeek Harness. | 🧊 FROZEN — see the repo README |
| **[dsh-drill-script-check](https://github.com/PerryLink/dsh-drill-script-check)** | 应急演练脚本核对（按阶段、响应分级、指挥与资源要素核对脚本齐备，仅提示差异，不作出定性结论） |  |
| **[dsh-eia-guide-check](https://github.com/PerryLink/dsh-eia-guide-check)** | 环评导则适用性核对（按要素、导则名称与执行标准核对台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-emergency-plan](https://github.com/PerryLink/dsh-emergency-plan)** | 应急预案要素齐备性与条款级页码定位（依据 GB/T 29639-2020 等公开文件，仅提示差异，不作出定性结论） |  |
| **[dsh-essay-rubric-check](https://github.com/PerryLink/dsh-essay-rubric-check)** | 作文量表评分核对（按评分项、原文定位与分值算术核对评分自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-evidence-check](https://github.com/PerryLink/dsh-evidence-check)** | 证据清单齐备性核对（按待证事实与证据要素核对清单自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-export-ctl-check](https://github.com/PerryLink/dsh-export-ctl-check)** | 出口管制物项核对（按管制清单、最终用途与许可证核对台账齐备，仅提示差异，不作出定性结论） |  |
| **[dsh-fast](https://github.com/PerryLink/dsh-fast)** | Read-only performance diagnostics for DeepSeek Harness. |  |
| **[dsh-fmea-table-check](https://github.com/PerryLink/dsh-fmea-table-check)** | FMEA 分析表要素齐备性与风险顺序数一致性核对（按公开的 FMEA 方法标准核对表内自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-forecast-penalty](https://github.com/PerryLink/dsh-forecast-penalty)** | 预测准确率考核核对（按准确率、门槛与考核单价核对考核费用的算术自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-fund-research](https://github.com/PerryLink/dsh-fund-research)** | Deterministic research reports for Chinese public mutual funds |  |
| **[dsh-github](https://github.com/PerryLink/dsh-github)** | GitHub PR/issues integration for DSH, every write gated by approval |  |
| **[dsh-gongwen-flow-check](https://github.com/PerryLink/dsh-gongwen-flow-check)** | 公文流转与办理时限核对（按公开的公文处理规范核对环节完整性与时限，仅提示差异，不作出定性结论） |  |
| **[dsh-gongwen-word-check](https://github.com/PerryLink/dsh-gongwen-word-check)** | 公文格式要素核对（按公开的党政机关公文格式标准核对版头与主体要素，仅提示差异，不作出定性结论） |  |
| **[dsh-guard-plan-qc](https://github.com/PerryLink/dsh-guard-plan-qc)** | 劳动保护与安全防护用品配置表核对（按公开的配备标准核对品名规格与配置数量，仅提示差异，不作出定性结论） |  |
| **[dsh-hazchem-check](https://github.com/PerryLink/dsh-hazchem-check)** | 危险化学品临界量与重大危险源辨识核对（按储存量与临界量核对台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-hazplan-check](https://github.com/PerryLink/dsh-hazplan-check)** | HAZOP 分析表要素齐备性与偏差推导一致性核对（依据公开的危险与可操作性分析标准，仅提示差异，不作出定性结论） |  |
| **[dsh-hidden-risk-map](https://github.com/PerryLink/dsh-hidden-risk-map)** | 安全隐患台账→《工贸企业重大事故隐患判定标准》（应急管理部令第10号）条款映射提示（仅提示差异，不作出定性结论） |  |
| **[dsh-hs-classify](https://github.com/PerryLink/dsh-hs-classify)** | 商品归类层级一致性核对（按章、品目、子目与商品编号的层级关系核对自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-icd-rule-check](https://github.com/PerryLink/dsh-icd-rule-check)** | ICD 合并编码与星剑号配对提示（依据 GB/T 14396-2016 与公开的 ICD 使用说明，仅提示差异，不作出定性结论） |  |
| **[dsh-industry-research](https://github.com/PerryLink/dsh-industry-research)** | Industry research orchestration that seals its deliverables through this plugin's `ctx.researchReport.assemble` |  |
| **[dsh-lawcite-adapter](https://github.com/PerryLink/dsh-lawcite-adapter)** | 法条引用与文书要素核对（按名称、条号、原文与效力状态核对引用可核验性，仅提示差异，不作出定性结论） |  |
| **[dsh-laya](https://github.com/PerryLink/dsh-laya)** | Laya typed decisions (`noul`/`choice`/`score`) as a first-class Cordis service and model-visible tools |  |
| **[dsh-lc-doc-check](https://github.com/PerryLink/dsh-lc-doc-check)** | 信用证单据条款核对（按单据种类、份数、期限与不符点核对交单自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-learning-gap-check](https://github.com/PerryLink/dsh-learning-gap-check)** | 能力差距与培养计划核对（按能力等级差、培养措施与完成期限核对台账闭环，仅提示差异，不作出定性结论） |  |
| **[dsh-library](https://github.com/PerryLink/dsh-library)** | Local document knowledge base for DeepSeek Harness. |  |
| **[dsh-local-ai](https://github.com/PerryLink/dsh-local-ai)** | Local-model (Ollama) integration for DeepSeek Harness. |  |
| **[dsh-lsp-actions](https://github.com/PerryLink/dsh-lsp-actions)** | LSP diagnostics, formatting, completion, code actions and rename over language servers |  |
| **[dsh-mask](https://github.com/PerryLink/dsh-mask)** | PII masking middleware: anonymize at the model boundary, restore at the display layer |  |
| **[dsh-mcp-panel](https://github.com/PerryLink/dsh-mcp-panel)** | Read-only MCP runtime panel: /mcp command + Settings tab with status, tools and errors |  |
| **[dsh-medrec-qc](https://github.com/PerryLink/dsh-medrec-qc)** | 病案首页形式质控与逻辑矛盾提示（依据国卫办医发〔2016〕24号等公开文件，仅提示差异，不作出定性结论） |  |
| **[dsh-memento](https://github.com/PerryLink/dsh-memento)** | Approval-gated cross-session memory: ctx.memory seam + SQLite + memory tool |  |
| **[dsh-nsfc-form-check](https://github.com/PerryLink/dsh-nsfc-form-check)** | 国家自然科学基金申请书形式审查与匿名化提示（依据《国家自然科学基金条例》与申请人导入的当年指南，仅提示差异，不作出定性结论） |  |
| **[dsh-nurse-record-check](https://github.com/PerryLink/dsh-nurse-record-check)** | 护理记录时限、签名与评估表完整性校验（依据《病历书写基本规范》等公开文件，仅提示差异，不作出定性结论） |  |
| **[dsh-observe](https://github.com/PerryLink/dsh-observe)** | OpenTelemetry and Langfuse observability exporter for DeepSeek Harness. |  |
| **[dsh-origin-rvc-check](https://github.com/PerryLink/dsh-origin-rvc-check)** | 原产地区域价值成分核对（按 RVC 定义式与门槛核对原产地判定自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-ota-review-check](https://github.com/PerryLink/dsh-ota-review-check)** | 在线点评回复台账核对（按回复时限、问题分类与整改状态核对台账闭环，仅提示差异，不作出定性结论） |  |
| **[dsh-output-styles](https://github.com/PerryLink/dsh-output-styles)** | Claude Code outputStyles-equivalent runtime style switching |  |
| **[dsh-paper-doc-adapter](https://github.com/PerryLink/dsh-paper-doc-adapter)** | 试卷解析结构核对（按题型、答案、分值与 yotta 标识核对试卷结构自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-permission-rules](https://github.com/PerryLink/dsh-permission-rules)** | Claude Code-style declarative allow/deny/ask permission rules with audit |  |
| **[dsh-permit-report-check](https://github.com/PerryLink/dsh-permit-report-check)** | 行政许可办理核对（按申请材料、法定时限与决定记录核对台账闭环，仅提示差异，不作出定性结论） |  |
| **[dsh-pipeline-check](https://github.com/PerryLink/dsh-pipeline-check)** | 项目全流程文件链条核对（按环节先后与金额口径核对链条自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-pleading-draft](https://github.com/PerryLink/dsh-pleading-draft)** | 起诉状要素齐备性核对（按诉请、事实、证据、法条四要素核对文书齐备，仅提示差异，不作出定性结论） |  |
| **[dsh-plugin-doctor](https://github.com/PerryLink/dsh-plugin-doctor)** | Zero-dependency static + sandbox smoke detector for DSH plugins |  |
| **[dsh-plugin-guide](https://github.com/PerryLink/dsh-plugin-guide)** | Plugin-development knowledge base as an on-demand agent skill |  |
| **[dsh-plugin-kit](https://github.com/PerryLink/dsh-plugin-kit)** | Shared zero-runtime-dependency toolkit for the PerryLink DSH plugins |  |
| **[dsh-plugin-upgrade](https://github.com/PerryLink/dsh-plugin-upgrade)** | One-package, one-corridor-index plugin upgrade skill: routes a repository to the matching closed corridor card |  |
| **[dsh-policy-brief-draft](https://github.com/PerryLink/dsh-policy-brief-draft)** | 政策专报要素核对（按观点、依据、出处与建议核对专报齐备，仅提示差异，不作出定性结论） |  |
| **[dsh-power-loss-split](https://github.com/PerryLink/dsh-power-loss-split)** | 线损电量拆分与考核表核对（依据公开的线损计算口径，仅提示差异，不作出定性结论） |  |
| **[dsh-power-ticket-check](https://github.com/PerryLink/dsh-power-ticket-check)** | 电力工作票要素齐备性与签发许可顺序核对（依据现行电力安全工作规程，仅提示差异，不作出定性结论） |  |
| **[dsh-ppap-check](https://github.com/PerryLink/dsh-ppap-check)** | PPAP 提交要素齐备性核对（按公开的 PPAP 手册与提交等级核对要素齐备与版本填写，仅提示差异，不作出定性结论） |  |
| **[dsh-protest-deadline](https://github.com/PerryLink/dsh-protest-deadline)** | 质疑与投诉期限核对（按公开的政府采购质疑投诉规定核对期限与台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-railway-window](https://github.com/PerryLink/dsh-railway-window)** | 铁路施工天窗台账核对（按时间窗、时长算术与命令号核对台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-reach](https://github.com/PerryLink/dsh-reach)** | Multi-channel approval/question bridge: WeChat/Telegram/Feishu, session console | 🧊 FROZEN — see the repo README |
| **[dsh-repair-order-qc](https://github.com/PerryLink/dsh-repair-order-qc)** | 维修工单结算核对（按项目金额、配件工时合计与结算总额核对算术自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-research-report](https://github.com/PerryLink/dsh-research-report)** | Verifiable research-report engine: content-addressed evidence ledger and sealed versions |  |
| **[dsh-review-reply-check](https://github.com/PerryLink/dsh-review-reply-check)** | 审稿意见逐条回应覆盖核对（按意见与回应一一对应核对覆盖完整性，仅提示差异，不作出定性结论） |  |
| **[dsh-rulefile-check](https://github.com/PerryLink/dsh-rulefile-check)** | 规则库文件自检核对（按条款引用纪律与效力上限核对规则库自身合规，仅提示差异，不作出定性结论） |  |
| **[dsh-safety-brief-check](https://github.com/PerryLink/dsh-safety-brief-check)** | 安全技术交底记录要素齐备性与签字闭环核对（依据公开的安全生产法规与检查标准，仅提示差异，不作出定性结论） |  |
| **[dsh-score](https://github.com/PerryLink/dsh-score)** | Multi-dimensional quality scoring for DeepSeek Harness plugins. |  |
| **[dsh-session-pin](https://github.com/PerryLink/dsh-session-pin)** | Pin sessions in the Web sidebar with durable ordering | 🚫 RETIRED — see the repo README |
| **[dsh-session-sync](https://github.com/PerryLink/dsh-session-sync)** | Cross-device session sync for DeepSeek Harness — a dedicated git mirror of your session store. |  |
| **[dsh-site-log-check](https://github.com/PerryLink/dsh-site-log-check)** | 监理日志跨日连续性与旁站覆盖提示（依据 GB/T 50319-2013 等公开文件，仅提示差异，不作出定性结论） |  |
| **[dsh-skill-pack-security](https://github.com/PerryLink/dsh-skill-pack-security)** | Security-audit skill pack: secret scan, dependency and supply-chain review |  |
| **[dsh-soe-decision-check](https://github.com/PerryLink/dsh-soe-decision-check)** | 三重一大决策台账核对（按前置研究、会议审议与决议记录核对程序留痕，仅提示差异，不作出定性结论） |  |
| **[dsh-soilwater-check](https://github.com/PerryLink/dsh-soilwater-check)** | 土壤与地下水监测台账核对（按点位、监测项目、限值与超标判定核对台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-sop-sync-check](https://github.com/PerryLink/dsh-sop-sync-check)** | 作业规程与 FMEA／控制计划一致性核对（按编号与版本核对三份文件是否同步，仅提示差异，不作出定性结论） |  |
| **[dsh-spc-gbt-adapter](https://github.com/PerryLink/dsh-spc-gbt-adapter)** | 控制图常数与过程能力指数核对（按 GB/T 4091 的常规控制图常数表核对控制限与 Cp/Cpk 的自洽性，仅提示差异，不作出定性结论） |  |
| **[dsh-talk](https://github.com/PerryLink/dsh-talk)** | Voice-first session loop for DeepSeek Harness: talk to it, hear it answer. |  |
| **[dsh-team-rooms](https://github.com/PerryLink/dsh-team-rooms)** | Cross-session team rooms: shared message bus, task board and timeline | 🚫 RETIRED — see the repo README |
| **[dsh-tender-extract](https://github.com/PerryLink/dsh-tender-extract)** | 招标文件条款摘录核对（按出处与原文逐字核对摘录完整性，仅提示差异，不作出定性结论） |  |
| **[dsh-tender-matrix](https://github.com/PerryLink/dsh-tender-matrix)** | 评标因素评分矩阵核对（按分值上限与合计核对矩阵自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-test-drive](https://github.com/PerryLink/dsh-test-drive)** | Isolated install-and-smoke test drives for DeepSeek Harness plugins. |  |
| **[dsh-ticktick](https://github.com/PerryLink/dsh-ticktick)** | TickTick/Dida365 task bridge: session-header panel + 11 tools |  |
| **[dsh-translate](https://github.com/PerryLink/dsh-translate)** | Vendor parameter translation and deterministic JSON repair for DeepSeek Harness. |  |
| **[dsh-warranty-calc](https://github.com/PerryLink/dsh-warranty-calc)** | 质保期与索赔金额核对（按质保期月数与里程、索赔金额算式核对自洽，仅提示差异，不作出定性结论） |  |

</details>

</details>

</details>## License

Apache-2.0 — see [LICENSE](LICENSE). Install-time dependencies and their licenses are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); nothing is bundled.
