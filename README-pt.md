<div align="center">

# ⬆️ dsh-plugin-upgrade
- **Canal da loja 1024**: rode `npm i -g dsh1024` uma vez e depois `dsh1024 plugin --profile web add dsh-plugin-upgrade` (conta para o ranking de instalações do [deepseek1024.com](https://deepseek1024.com)).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade)

**Skill de upgrade de plugins com versão fixada para o DeepSeek Harness — `0.1.3-alpha.1` → `0.1.5-alpha.1`.**

*Um cartão de versão mais um scanner de costuras sem dependências, para que «typecheck está verde» nunca seja confundido com «o plugin ainda funciona».*

> **Repositório oficial.** Este é o único repositório oficial do dsh-plugin-upgrade, mantido pela PerryLink. Repositórios com o mesmo nome em outras contas não são afiliados.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![Node](https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-brightgreen.svg)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/PerryLink/dsh-plugin-upgrade/ci.yml?branch=main&label=CI)](https://github.com/PerryLink/dsh-plugin-upgrade/actions)
[![Version](https://img.shields.io/github/v/tag/PerryLink/dsh-plugin-upgrade?label=version)](https://github.com/PerryLink/dsh-plugin-upgrade/releases)
[![npm version](https://img.shields.io/npm/v/dsh-plugin-upgrade)](https://www.npmjs.com/package/dsh-plugin-upgrade)
[![npm downloads](https://img.shields.io/npm/dm/dsh-plugin-upgrade)](https://www.npmjs.com/package/dsh-plugin-upgrade)

[English](README.md) · [简体中文](README-zh.md) · [Español](README-es.md) · [Português](README-pt.md) · [हिन्दी](README-hi.md)

</div>

---

## Compatibilidade

| Superfície | Status |
|---|---|
| Harness | DeepSeek Harness `0.1.5-rc.1` (checkout `2efea31131`, tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`). Faixa de peers `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Plataformas | Onde o Node rodar; o scanner só lê o sistema de arquivos e é neutro de plataforma |
| Modelo | Modelos somente texto são totalmente suportados; a skill é um corpo Markdown, sem exigência de ferramentas ou visão |
| Escopo | **Um único corredor**: `0.1.3-alpha.1` → `0.1.5-alpha.1`. Não é um framework de migração geral. |

## O que você recebe

Duas metades e um único catálogo de costuras:

- **Uma skill de agente incluída (`plugin-upgrade-015`)** — um cartão de versão e um ciclo de corrigir-e-verificar. O modelo só a carrega quando a tarefa realmente precisa; o pacote não contribui com nenhum parágrafo do prompt de sistema nem registra ferramentas.
- **Uma CLI sem dependências (`dsh-plugin-upgrade-scan`)** — reporta fatos `arquivo:linha` para dez costuras medidas em 40 repositórios reais de plugins durante a onda de adaptação de 2026-09-09. Sai com `1` a qualquer achado de severidade erro, então entra direto no CI.

O objetivo é o modo de falha que o cartão existe para eliminar: **um portão local verde não é prova de adaptação.** Duas classes de quebra sobrevivem a `typecheck` + `test`:

1. a linha de tipos publicada esconde a costura e o repositório compila contra tipos obsoletos (costura `M1`);
2. os testes são mockados na forma antiga, então passam enquanto o host rejeita a nova.

Quatro das dez costuras — `S3`, `S8`, `S9`, `M1` — ainda não eram cobertas por nenhum PR comunitário de upgrade quando este pacote foi escrito; as outras seis foram cruzadas com a evidência da onda.

## Início rápido

```sh
# 1. instale o bundle no seu perfil
dsh plugin --profile web add dsh-plugin-upgrade

# 2. confirme que a linha montou
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade'

# 3. escaneie o plugin que você está atualizando
npx dsh-plugin-upgrade-scan --repo ../my-plugin
```

Depois peça ao agente para usar a skill `plugin-upgrade-015`, ou conduza o ciclo você mesmo com o cartão em
`skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-alpha.1.md`.

## Instalação e desinstalação

```sh
dsh plugin --profile web add dsh-plugin-upgrade            # do npm
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade#main"   # do código-fonte
dsh plugin --profile web remove dsh-plugin-upgrade         # desinstalar (reversível)
```

Instalar o bundle apenas registra uma skill; remover a linha a remove. A CLI é um alvo `npx` normal e não precisa de perfil algum.

## Configuração

Toda chave é opcional e vive no patch do perfil:

| Chave | Padrão | Significado |
|---|---|---|
| `enabled` | `true` | Registra a skill incluída. `false` mantém a dependência montada mas silenciosa. |
| `skillName` | `plugin-upgrade-015` | Diretório sob `skillsRoot` a registrar, e o nome exibido no catálogo. |
| `skillsRoot` | o `./skills` do próprio pacote | Onde fica `<skillName>/SKILL.md`. Aponte para o seu próprio cartão para reutilizar a infraestrutura. |
| `userInvocable` | `true` | Se uma pessoa pode invocar a skill pelo nome além do modelo. |

```yaml
- insert:
    - id: dsh-plugin-upgrade
      name: dsh-plugin-upgrade
      config:
        skillName: plugin-upgrade-015
```

A montagem falha alto: um `SKILL.md` ausente, um corpo vazio ou um frontmatter sem `name` abortam a montagem em vez de registrar uma skill vazia.

## Superfícies

**Skill** — `plugin-upgrade-015` (invocável pelo modelo e pela pessoa por padrão). Corpo: o ciclo de 6 passos. Referências: o cartão de versão. Scripts: o detector, incluído dentro do diretório da skill para que caminhos relativos resolvam.

**CLI** — `dsh-plugin-upgrade-scan`:

```sh
dsh-plugin-upgrade-scan [--repo <path>] [--json <out.json>] [--seams S3,S8,M1] [--quiet]
```

| Flag | Significado |
|---|---|
| `--repo <path>` | Repositório a escanear (padrão: cwd). |
| `--json <out.json>` | Também grava o relatório legível por máquina (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams S3,S8,M1` | Restringe a costuras específicas. |
| `--quiet` | Silencia a saída humana (combine com `--json`). |

Códigos de saída: `0` nenhum achado de severidade erro · `1` pelo menos um · `2` uso ou falha de varredura. Uma varredura limpa é necessária mas não suficiente — o critério de saída do cartão é um smoke real em um `DSH_HOME` temporário.

## As dez costuras

| Id | Severidade | O que mudou na linha `0.1.5-alpha.1` |
|---|---|---|
| `S1` | warn | O formato de sessão é V3; o arquivo de log carrega geração (`session.v3.jsonl.zstd`). Caminhos fixos em `session.jsonl.zstd` param de funcionar em silêncio. |
| `S2` | warn | `EpochHeader.system` desapareceu; o prompt de sistema é `system/message` no nó 0 da superfície. Leitores precisam de um fallback estrutural. |
| `S3` | error | `assistant/message` exige `stream`; sem ele a sessão importa mas não pode ser retomada (`Session.fromRestore` rejeita campos de settlement inválidos). |
| `S4` | error | `tool/code-dispatch` virou `tool/ptc-dispatch`. |
| `S5` | error | `ctx.agent` foi removido; os chamadores recebem o `Agent` explicitamente. |
| `S6` | error | `Inbox` virou uma interface de tipo — não pode mais ser construída; use `agent.inbox` e a forma oficial do fixture. |
| `S7` | warn | `SubprocessHandle.pid` foi removido (só `SubprocessTerminalHandle` mantém `pid`). |
| `S8` | error | `SessionHandle.read()` agora retorna `SessionHandleReadResult` — desembrulhe `.events`. |
| `S9` | error | A configuração `persona` do `SystemPrompt` virou `personaPrefix` / `personaSuffix`. |
| `M1` | error | Um alias `paths` do `tsconfig` apontando para um diretório inexistente faz o TypeScript cair em silêncio nos tipos publicados — o portão local fica **falsamente verde**. |

`S7`, `S1`, `S2` e `S10` são deliberadamente informativos: têm correspondências legítimas (o `pid` do Node, leitores de gerações antigas, o próprio portão adaptativo de eventos de um plugin), então o scanner os reporta como pistas para revisão manual e não como falhas.

## O que isto não cobre

- **Outros corredores.** `0.1.1` → `0.1.2` e linhas futuras ficam fora; o cartão é fixado de propósito, porque um cartão que desvia é pior que nenhum.
- **O caminho de upgrade do DSH para usuários.** Este pacote atualiza o **código-fonte do plugin**, não a instalação do harness de um usuário.
- **Comportamento de cliente/navegador.** O scanner é estático; uma metade cliente ainda precisa de asserção real no navegador.
- **Prova.** Uma varredura limpa é uma hipótese. O critério de saída é um smoke real no host (`DSH_HOME` temporário, CLI alvo, `plugin add <tarball>`, `--dump-config`, mais uma ida e volta de resume para quem escreve logs de sessão).

## Limites de segurança

- **Varredura somente leitura.** A CLI nunca escreve dentro do repositório varrido; `--json` grava apenas no caminho informado.
- **Sem rede nem shell.** O scanner não importa nada além da biblioteca padrão do Node e nunca cria processos.
- **Sem segredos.** Nada no pacote lê credenciais, tokens de ambiente ou dados de sessão.
- **Receita de smoke em sandbox.** A checagem real do cartão usa um `DSH_HOME` criado com `mkdtemp`; nunca toca seu `~/.dsh` real.

## Desenvolvimento

```sh
pnpm install
pnpm test                          # node --test (Cordis real + SkillRegistry real)
pnpm run verify:self-contained     # todo import resolve dentro do pacote
pnpm run verify:artifacts          # o tarball leva a skill, a CLI e o patch
pnpm run check:readmes             # consistência dos README em cinco idiomas
pnpm pack
```

O scanner traz seus próprios `fixtures/bad-repo` e `fixtures/good-repo` sintéticos, mais um negativo ao vivo em um repositório já adaptado pela onda, de modo que uma regressão no catálogo quebra a suíte em vez de chegar a um usuário.

## Tópicos

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner` (espelham as keywords do `package.json`; `dsh-plugin` é o canal de visibilidade do ecossistema).

## Família de plugins DSH da PerryLink

Parte da família de plugins DSH da PerryLink — 40 repositórios cobrindo sessões, memória, permissões, entrega, observabilidade e ferramentas de desenvolvedor. Explore o catálogo em [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) ou no [tópico `dsh-plugin`](https://github.com/topics/dsh-plugin).

## Licença

Apache-2.0 — veja [LICENSE](LICENSE). As dependências de instalação e suas licenças estão em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); nada de terceiros é empacotado.
