<div align="center">

# ⬆️ dsh-plugin-upgrade
- **1024 store channel**: `npm i -g dsh1024` once, then `dsh1024 plugin --profile web add dsh-plugin-upgrade` (counts toward the [deepseek1024.com](https://deepseek1024.com) install ranking).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/PerryLink/dsh-plugin-upgrade/badge)](https://api.securityscorecards.dev/projects/github.com/PerryLink/dsh-plugin-upgrade)

**Plugin upgrade skill for DeepSeek Harness — one package, one corridor index, two closed corridors: `0.1.3-alpha.1` → `0.1.5-rc.1` (`legAB`) and `0.1.5-rc.2` → `0.1.6-alpha.2` (`legC`).**

*The scanner routes itself: it reads the target repository's declared dsh band (or takes `--span`), then applies that corridor's own evidence-bound catalog — `legAB`'s 20 seams (leg A `0.1.3-alpha.1` → `0.1.5-alpha.1` plus leg B `0.1.5-alpha.1` → `0.1.5-rc.1`) or `legC`'s 5 seams (`E1`–`E5`). One entry point, so a client half that stopped mounting silently is never mistaken for "typecheck is green".*

> **Official repository.** This is the only official repository of dsh-plugin-upgrade, maintained by PerryLink. It supersedes the retired version-locked packages `dsh-plugin-upgrade` (leg A) and `dsh-plugin-upgrade-rc1` (leg B), and it is the package the `0.1.5-rc.2` → `0.1.6-alpha.2` corridor (leg C) was folded into — the `dsh-plugin-upgrade-016` name never reached the registry. Same-name repositories under other accounts are not affiliated.

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

</div>

---

## Compatibility

| Surface | Status |
|---|---|
| Harness | DeepSeek Harness `0.1.5-rc.1` (tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`; leg A→B handoff `dsh-v0.1.5-alpha.1` = `5dda764ed3aa`; corridor start `0.1.3-alpha.1`) and, for `legC`, DeepSeek Harness `0.1.6-alpha.2` (tag `dsh-v0.1.6-alpha.2`). Peer band `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0 \|\| >=0.1.6-0 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`. |
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
- **A zero-dependency CLI (`dsh-plugin-upgrade-scan`)** — resolves the corridor and reports `file:line` facts for that corridor's seams: `legAB`'s twenty (`S3`, `S8`, `S9`, `M1`, `S4`, `S5`, `S6`, `S7`, `S2`, `S1`, `S10`, `C1`, `C2`, `P1`, `C4`, `C5`, `H1`, `H2`, `H4`, `H3`) re-read from the harness tag ranges on 2026-09-09 (leg A) and 2026-09-10 (leg B), or `legC`'s five (`E1`–`E5`) measured on `dsh-v0.1.6-alpha.2` (2026-09-19). Exit `1` on any error-severity hit, so it drops straight into CI.

The point is the failure mode this corridor exists to kill: **this span's breakage is mostly silent, from both ends.** The type line can be stale, so the repo compiles against the **old** catalog (seam `M1`), and the bare `conversation` client slot was deleted with no alias while `ctx.slots.inject()` only runs its callback when the declaration exists — so a client half that still targets it stops mounting with no error, no log line and no failed build (seam `C1`). Three classes of breakage survive `typecheck` + `test`:

1. the local gate compiles a stale type line — old `paths` alias, or dev/test types pinned at `0.1.5-alpha.*` (seam `M1`);
2. a log writer omits the V3 required `stream` field, so the session imports and then refuses to resume (seam `S3`);
3. the tests are mocked against the old shape, so they pass while the host drops the contribution (seam `C1`).

Honest sizing: leg B's workspace sweep found that the family's client halves use only **8** slot keys, all of which survive in rc.1 — for them the rc.1 breakage is **latent, not actual**. Third-party client plugins that targeted the bare `conversation` key are the ones that break, and they break quietly. Leg A's sweep found the opposite texture: 40 repos, 11 of them hit `M1`, and fixing the stale path exposed real TypeScript errors in 3 repos that were previously "green".

## Quick start

```sh
# 1. install the bundle into your profile
dsh plugin --profile web add dsh-plugin-upgrade

# 2. verify the row mounted
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade'

# 3. scan the plugin you are upgrading
npx dsh-plugin-upgrade-scan --repo ../my-plugin
```

Then ask the agent to use the `plugin-upgrade` skill, or drive the loop yourself with the card that matches your band: `skills/plugin-upgrade/references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md` (`legAB` — leg A is §1, leg B is §2, the merged seam index is §3) or `skills/plugin-upgrade/references/v0.1.5-rc.2-to-v0.1.6-alpha.2.md` (`legC`). The scanner picks the corridor for you; add `--span legC` when the declared band is ambiguous.

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

- **A hop past every corridor here.** `legAB` ends at `0.1.5-rc.1` by construction: the harness hop `0.1.5-rc.1` → `0.1.5-rc.2` added no plugin-facing seam (this package's own dev/test pin and CI probe run on the `0.1.5-rc.2` line, so the `legAB` catalog is verified against those published types), and `legC` covers `0.1.5-rc.2` → `0.1.6-alpha.2`. A later hop that adds a seam is **not** covered: a corridor is closed, and widening a card is worse than adding one. It gets a new card and a new index row — not a new package.
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

This project is one of the [42 DeepSeek Harness plugins](https://github.com/PerryLink) maintained by [PerryLink](https://github.com/PerryLink). If this one helps you, the others likely will too:

| Plugin | One-liner |
|---|---|
| **[dsh-auto-review](https://github.com/PerryLink/dsh-auto-review)** | Second-model auto-review on the approval chain, fail-closed by default | |
| **[dsh-autotier](https://github.com/PerryLink/dsh-autotier)** | Automatic strong/cheap model-tier routing with deterministic risk guards and a `/tier` command | |
| **[dsh-background-agents](https://github.com/PerryLink/dsh-background-agents)** | Durable background child agents with a Web UI sidebar, messaging and interrupt | |
| **[dsh-budget](https://github.com/PerryLink/dsh-budget)** | Cost governance for DeepSeek Harness: budgets, carbon, and latency in one panel. | |
| **[dsh-catalog](https://github.com/PerryLink/dsh-catalog)** | DSH Desktop Market standard catalog source for the PerryLink family | |
| **[dsh-cert-mcp](https://github.com/PerryLink/dsh-cert-mcp)** | Read-only MCP server exposing the certification registry: grades, snapshots and five-dimension evidence | |
| **[dsh-checkpoint-rewind](https://github.com/PerryLink/dsh-checkpoint-rewind)** | Unified session + workspace + config checkpoints with one-shot `/rewind` | |
| **[dsh-claude-move](https://github.com/PerryLink/dsh-claude-move)** | Migrate Claude Code, Codex, OpenCode and Hermes sessions, memories and skills into DSH | |
| **[dsh-click](https://github.com/PerryLink/dsh-click)** | Cross-platform native desktop control for DeepSeek Harness — Windows first. | |
| **[dsh-composer-history](https://github.com/PerryLink/dsh-composer-history)** | Terminal-style input history for the web composer: arrows, Ctrl+R search | |
| **[dsh-data-quality](https://github.com/PerryLink/dsh-data-quality)** | Deterministic dataset profiling, cleaning and citation verification | |
| **[dsh-defend](https://github.com/PerryLink/dsh-defend)** | Prompt-injection, jailbreak, and secret-leak defense for DeepSeek Harness. | |
| **[dsh-doublecheck](https://github.com/PerryLink/dsh-doublecheck)** | Engineering-discipline guard: requirements grill, test gates, adversary review | |
| **[dsh-draw](https://github.com/PerryLink/dsh-draw)** | Unified static-image generation routing for DeepSeek Harness. | |
| **[dsh-fast](https://github.com/PerryLink/dsh-fast)** | Read-only performance diagnostics: load, spill, compaction and cache hit rate | |
| **[dsh-fund-research](https://github.com/PerryLink/dsh-fund-research)** | Chinese mutual-fund research with sealed, traceable source snapshots | |
| **[dsh-github](https://github.com/PerryLink/dsh-github)** | GitHub PR/issue/CI integration with every write approval-gated | |
| **[dsh-industry-research](https://github.com/PerryLink/dsh-industry-research)** | Industry and company research pack: chain map, policy timeline, company cards | |
| **[dsh-kit](https://github.com/PerryLink/dsh-kit)** | One-command starter pack that installs the core family | |
| **[dsh-library](https://github.com/PerryLink/dsh-library)** | Local document knowledge base with hybrid search and citation-aware injection | |
| **[dsh-local-ai](https://github.com/PerryLink/dsh-local-ai)** | Local Ollama model discovery and task-based routing with cloud fallback | |
| **[dsh-lsp-actions](https://github.com/PerryLink/dsh-lsp-actions)** | LSP diagnostics, formatting, completion, code actions, symbols and rename | |
| **[dsh-mask](https://github.com/PerryLink/dsh-mask)** | PII masking at the model boundary with a host-side restore table | |
| **[dsh-mcp-panel](https://github.com/PerryLink/dsh-mcp-panel)** | MCP management console: `/mcp` command, Settings tab and trial calls | |
| **[dsh-memento](https://github.com/PerryLink/dsh-memento)** | Approval-gated cross-session memory protocol (`ctx.memory` + SQLite) | |
| **[dsh-observe](https://github.com/PerryLink/dsh-observe)** | OpenTelemetry and Langfuse telemetry export from the session event stream | |
| **[dsh-output-styles](https://github.com/PerryLink/dsh-output-styles)** | Runtime-switchable model output styles | |
| **[dsh-permission-rules](https://github.com/PerryLink/dsh-permission-rules)** | Declarative allow/deny/ask rules plus a process-level network policy | |
| **[dsh-plugin-certification](https://github.com/PerryLink/dsh-plugin-certification)** | Community certification registry with repro-checkable grades and badges | |
| **[dsh-plugin-doctor](https://github.com/PerryLink/dsh-plugin-doctor)** | Zero-dependency static + sandbox smoke detector for DSH plugins | |
| **[dsh-plugin-guide](https://github.com/PerryLink/dsh-plugin-guide)** | Plugin-dev knowledge base, agent skill and the `dsh-plugin-dev` CLI toolchain | |
| **[dsh-plugin-kit](https://github.com/PerryLink/dsh-plugin-kit)** | Shared zero-runtime-dependency toolkit for the PerryLink DSH plugins | |
| **[dsh-plugin-portal](https://github.com/PerryLink/dsh-plugin-portal)** | Zero-dependency static portal rendering the whole plugin family as one page | |
| **[dsh-reach](https://github.com/PerryLink/dsh-reach)** | Multi-channel approval/question bridge: WeChat, Telegram, Feishu + a session console | |
| **[dsh-research-report](https://github.com/PerryLink/dsh-research-report)** | Verifiable research reports: evidence ledger, manifest seal, per-claim verdicts | |
| **[dsh-score](https://github.com/PerryLink/dsh-score)** | Multi-dimensional plugin quality scoring with an evidence-backed leaderboard | |
| **[dsh-session-pin](https://github.com/PerryLink/dsh-session-pin)** | Pin sessions and workspaces in the Web sidebar with per-pin colors | |
| **[dsh-session-sync](https://github.com/PerryLink/dsh-session-sync)** | Git-backed cross-device session synchronization with keep-both merges | |
| **[dsh-skill-pack-security](https://github.com/PerryLink/dsh-skill-pack-security)** | Security-audit skill pack plus the `plugin_vet` supply-chain gate | |
| **[dsh-talk](https://github.com/PerryLink/dsh-talk)** | Voice-first session loop: speech-to-text input and text-to-speech replies | |
| **[dsh-team-rooms](https://github.com/PerryLink/dsh-team-rooms)** | Cross-session team rooms: shared message bus, task board and timeline | |
| **[dsh-test-drive](https://github.com/PerryLink/dsh-test-drive)** | Isolated install-and-smoke test drives with a pass/fail matrix | |
| **[dsh-ticktick](https://github.com/PerryLink/dsh-ticktick)** | TickTick/Dida365 task bridge: session-header panel plus eleven agent tools | |
| **[dsh-translate](https://github.com/PerryLink/dsh-translate)** | Vendor parameter translation and deterministic JSON repair | |
| **[dsh-laya](https://github.com/PerryLink/dsh-laya)** | Laya typed decisions (`noul`/`choice`/`score`) as a first-class Cordis service and model-visible tools | |

Part of the PerryLink DSH plugin family — 40+ repositories covering sessions, memory, permissions, delivery, observability and developer tooling. Browse the catalog at [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) or the [`dsh-plugin` topic](https://github.com/topics/dsh-plugin).

## License

Apache-2.0 — see [LICENSE](LICENSE). Install-time dependencies and their licenses are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); nothing is bundled.
