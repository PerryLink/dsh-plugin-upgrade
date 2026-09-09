<div align="center">

# ⬆️ dsh-plugin-upgrade
- **1024 商店通道**：先 `npm i -g dsh1024`，再执行 `dsh1024 plugin --profile web add dsh-plugin-upgrade`（计入 [deepseek1024.com](https://deepseek1024.com) 安装排行）。
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade)

**DeepSeek Harness 插件升级技能（版本锁定）——`0.1.3-alpha.1` → `0.1.5-alpha.1`。**

*一张版本卡 + 一个零依赖接缝扫描器，让「typecheck 绿了」不再被误当成「插件还能跑」。*

> **官方仓库。** 这是 dsh-plugin-upgrade 唯一的官方仓库，由 PerryLink 维护。其他账号下的同名仓库与本项目无关。

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

## 兼容性

| 面 | 状态 |
|---|---|
| 宿主 | DeepSeek Harness `0.1.5-alpha.1`（checkout `19d2e38480`，tag `dsh-v0.1.5-alpha.1` = `5dda764ed3`）。peer 区间 `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`、`@deepseek-ai/cordis ^4.0.2`、`@deepseek-ai/schemastery ^3.18.2`。 |
| Node | `^22.19.0 \|\| >=24.0.0` |
| 平台 | 有 Node 即可；扫描器只读文件系统，与平台无关 |
| 模型 | 纯文本模型完全支持；技能就是一段 Markdown，不要求工具或视觉能力 |
| 范围 | **只覆盖一条走廊**：`0.1.3-alpha.1` → `0.1.5-alpha.1`。它不是通用迁移框架。 |

## 你得到什么

两半，一套接缝目录：

- **一个随包发布的 agent 技能（`plugin-upgrade-015`）** —— 版本卡 + 「修-验」循环。只有任务真正需要时模型才会加载它；本包不贡献任何系统提示词段落，也不注册工具。
- **一个零依赖 CLI（`dsh-plugin-upgrade-scan`）** —— 按 `file:line` 报告十类接缝；这些接缝来自 2026-09-09 那轮对 40 个真实插件仓的实测。命中 error 级即退出码 `1`，可直接接进 CI。

它要消灭的失效模式是：**本地门禁绿了，不等于适配完成。** 有两类破坏能穿过 `typecheck` + `test`：

1. 已发布的类型线把接缝藏住，仓库对着旧类型编译（接缝 `M1`）；
2. 测试是按旧形状 mock 的，于是测试通过而宿主拒收。

十类接缝中的 `S3`、`S8`、`S9`、`M1` 在本包成文时仍未被任何社区升级 PR 覆盖；其余六类已与该轮证据交叉核对。

## 快速开始

```sh
# 1. 把 bundle 装进 profile
dsh plugin --profile web add dsh-plugin-upgrade

# 2. 确认这一行挂上了
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade'

# 3. 扫描你正在升级的插件
npx dsh-plugin-upgrade-scan --repo ../my-plugin
```

然后让 agent 使用 `plugin-upgrade-015` 技能，或者自己照着版本卡走：
`skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-alpha.1.md`。

## 安装与卸载

```sh
dsh plugin --profile web add dsh-plugin-upgrade            # 从 npm 安装
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade#main"   # 从源码安装
dsh plugin --profile web remove dsh-plugin-upgrade         # 卸载（可逆）
```

装 bundle 只是注册一个技能；删掉那一行就删掉技能。CLI 是普通的 `npx` 目标，完全不需要 profile。

## 配置

所有键都可选，写在 profile patch 里：

| 键 | 默认 | 含义 |
|---|---|---|
| `enabled` | `true` | 是否注册随包技能。设为 `false` 可保留依赖但不生效。 |
| `skillName` | `plugin-upgrade-015` | `skillsRoot` 下要注册的目录名，也是目录里显示的名字。 |
| `skillsRoot` | 包自带的 `./skills` | `<skillName>/SKILL.md` 所在目录。指向你自己的卡即可复用整套管线。 |
| `userInvocable` | `true` | 除模型外，是否允许人按名字调用该技能。 |

```yaml
- insert:
    - id: dsh-plugin-upgrade
      name: dsh-plugin-upgrade
      config:
        skillName: plugin-upgrade-015
```

挂载是「大声失败」的：`SKILL.md` 缺失、正文为空、或 frontmatter 没有 `name`，都会让挂载失败，而不是注册一个空技能。

## 暴露面

**技能** —— `plugin-upgrade-015`（默认模型可调用、人也可调用）。正文：6 步循环。引用：版本卡。脚本：扫描器，随技能目录一起发布，因此相对路径可解析。

**CLI** —— `dsh-plugin-upgrade-scan`：

```sh
dsh-plugin-upgrade-scan [--repo <path>] [--json <out.json>] [--seams S3,S8,M1] [--quiet]
```

| 参数 | 含义 |
|---|---|
| `--repo <path>` | 要扫描的仓库（默认：当前目录）。 |
| `--json <out.json>` | 同时写出机器可读报告（`repo`、`scannedAt`、`files`、`hits[]`、`bySeam`）。 |
| `--seams S3,S8,M1` | 只扫指定接缝。 |
| `--quiet` | 不打印人类可读渲染（与 `--json` 搭配）。 |

退出码：`0` 无 error 级命中 · `1` 至少一个 error 级命中 · `2` 用法或扫描失败。扫描干净是必要条件而非充分条件 —— 卡上的出口标准是在临时 `DSH_HOME` 上做一次真机冒烟。

## 十类接缝

| Id | 级别 | `0.1.5-alpha.1` 线里变了什么 |
|---|---|---|
| `S1` | warn | 会话格式为 V3，日志文件名带世代（`session.v3.jsonl.zstd`）。硬编码 `session.jsonl.zstd` 会静默失效。 |
| `S2` | warn | `EpochHeader.system` 已移除；系统提示词是 surface 节点 0 的 `system/message`。读取方需要结构式回退。 |
| `S3` | error | `assistant/message` 必须带 `stream`；缺了会话能导入但无法续聊（`Session.fromRestore` 拒绝非法 settlement 字段）。 |
| `S4` | error | `tool/code-dispatch` 改名为 `tool/ptc-dispatch`。 |
| `S5` | error | `ctx.agent` 已移除；调用方改为显式接收 `Agent`。 |
| `S6` | error | `Inbox` 变成类型接口，不再可构造；请用 `agent.inbox` 与官方夹具形状。 |
| `S7` | warn | `SubprocessHandle.pid` 已移除（只有 `SubprocessTerminalHandle` 保留 `pid`）。 |
| `S8` | error | `SessionHandle.read()` 现在返回 `SessionHandleReadResult` —— 要解包 `.events`。 |
| `S9` | error | `SystemPrompt` 配置的 `persona` 改为 `personaPrefix` / `personaSuffix`。 |
| `M1` | error | `tsconfig` 的 `paths` 指向不存在的 checkout 目录时，TypeScript 会静默回退到已发布类型 —— 本地门禁变成**假绿**。 |

`S7`、`S1`、`S2`、`S10` 刻意保持「提示」级别：它们有合法命中（Node 自带的 `pid`、旧世代读取器、插件自建的自适应事件门），所以扫描器把它们报成待人工复核的线索，而不是失败。

## 本包不覆盖什么

- **其他走廊。** `0.1.1` → `0.1.2` 以及未来版本线不在范围内；版本卡刻意锁死版本 —— 会漂移的卡比没有卡更糟。
- **DSH 面向用户的升级路径。** 本包升级的是**插件源码**，不是用户的 harness 安装。
- **客户端/浏览器行为。** 扫描器是静态的；client 半边仍需真实浏览器断言。
- **证明。** 扫描干净只是假设。出口标准是真机冒烟（临时 `DSH_HOME`、目标 CLI、`plugin add <tarball>`、`--dump-config`，会话日志写入方还要加一次 resume 往返）。

## 安全边界

- **只读扫描。** CLI 绝不往被扫仓库里写文件；`--json` 只写你指定的路径。
- **无网络、无 shell。** 扫描器除 Node 标准库外不引入任何依赖，也从不创建进程。
- **不碰密钥。** 本包不读取凭据、环境令牌或会话数据。
- **沙箱化冒烟配方。** 卡上的真机检查使用 `mkdtemp` 出来的 `DSH_HOME`，绝不碰你真实的 `~/.dsh`。

## 开发

```sh
pnpm install
pnpm test                          # node --test（真实 Cordis + 真实 SkillRegistry）
pnpm run verify:self-contained     # 所有 import 都在包内解析
pnpm run verify:artifacts          # 打包产物带齐技能、CLI 与 patch
pnpm run check:readmes             # 五语 README 一致性
pnpm pack
```

扫描器自带合成的 `fixtures/bad-repo` 与 `fixtures/good-repo`，外加一个针对已适配仓库的 live negative —— 目录回归会让测试套件失败，而不是让下游用户踩坑。

## 主题标签

`dsh`、`dsh-plugin`、`deepseek-harness`、`deepseek`、`cordis`、`plugin-upgrade`、`migration`、`skill`、`version-card`、`scanner`（与 `package.json` 的 keywords 一致；`dsh-plugin` 是生态的曝光通道）。

## PerryLink DSH 插件家族

属于 PerryLink DSH 插件家族 —— 40 个仓库，覆盖会话、记忆、权限、交付、可观测性与开发者工具。目录见 [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) 或 [`dsh-plugin` 主题](https://github.com/topics/dsh-plugin)。

## 许可证

Apache-2.0 —— 见 [LICENSE](LICENSE)。安装期依赖及其许可证列在 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)；本包不打包任何第三方代码。
