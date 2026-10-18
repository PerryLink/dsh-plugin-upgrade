<div align="center">

# ⬆️ dsh-plugin-upgrade
- **1024 商店通道**：先 `npm i -g dsh1024`，再执行 `dsh1024 plugin --profile web add dsh-plugin-upgrade`（计入 [deepseek1024.com](https://deepseek1024.com) 安装排行）。
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade)
[![dshfind](https://dshfind.com/api/badge/PerryLink/dsh-plugin-upgrade?metric=downloads&lang=zh)](https://dshfind.com/zh/plugins/PerryLink/dsh-plugin-upgrade?ref=badge)

**DeepSeek Harness 插件升级技能——一个包、一份走廊索引、两条闭合的走廊：`0.1.3-alpha.1` → `0.1.5-rc.1`（`legAB`）与 `0.1.5-rc.2` → `0.1.6-alpha.2`（`legC`）。**

*扫描器自行路由：它读取目标仓库声明的 dsh 区间（或接受 `--span`），然后套用那条走廊自己的、证据绑定的目录——`legAB` 的 20 条接缝（leg A `0.1.3-alpha.1` → `0.1.5-alpha.1` 加 leg B `0.1.5-alpha.1` → `0.1.5-rc.1`）或 `legC` 的 5 条接缝（`E1`–`E5`）。只有一个入口，因此「静默停止挂载的 client 半边」永远不会被误当成「typecheck 绿了」。*

> **官方仓库。** 这是 dsh-plugin-upgrade 唯一的官方仓库，由 PerryLink 维护。它取代两个已退役的版本锁定包 `dsh-plugin-upgrade`（leg A）与 `dsh-plugin-upgrade-rc1`（leg B），并且 `0.1.5-rc.2` → `0.1.6-alpha.2` 走廊（leg C）就是并入本包的——`dsh-plugin-upgrade-016` 这个名字从未上过 registry。其他账号下的同名仓库与本项目无关。 **`dsh-plugin-upgrade-015` 与 `dsh-plugin-upgrade-016` 均已于 2026-10-05 退役，不再接受修复、发版或安全更新**；所有插件升级一律在本包继续，走廊由目标仓库自己声明的版本决定，因此不再需要「每个宿主跳跃一个版本锁定包」。

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![DSH Market](https://raw.githubusercontent.com/2BingLing/dsh-market/master/assets/readme/badge-listed-zh.svg)](https://dsh.market/)
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


**📖 生态实测知识库**（实测数据，不是营销）：[插件开发指南 · 选型实测数据 · 维护取舍判据](https://perrylink.github.io/dsh-plugin-guide/)。

<!-- star-cta -->
## ⭐ 如果它帮到了你

这个插件是 [DSH 插件家族](https://github.com/PerryLink)的一员（95 个，全部 Apache-2.0）。如果你在用，**给个 star** —— 它不会解锁任何功能，但会让下一个人在搜索里更容易找到它。

*English:* part of a 95 plugin family for DeepSeek Harness. If it is useful, **a star helps the next person find it** — nothing is gated behind it.

## What is dsh-plugin-upgrade?

DeepSeek Harness 插件升级技能——一个包、一份走廊索引、两条闭合的走廊：`0.1.3-alpha.1` → `0.1.5-rc.1`（`legAB`）与 `0.1.5-rc.2` → `0.1.6-alpha.2`（`legC`）。

扫描器自行路由：它读取目标仓库声明的 dsh 区间（或接受 `--span`），然后套用那条走廊自己的、证据绑定的目录——`legAB` 的 20 条接缝（leg A `0.1.3-alpha.1` → `0.1.5-alpha.1` 加 leg B `0.1.5-alpha.1` → `0.1.5-rc.1`）或 `legC` 的 5 条接缝（`E1`–`E5`）。只有一个入口，因此「静默停止挂载的 client 半边」永远不会被误当成「typecheck 绿了」。

![dsh-plugin-upgrade 终端演示：dsh-plugin-upgrade — corridor scan of a sibling plugin repo](https://raw.githubusercontent.com/PerryLink/dsh-plugin-upgrade/main/docs/assets/dsh-plugin-upgrade-hero.png)

![Animated terminal demo of dsh-plugin-upgrade](https://raw.githubusercontent.com/PerryLink/dsh-plugin-upgrade/main/docs/assets/dsh-plugin-upgrade-demo.gif)

*同一次运行，动图版。*

## Comparison

![dsh-plugin-upgrade 的实测对比柱状图](https://raw.githubusercontent.com/PerryLink/dsh-plugin-upgrade/main/docs/assets/dsh-plugin-upgrade-evidence.png)

40 family repos swept · README §What you get (leg A, 2026-09-09)

## 兼容性

| 面 | 状态 |
|---|---|
| 宿主 | DeepSeek Harness `dsh-v0.2.1-alpha.1`（当前线；dev/test 钉号 `0.2.1-alpha.1`）。走廊索引与它所度量的跨度绑定：`legAB` = `0.1.3-alpha.1 → 0.1.5-rc.1`（tag `dsh-v0.1.7-alpha.2` = `183f08e9c6dd`；leg A→B 交接点 `dsh-v0.1.7-alpha.2` = `5dda764ed3aa`），`legC` = `0.1.5-rc.2 → 0.1.6-alpha.2`（tag `dsh-v0.1.7-alpha.2`）。peer 区间 `@deepseek-ai/dsh-skill >=0.1.6-0 <0.2.0 \|\| >=0.2.0-0 <0.3.0 \|\| >=0.2.1-0 <0.3.0`、`@deepseek-ai/cordis ^4.0.5-alpha.1`、`@deepseek-ai/schemastery ^3.18.5-alpha.1`。 |
| Node | `^22.19.0 \|\| >=24.0.0` |
| 平台 | 有 Node 即可；扫描器只读文件系统，与平台无关 |
| 模型 | 纯文本模型完全支持；技能就是一段 Markdown，不要求工具或视觉能力 |
| 走廊索引 | 一个包、一个入口。`lib/route.mjs` 持有全部闭合走廊，CLI 根据目标仓库声明的区间（`engines.dsh`、`@deepseek-ai/dsh*` 各范围）路由到匹配的那一条；`--span legAB\|legC` 可覆盖猜测，未声明区间时回退到较旧的走廊。两份目录从不合并：每条走廊保留自己的接缝数组、卡片、证据、夹具与一致性门禁。 |
| 范围 | **两条闭合的走廊**：`legAB` = `0.1.3-alpha.1` → `0.1.5-rc.1`（leg A + leg B），`legC` = `0.1.5-rc.2` → `0.1.6-alpha.2`。走廊永不加宽：新增接缝的一跳就是一条新走廊——一张新卡加一行新索引，而不是一个新包。 |
| Legs | 每条 leg 都在本包内：leg A 保留 `S1`–`S10` + `M1` 接缝，leg B 保留 `C1`、`C2`、`C4`、`C5`、`H1`–`H4`、`P1`，leg C 保留 `E1`–`E5`——各自带有自己的证据、卡片章节、夹具与回滚路径。没有需要另装的姊妹包。 |
| `C3` | 已弃用：leg B 的卡把「类型线陈旧导致的假绿」写作 `C3`，而这与 leg A 的 `M1` 是同一个缺陷。合并一事记录在卡上；`--seams C3` 匹配不到任何东西。 |
| 前身包 | 请勿在同一个 profile 中同时挂载已退役的 `dsh-plugin-upgrade`：两者都会注册 agent skill `plugin-upgrade`，第二次挂载会因 skill 名冲突而失败。该包在 npm 上已标记 deprecated、其仓库已退役；本包已取代它的两条腿。 |

## 你得到什么

两半，每条走廊一套接缝目录：

- **一个随包发布的 agent 技能（`plugin-upgrade`）** —— 合并后的走廊卡，以及「修-验」循环。正文先把调用者路由到与它 peer 区间相符的那条 leg；只有任务真正需要时模型才会加载它，本包不贡献任何系统提示词段落，也不注册工具。
- **一个零依赖 CLI（`dsh-plugin-upgrade-scan`）** —— 解析出走廊，并按 `file:line` 报告那条走廊接缝的事实：`legAB` 的二十条（`S3`、`S8`、`S9`、`M1`、`S4`、`S5`、`S6`、`S7`、`S2`、`S1`、`S10`、`C1`、`C2`、`P1`、`C4`、`C5`、`H1`、`H2`、`H4`、`H3`）于 2026-09-09（leg A）与 2026-09-10（leg B）从 harness 的 tag 区间重新读取，或 `legC` 的五条（`E1`–`E5`）在 `dsh-v0.1.7-alpha.1` 上测得（2026-09-19）。命中 error 级即退出码 `1`，可直接接进 CI。

它要消灭的失效模式是：**这一跨度的破坏大多是静默的，而且两端都静默。** 类型线可能陈旧，于是仓库是对着**旧目录**编译的（接缝 `M1`）；而裸 `conversation` client slot 被删除且没有别名，`ctx.slots.inject()` 又只在 declaration 存在时才执行回调——于是仍然指向它的 client 半边停止挂载，没有报错、没有日志、构建也不会失败（接缝 `C1`）。有三类破坏能穿过 `typecheck` + `test`：

1. 本地门禁编译了一条陈旧的类型线——旧的 `paths` 别名，或钉在 `0.1.5-alpha.*` 的 dev/test 类型（接缝 `M1`）；
2. 日志写入器漏掉了 V3 必需的 `stream` 字段，于是会话能导入、却拒绝恢复（接缝 `S3`）；
3. 测试是对着旧形状 mock 的，于是它们通过，而宿主丢掉了你的贡献（接缝 `C1`）。

诚实的量级说明：leg B 的工作区扫描发现，家族 client 半边一共只用了 **8** 个 slot key，且这 8 个在 rc.1 全部存活——对它们而言，rc.1 的破坏是**潜在破坏（latent），不是实际破坏**。真正会坏的是指向裸 `conversation` key 的第三方 client 插件，而且它们坏得悄无声息。leg A 的扫描发现的纹理正好相反：40 个仓，其中 11 个命中了 `M1`，而修好陈旧路径后，有 3 个此前「绿着」的仓暴露出真实的 TypeScript 错误。

## 快速开始

```sh
dsh plugin --profile web add github:PerryLink/dsh-plugin-upgrade
```

```sh
# 1. 把 bundle 装进你的 profile
dsh plugin --profile web add dsh-plugin-upgrade

# 2. 确认插件行已挂载
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade'

# 3. 扫描你要升级的插件
npx dsh-plugin-upgrade-scan --repo ../my-plugin
```

然后让 agent 使用 `plugin-upgrade` 技能，或自己用与你区间相符的卡驱动循环：
`skills/plugin-upgrade/references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md`（`legAB`——leg A 是 §1，leg B 是 §2，合并后的接缝索引是 §3）或 `skills/plugin-upgrade/references/v0.1.5-rc.2-to-v0.1.6-alpha.2.md`（`legC`）。扫描器会替你选走廊；当声明的区间有歧义时，加上 `--span legC`。

## 安装与卸载

```sh
dsh plugin --profile web add dsh-plugin-upgrade            # 从 npm
dsh plugin --profile web add github:PerryLink/dsh-plugin-upgrade   # 从源码
dsh plugin --profile web remove dsh-plugin-upgrade         # 卸载（可逆）
```

安装 bundle 只注册一个技能；移除插件行即移除技能。CLI 是普通 `npx` 目标，完全不需要 profile。

## 配置

每个键都可选，写在 profile patch 里：

| 键 | 默认 | 含义 |
|---|---|---|
| `enabled` | `true` | 是否注册随包技能。设为 `false` 可保留依赖但保持沉默。 |
| `skillName` | `plugin-upgrade` | 要注册的 `skillsRoot` 子目录名，也是目录里显示的名字。 |
| `skillsRoot` | 本包自己的 `./skills` | `<skillName>/SKILL.md` 所在处。指向你自己的卡即可复用这套管线。 |
| `userInvocable` | `true` | 除了模型，人是否也能按名字调用该技能。 |

```yaml
- insert:
    - id: dsh-plugin-upgrade
      name: dsh-plugin-upgrade
      config:
        skillName: plugin-upgrade
```

插件**挂载必须大声**：`SKILL.md` 缺失、正文为空、frontmatter 没有 `name`，都会直接让挂载失败，而不是注册一个空技能。

## 暴露面

**技能** —— `plugin-upgrade`（默认模型与人都可调用）。正文：leg 路由表、8 条硬规则与 6 步循环。引用：合并后的走廊卡。脚本：检测器，放在技能目录内，保证相对路径可解析。

**CLI** —— `dsh-plugin-upgrade-scan`：

```sh
dsh-plugin-upgrade-scan [--repo <path>] [--span legAB|legC|<span>] [--json <out.json>] [--seams S3,C1,P1] [--quiet]
```

| 参数 | 含义 |
|---|---|
| `--repo <path>` | 要扫描的仓库（默认当前目录）。它声明的 dsh 区间决定走哪条走廊。 |
| `--span legAB\|legC\|<span>` | 不再根据声明的区间猜测，而是强制指定走廊。未知区间回退到 `legAB`。 |
| `--json <out.json>` | 同时写出机器可读报告（`repo`、`scannedAt`、`files`、`hits[]`、`bySeam`）。 |
| `--seams S3,C1,P1` | 只跑解析出的那条走廊目录中的指定接缝（接缝 id 从不在走廊之间共享）。 |
| `--quiet` | 不打印人类可读渲染（与 `--json` 搭配）。 |

退出码：`0` 无 error 级命中 · `1` 至少一个 error 级命中 · `2` 用法或扫描失败。扫描干净是**必要非充分**条件——出口标准是真实宿主冒烟，**加上**日志写入器（leg A）的恢复往返，以及 client 半边（leg B）的真实浏览器断言。

## 二十条 `legAB` 接缝

顺序遵循 `lib/scan.mjs` 中的目录（先 leg A，后 leg B），这也是 `test/card.test.mjs` 把卡钉住的顺序。

| Id | 级别 | 通往 `0.1.5-rc.1` 的路上变了什么 |
|---|---|---|
| `S3` | error | `assistant/message` 新增了必需的 `stream` 字段（会话格式 V3）：漏写它的日志能成功导入，却拒绝恢复（`Session.fromRestore` 抛 `invalid settlement fields`）。 |
| `S8` | error | `SessionHandle.read()` 返回 `SessionHandleReadResult`（`{ eventState, events }`）而不是事件数组；数组操作必须先解包 `.events`。 |
| `S9` | error | `SystemPrompt` 的配置项由 `persona` 改名为 `personaPrefix` / `personaSuffix`。用 `includeHarnessIdentity: false` 顶替**并不等价**——那会删掉 harness 身份块。 |
| `M1` | error | 本地门禁编译了一条陈旧的类型线：dev/test 类型钉在 `0.1.5-alpha.*`，或 `tsconfig` 的 `paths` 别名指向不存在的 checkout 目录，都会让 TypeScript 静默回退到已发布的类型。门禁是绿的，尺子是错的。 |
| `S4` | error | `tool/code-dispatch` 改名为 `tool/ptc-dispatch`；旧标签在 V3 会话里不再被识别。 |
| `S5` | error | `ctx.agent` 被移除：调用方必须显式传入 Agent（例如 `setup(agentCtx, agent)` 的第二个参数）。 |
| `S6` | error | `Inbox` 是类型接口，不是可构造的类；夹具使用官方的不支持形状，运行时代码读 `agent.inbox`。 |
| `S7` | warn | `SubprocessHandle.pid` 被移除（只剩 `SubprocessTerminalHandle.pid`）；把该字段从测试夹具里删掉。 |
| `S2` | warn | `EpochHeader.system` 被移除：系统提示词现在是界面节点 0 的 `system/message`。 |
| `S1` | warn | 会话格式 V3 与带 generation 后缀的日志名——当前 generation 是 `session.v3.jsonl.zstd`，所以硬编码 `session.jsonl.zstd` 的脚本会静默失败。 |
| `S10` | warn | 插件自己写入的会话事件必须经过宿主的 fail-closed 适配闸门：`Session.append` 没有 `ignorable` 写入通道，所以一次无条件 append 就可能让会话变得不可读。 |
| `C1` | error | 裸 client slot `conversation` 被删除，替换为 `main` + `main.conversation`，**无别名**。`ctx.slots.inject()` 只在 declaration 存在时才触发，所以指向它的插件会**静默**停止挂载。 |
| `C2` | error | `@deepseek-ai/dsh-client-ui-sidebar-textpreview` 改名为 `…-sidebar-documentpreview`；旧名消失且没有 shim 包。 |
| `P1` | error | peer 区间必须保留第二段：`>=0.1.2-rc.1 <0.2.0` 单段在 npm semver 的 prerelease-tuple 规则下**拒绝** `0.1.5-rc.1`（semver 7.8.5 实测 `false`）。 |
| `C4` | warn | rc.1 新增了全局主面板模型（`main`、`sidebar.panellist`、`ctx.layout.selectPanel(MainPanelId \| null)`），并给几乎每个 slot 追加了 `usePanelInfo` 标准 prop。 |
| `C5` | warn | 文档预览迁到 keyed slot `sidebar.right.tab.document`（`DocumentContent`）；`sidebar.right.pane.tab` 仍在，但父入口变成 `rightbar.session`。 |
| `H1` | warn | `KNOWN_SESSION_EVENT_TYPES` 新增 `deliverables/presented` 与 `subagent/catalog`——fail-closed 词表变长。 |
| `H2` | warn | 新工具 `present` 的行占用了 `tool.call.toolview` 的 key `'present'`，而该 key 在 alpha.1 是空闲的。 |
| `H4` | info | DeepSeek 适配器的默认咨询模型目录改以 `deepseek-flash`（DeepSeek-V41-Flash）打头。 |
| `H3` | info | 新增可选能力：`ctx.sessionFeedback`、`ctx.layout.beginNavigation()`、`ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`。只在卡上列出，**刻意不做自动检测**。 |

`S7`、`S2`、`S1`、`S10`、`C4`、`C5`、`H1`、`H2` 与 `H4` 刻意保持提示级：它们都有合法命中（已经用了新 API 的仓、一份文档快照、插件自己的模型 id 表、Node 的 `ChildProcess.pid`），所以扫描器把它们作为人工复核线索，而不是失败。`M1` 与 `P1` 是**结构化**检查——它们解析 `package.json` 与 `tsconfig*.json`，而不是匹配文本——而 `H3` 是**仅卡片（card-only）**：有文档、参与 id 一致性校验，且刻意没有检测器（`CARD_ONLY = ['H3']`）。

## 五条 `legC` 接缝（`0.1.5-rc.2` → `0.1.6-alpha.2`）

顺序遵循 `lib/scan-0.1.6.mjs` 中的目录，这也是 `test/card.test.mjs` 把 `legC` 卡钉住的顺序。这里每条接缝都是 `error`，且每条都会被检测到（`CARD_ONLY = []`）。

| Id | 级别 | 通往 `0.1.6-alpha.2` 的路上变了什么 |
|---|---|---|
| `E1` | error | `agent/created` 监听器是串行派发的：抛异常的监听器——或做了慢工作的监听器——会直接阻塞 agent 创建。把同步工作包进 `try`/`catch`，其余用 `queueMicrotask`/`setImmediate` 或你自己的队列延后。 |
| `E2` | error | 异步 `apply()` 的第一个 `await` 出现在注册之前：此后注册的任何东西都落进卸载窗口并抛 `INACTIVE_EFFECT`，而旧的闭包仍在运行。把一切注册都放在第一个 `await` 之前、放进同一个 `ctx.effect()` 里。 |
| `E3` | error | 被删除的 slot/state 键：`settings.plugin.item` 变成 keyed→list 的 `plugins.item`，`SessionListState.current` 消失——设置卡会**静默**消失（`spec === undefined` 提前返回），而 `current` 的类型断言照旧编译，功能却已死。 |
| `E4` | error | 被删除的 client API：`sessions.open` / `openSubagent` / `clear` 变成 `retain` / `using` / `retainInfo`。 |
| `E5` | error | 被删除的模型字面量：`deepseek-v4-flash*` 与 `deepseek-v4-vision-exp`。默认模型目录从 4 缩到 2，未编入目录的 id 以纯文本方式透传。 |

与 `legAB` 相同的纪律同样适用：扫描干净是必要而非充分条件。`legC` 的破坏是静默的或仅运行时的（已发布的类型线掩盖了那些删除），所以出口标准仍是在临时 `DSH_HOME` 上的真实宿主冒烟，外加适用情况下的日志写入器往返与真实浏览器断言。

## 本包不覆盖什么

- **越过本包任何一条走廊的一跳。** `legAB` 按构造终止于 `0.1.5-rc.1`：harness 从 `0.1.5-rc.1` 到 `0.1.5-rc.2` 的一跳没有新增任何面向插件的接缝（本包自己的 dev/test 钉版现已跑到 `0.1.7-rc.2` 线，因此目录是对着那些已发布类型校验的；compat workflow 的探针仍锚定 `0.1.6-alpha.2`），而 `legC` 覆盖 `0.1.5-rc.2` → `0.1.6-alpha.2`。之后任何新增接缝的一跳都**不**被覆盖：走廊是闭合的，加宽一张卡比新增一张卡更糟。它会得到一张新卡和一行新索引——而不是一个新包。
- **`0.1.1` → `0.1.2` 这一跳。** 请使用社区收敛技能。
- **跨 leg 重述。** leg A 拥有会话格式接缝（`assistant/message.stream`、`SessionHandleReadResult`、`EpochHeader.system`、`ctx.agent`、`Inbox`、`SystemPrompt.persona`、V3 日志 generation），leg B 不重述它们——leg B 区间内 `packages/core/session/src` 的全部 diff 只有两个新增的事件类型字面量与一行注释。每条 leg 的卡片章节保留自己的范围声明。
- **DSH 面向用户的升级路径。** 本包升级的是**插件源码**，不是用户的 harness 安装。
- **主题 token。** `docs/web-styling.md` 在 leg B 区间零变更。
- **证明。** 扫描干净只是假设。出口标准是真实宿主冒烟（临时 `DSH_HOME`、目标 CLI、`plugin add <tarball>`、`--dump-config`），**加上**会话日志写入器（leg A）的恢复往返，以及每个 client 侧命中项（leg B）的真实浏览器断言。

## 安全边界

- **只读扫描。** CLI 绝不在被扫仓库内写入；`--json` 只写你指定的路径。
- **无网络、无 shell。** 扫描器只 import Node 标准库，从不启动子进程。
- **无凭据。** 本包不读取任何凭据、环境令牌或会话数据。
- **沙箱化冒烟配方。** 卡里的真实宿主检查使用 `mkdtemp` 的 `DSH_HOME`，绝不碰你真实的 `~/.dsh`。

## 开发

```sh
npm install                        # 或者：pnpm install（仓库带 pnpm-lock.yaml）
npm test                           # node --test：扫描器、卡↔目录一致性、真实 Cordis + SkillRegistry
npm run verify:self-contained      # 每个 import 都在包内解析
npm run verify:artifacts           # 打出来的 tarball 带技能/CLI/patch，且不含测试
npm run check:readmes              # 五语 README 一致性
npm pack
```

扫描器**每条 `legAB` leg 各有一对**合成夹具：`fixtures/leg-a-bad-repo`（leg A 的会话/配置接缝，故意包含全部 error 级接缝）配 `fixtures/leg-a-good-repo`（已适配），以及 `fixtures/bad-repo`（leg B 的 client slot 接缝）配 `fixtures/good-repo`（已适配）——再外加拿一个已钉 `0.1.5-rc.1` 的家族仓做 live negative，所以目录里的回归会在这个测试套件里失败，而不是在下游用户那里。`test/card.test.mjs` 断言每张卡的索引与它自己的目录（`legAB` 用 `lib/scan.mjs`，`legC` 用 `lib/scan-0.1.6.mjs`）命名的**正好**是同样的接缝 id、同样的级别，`legAB` 的 `CARD_ONLY` 正好是 `['H3']` 而 `legC` 的是空，并且两份目录不共享任何接缝 id——把「证据绑定」规则变成机器门禁，每条走廊各一道。

## 主题标签

`dsh`、`dsh-plugin`、`deepseek-harness`、`deepseek`、`cordis`、`plugin-upgrade`、`migration`、`skill`、`version-card`、`scanner`、`client-slots`（与 `package.json` keywords 一致；`dsh-plugin` 是生态的可见性通道）。

## PerryLink DSH Plugin Family

本项目是 [PerryLink](https://github.com/PerryLink) 维护的 DeepSeek Harness 插件家族成员：**87 个活跃维护**，名册共 **95** 个，其中 **5 个已冻结**、**3 个已退役**。完整名单默认折叠，避免每个 README 的首屏被长表淹没；点击展开可查看每一行，原因见「状态」列。

<details>
<summary>展开全部 95 个插件</summary>

| 插件 | 一句话 | 状态 |
|---|---|---|
| **[dsh-aqua-input-check](https://github.com/PerryLink/dsh-aqua-input-check)** | 水产养殖投入品记录核对（按投入品用量、休药期与起捕间隔核对记录自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-archive-check](https://github.com/PerryLink/dsh-archive-check)** | 档案归档完整性与保管期限核对（依据《档案法》及配套规定，仅提示差异，不作出定性结论） |  |
| **[dsh-auto-review](https://github.com/PerryLink/dsh-auto-review)** | Second-model auto-review on the approval chain, fail-closed by default |  |
| **[dsh-autotier](https://github.com/PerryLink/dsh-autotier)** | Automatic strong/cheap model-tier routing with deterministic risk guards and a `/tier` command |  |
| **[dsh-background-agents](https://github.com/PerryLink/dsh-background-agents)** | Durable background child agents with a Web UI sidebar, messaging and interrupt | 🚫 已退役 — 见仓库 README |
| **[dsh-bid-ca-precheck](https://github.com/PerryLink/dsh-bid-ca-precheck)** | 投标文件符合性预检（按招标文件逐条核对响应情况，仅提示差异，不作出定性结论） |  |
| **[dsh-bid-qual-check](https://github.com/PerryLink/dsh-bid-qual-check)** | 投标人资格条件核对（按资格条件与证明材料核对逐条响应，仅提示差异，不作出定性结论） |  |
| **[dsh-budget](https://github.com/PerryLink/dsh-budget)** | Cost governance for DeepSeek Harness: budgets, carbon, and latency in one panel. | 🧊 已冻结 — 见仓库 README |
| **[dsh-cert-mcp](https://github.com/PerryLink/dsh-cert-mcp)** | Read-only MCP server exposing the certification registry: grades, snapshots and five-dimension evidence |  |
| **[dsh-checkpoint-rewind](https://github.com/PerryLink/dsh-checkpoint-rewind)** | Claude Code /rewind-equivalent: snapshots, session forks, one-shot restore |  |
| **[dsh-claude-move](https://github.com/PerryLink/dsh-claude-move)** | Migrate Claude Code sessions, memory, skills and CLAUDE.md into DSH | 🧊 已冻结 — 见仓库 README |
| **[dsh-click](https://github.com/PerryLink/dsh-click)** | Cross-platform native desktop control for DeepSeek Harness — Windows first. |  |
| **[dsh-composer-history](https://github.com/PerryLink/dsh-composer-history)** | Terminal-style input history for the web composer: arrows, Ctrl+R search |  |
| **[dsh-contract-stance](https://github.com/PerryLink/dsh-contract-stance)** | 合同条款立场台账核对（按立场、风险等级与退让底线核对台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-customs-doc-check](https://github.com/PerryLink/dsh-customs-doc-check)** | 报关单证一致性核对（按公开的报关单填制规范核对单证间字段一致性，仅提示差异，不作出定性结论） |  |
| **[dsh-data-quality](https://github.com/PerryLink/dsh-data-quality)** | Dataset quality checks and citation cross-checks (the optional numeric bridge consumed here) |  |
| **[dsh-defend](https://github.com/PerryLink/dsh-defend)** | Prompt-injection, jailbreak, and secret-leak defense for DeepSeek Harness. | 🧊 已冻结 — 见仓库 README |
| **[dsh-demurrage-ledger](https://github.com/PerryLink/dsh-demurrage-ledger)** | 滞箱费台账核对（按免箱期与费率核对超期天数与金额的自洽性，仅提示差异，不作出定性结论） |  |
| **[dsh-doublecheck](https://github.com/PerryLink/dsh-doublecheck)** | Engineering-discipline guard: requirements grill, test gates, adversary review |  |
| **[dsh-draw](https://github.com/PerryLink/dsh-draw)** | Unified static-image generation routing for DeepSeek Harness. | 🧊 已冻结 — 见仓库 README |
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
| **[dsh-reach](https://github.com/PerryLink/dsh-reach)** | Multi-channel approval/question bridge: WeChat/Telegram/Feishu, session console | 🧊 已冻结 — 见仓库 README |
| **[dsh-repair-order-qc](https://github.com/PerryLink/dsh-repair-order-qc)** | 维修工单结算核对（按项目金额、配件工时合计与结算总额核对算术自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-research-report](https://github.com/PerryLink/dsh-research-report)** | Verifiable research-report engine: content-addressed evidence ledger and sealed versions |  |
| **[dsh-review-reply-check](https://github.com/PerryLink/dsh-review-reply-check)** | 审稿意见逐条回应覆盖核对（按意见与回应一一对应核对覆盖完整性，仅提示差异，不作出定性结论） |  |
| **[dsh-rulefile-check](https://github.com/PerryLink/dsh-rulefile-check)** | 规则库文件自检核对（按条款引用纪律与效力上限核对规则库自身合规，仅提示差异，不作出定性结论） |  |
| **[dsh-safety-brief-check](https://github.com/PerryLink/dsh-safety-brief-check)** | 安全技术交底记录要素齐备性与签字闭环核对（依据公开的安全生产法规与检查标准，仅提示差异，不作出定性结论） |  |
| **[dsh-score](https://github.com/PerryLink/dsh-score)** | Multi-dimensional quality scoring for DeepSeek Harness plugins. |  |
| **[dsh-session-pin](https://github.com/PerryLink/dsh-session-pin)** | Pin sessions in the Web sidebar with durable ordering | 🚫 已退役 — 见仓库 README |
| **[dsh-session-sync](https://github.com/PerryLink/dsh-session-sync)** | Cross-device session sync for DeepSeek Harness — a dedicated git mirror of your session store. |  |
| **[dsh-site-log-check](https://github.com/PerryLink/dsh-site-log-check)** | 监理日志跨日连续性与旁站覆盖提示（依据 GB/T 50319-2013 等公开文件，仅提示差异，不作出定性结论） |  |
| **[dsh-skill-pack-security](https://github.com/PerryLink/dsh-skill-pack-security)** | Security-audit skill pack: secret scan, dependency and supply-chain review |  |
| **[dsh-soe-decision-check](https://github.com/PerryLink/dsh-soe-decision-check)** | 三重一大决策台账核对（按前置研究、会议审议与决议记录核对程序留痕，仅提示差异，不作出定性结论） |  |
| **[dsh-soilwater-check](https://github.com/PerryLink/dsh-soilwater-check)** | 土壤与地下水监测台账核对（按点位、监测项目、限值与超标判定核对台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-sop-sync-check](https://github.com/PerryLink/dsh-sop-sync-check)** | 作业规程与 FMEA／控制计划一致性核对（按编号与版本核对三份文件是否同步，仅提示差异，不作出定性结论） |  |
| **[dsh-spc-gbt-adapter](https://github.com/PerryLink/dsh-spc-gbt-adapter)** | 控制图常数与过程能力指数核对（按 GB/T 4091 的常规控制图常数表核对控制限与 Cp/Cpk 的自洽性，仅提示差异，不作出定性结论） |  |
| **[dsh-talk](https://github.com/PerryLink/dsh-talk)** | Voice-first session loop for DeepSeek Harness: talk to it, hear it answer. |  |
| **[dsh-team-rooms](https://github.com/PerryLink/dsh-team-rooms)** | Cross-session team rooms: shared message bus, task board and timeline | 🚫 已退役 — 见仓库 README |
| **[dsh-tender-extract](https://github.com/PerryLink/dsh-tender-extract)** | 招标文件条款摘录核对（按出处与原文逐字核对摘录完整性，仅提示差异，不作出定性结论） |  |
| **[dsh-tender-matrix](https://github.com/PerryLink/dsh-tender-matrix)** | 评标因素评分矩阵核对（按分值上限与合计核对矩阵自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-test-drive](https://github.com/PerryLink/dsh-test-drive)** | Isolated install-and-smoke test drives for DeepSeek Harness plugins. |  |
| **[dsh-ticktick](https://github.com/PerryLink/dsh-ticktick)** | TickTick/Dida365 task bridge: session-header panel + 11 tools |  |
| **[dsh-translate](https://github.com/PerryLink/dsh-translate)** | Vendor parameter translation and deterministic JSON repair for DeepSeek Harness. |  |
| **[dsh-warranty-calc](https://github.com/PerryLink/dsh-warranty-calc)** | 质保期与索赔金额核对（按质保期月数与里程、索赔金额算式核对自洽，仅提示差异，不作出定性结论） |  |

</details>

</details>

</details>

## 许可证

Apache-2.0 —— 见 [LICENSE](LICENSE)。安装期依赖及其许可证列在 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)；本包不打包任何第三方代码。
