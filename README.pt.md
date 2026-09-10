<div align="center">

# ⬆️ dsh-plugin-upgrade-rc1
- **Canal da loja 1024**: rode `npm i -g dsh1024` uma vez e depois `dsh1024 plugin --profile web add dsh-plugin-upgrade-rc1` (conta para o ranking de instalações do [deepseek1024.com](https://deepseek1024.com)).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade-rc1)

**Habilidade de atualização de plugins para o DeepSeek Harness, com versão travada — `0.1.5-alpha.1` → `0.1.5-rc.1`.**

*Um cartão de corredor mais um scanner de costuras sem dependências, para que uma metade de cliente que parou de montar em silêncio nunca seja confundida com «typecheck verde».*

> **Repositório oficial.** Este é o único repositório oficial de dsh-plugin-upgrade-rc1, mantido pela PerryLink. Repositórios com o mesmo nome em outras contas não são afiliados.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade-rc1.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![Node](https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-brightgreen.svg)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/PerryLink/dsh-plugin-upgrade-rc1/ci.yml?branch=main&label=CI)](https://github.com/PerryLink/dsh-plugin-upgrade-rc1/actions)
[![Version](https://img.shields.io/github/v/tag/PerryLink/dsh-plugin-upgrade-rc1?label=version)](https://github.com/PerryLink/dsh-plugin-upgrade-rc1/releases)
[![npm version](https://img.shields.io/npm/v/dsh-plugin-upgrade-rc1)](https://www.npmjs.com/package/dsh-plugin-upgrade-rc1)
[![npm downloads](https://img.shields.io/npm/dm/dsh-plugin-upgrade-rc1)](https://www.npmjs.com/package/dsh-plugin-upgrade-rc1)

[English](README.md) · [简体中文](README.zh.md) · [Español](README.es.md) · [Português](README.pt.md) · [हिन्दी](README.hi.md)

</div>

---

## Compatibilidade

| Superfície | Estado |
|---|---|
| Harness | DeepSeek Harness `0.1.5-rc.1` (tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`; início do corredor `dsh-v0.1.5-alpha.1` = `5dda764ed3aa`). Faixa de peers `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Plataformas | Onde o Node rodar; o scanner só usa o sistema de arquivos e é neutro em relação à plataforma |
| Modelo | Modelos somente texto totalmente suportados; a habilidade é um Markdown, sem exigência de ferramentas ou visão |
| Escopo | **Um único corredor**: `0.1.5-alpha.1` → `0.1.5-rc.1`. Não é um framework de migração geral. |
| Corredor irmão | `0.1.3-alpha.1` → `0.1.5-alpha.1` é o [`dsh-plugin-upgrade`](https://github.com/PerryLink/dsh-plugin-upgrade). Leia aquele cartão primeiro se a sua faixa de peers estiver abaixo de `0.1.5-alpha.1`; este pacote não recobre essas costuras. |

## O que você recebe

Duas metades, um único catálogo de costuras:

- **Uma habilidade de agente empacotada (`plugin-upgrade-015rc1`)** — o cartão do corredor e um ciclo de corrigir-e-verificar. O modelo só a carrega quando a tarefa precisa; o pacote não contribui com nenhum parágrafo de prompt de sistema nem registra ferramentas.
- **Uma CLI sem dependências (`dsh-plugin-upgrade-rc1-scan`)** — reporta fatos `file:line` de dez costuras (`C1`–`C5`, `H1`–`H4`, `P1`) relidas do intervalo de tags em 2026-09-10. Sai com `1` em qualquer achado de severidade error, então entra direto no CI.

O objetivo é o modo de falha que este corredor existe para matar: **a quebra deste salto é silenciosa.** O slot de cliente puro `conversation` foi removido sem alias, e `ctx.slots.inject()` só executa o callback quando a declaração existe — uma metade de cliente que ainda aponta para ele para de montar sem erro, sem linha de log e sem build quebrado. Duas classes de quebra sobrevivem a `typecheck` + `test`:

1. a linha de tipos está desatualizada, então o repositório compila contra o **catálogo antigo** de slots (costura `C3`);
2. os testes são simulados contra a forma antiga, então passam enquanto o host descarta a sua contribuição.

Medição honesta: a varredura deste pacote encontrou que as metades de cliente da família usam apenas **8** chaves de slot, e as 8 sobrevivem no rc.1 — para elas a quebra é **latente, não real**. Os plugins de cliente de terceiros que apontavam para a chave pura `conversation` são os que quebram, e quebram em silêncio.

## Início rápido

```sh
# 1. instale o bundle no seu perfil
dsh plugin --profile web add dsh-plugin-upgrade-rc1

# 2. confirme que a linha montou
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade-rc1'

# 3. escaneie o plugin que você vai atualizar
npx dsh-plugin-upgrade-rc1-scan --repo ../my-plugin
```

Depois peça ao agente para usar a habilidade `plugin-upgrade-015rc1`, ou conduza o ciclo você mesmo com o cartão em
`skills/plugin-upgrade-015rc1/references/v0.1.5-alpha.1-to-v0.1.5-rc.1.md`.

## Instalação e desinstalação

```sh
dsh plugin --profile web add dsh-plugin-upgrade-rc1            # do npm
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade-rc1#main"   # do código-fonte
dsh plugin --profile web remove dsh-plugin-upgrade-rc1         # desinstalar (reversível)
```

Instalar o bundle apenas registra uma habilidade; remover a linha remove a habilidade. A CLI é um alvo `npx` normal e não precisa de perfil.

## Configuração

Toda chave é opcional e fica no patch do perfil:

| Chave | Padrão | Significado |
|---|---|---|
| `enabled` | `true` | Registra a habilidade empacotada. Use `false` para manter a dependência montada porém silenciosa. |
| `skillName` | `plugin-upgrade-015rc1` | Diretório sob `skillsRoot` a registrar, e o nome exibido no catálogo. |
| `skillsRoot` | o `./skills` do próprio pacote | Onde vive `<skillName>/SKILL.md`. Aponte para o seu próprio cartão para reutilizar a infraestrutura. |
| `userInvocable` | `true` | Se uma pessoa pode invocar a habilidade pelo nome além do modelo. |

```yaml
- insert:
    - id: dsh-plugin-upgrade-rc1
      name: dsh-plugin-upgrade-rc1
      config:
        skillName: plugin-upgrade-015rc1
```

O plugin monta de forma ruidosa: um `SKILL.md` ausente, um corpo vazio ou um frontmatter sem `name` fazem a montagem falhar em vez de registrar uma habilidade vazia.

## Superfícies

**Habilidade** — `plugin-upgrade-015rc1` (invocável pelo modelo e por pessoas por padrão). Corpo: o ciclo de 6 passos. Referências: o cartão do corredor. Scripts: o detector, dentro do diretório da habilidade para que os caminhos relativos resolvam.

**CLI** — `dsh-plugin-upgrade-rc1-scan`:

```sh
dsh-plugin-upgrade-rc1-scan [--repo <path>] [--json <out.json>] [--seams C1,P1] [--quiet]
```

| Flag | Significado |
|---|---|
| `--repo <path>` | Repositório a escanear (padrão: diretório atual). |
| `--json <out.json>` | Também grava o relatório legível por máquina (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams C1,P1` | Restringe a costuras específicas. |
| `--quiet` | Suprime a renderização humana (combine com `--json`). |

Códigos de saída: `0` nenhum achado de severidade error · `1` ao menos um achado de severidade error · `2` uso ou falha do escaneamento. Um escaneamento limpo é necessário mas não suficiente — o critério de saída deste corredor é um smoke real no host **e** uma asserção em navegador real para a metade de cliente.

## As dez costuras

| Id | Severidade | O que mudou na linha `0.1.5-rc.1` |
|---|---|---|
| `C1` | error | O slot de cliente puro `conversation` foi removido e substituído por `main` + `main.conversation`, **sem alias**. `ctx.slots.inject()` só dispara quando a declaração existe, então um plugin que aponta para ele para de montar **em silêncio**. |
| `C2` | error | `@deepseek-ai/dsh-client-ui-sidebar-textpreview` virou `…-sidebar-documentpreview`; o nome antigo sumiu e não há pacote shim. |
| `C3` | error | Verde falso no lado cliente: tipos de dev/test fixados na linha `0.1.5-alpha.*`, ou um alias `paths` do `tsconfig` apontando para um diretório de checkout inexistente, fazem o TypeScript voltar ao catálogo antigo. |
| `C4` | warn | O rc.1 adicionou um modelo de painel principal global (`main`, `sidebar.panellist`, `ctx.layout.selectPanel(MainPanelId \| null)`) e acrescentou a prop padrão `usePanelInfo` a quase todos os slots. |
| `C5` | warn | A pré-visualização de documentos migrou para o slot com chave `sidebar.right.tab.document` (`DocumentContent`); `sidebar.right.pane.tab` sobrevive, mas sua entrada pai passou a ser `rightbar.session`. |
| `H1` | warn | `KNOWN_SESSION_EVENT_TYPES` ganhou `deliverables/presented` e `subagent/catalog`: o vocabulário fail-closed cresceu. |
| `H2` | warn | A linha da nova ferramenta `present` ocupa a chave `'present'` de `tool.call.toolview`, que no alpha.1 estava livre. |
| `H3` | info | Novas capacidades opcionais: `ctx.sessionFeedback`, `ctx.layout.beginNavigation()`, `ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`. Listadas no cartão; deliberadamente sem detecção automática. |
| `H4` | info | O catálogo consultivo padrão do adaptador DeepSeek agora começa com `deepseek-flash` (DeepSeek-V41-Flash). |
| `P1` | error | A faixa de peers deve manter o segundo segmento: `>=0.1.2-rc.1 <0.2.0` sozinho **rejeita** `0.1.5-rc.1` pela regra prerelease-tuple do npm semver (medido `false` no semver 7.8.5). |

`C4`, `C5`, `H1`, `H2` e `H4` são deliberadamente consultivas: têm correspondências legítimas (um repositório que já usa a API nova, um snapshot de documentação, a tabela de ids de modelo de um plugin), então o scanner as reporta como pistas para revisão manual, não como falhas.

## O que isto não cobre

- **O corredor anterior.** `0.1.3-alpha.1` → `0.1.5-alpha.1` é o `dsh-plugin-upgrade`. Leia o cartão dele primeiro se a sua faixa de peers estiver abaixo de `0.1.5-alpha.1`; este pacote não recobre essas costuras.
- **Costuras do formato de sessão.** `assistant/message.stream`, `SessionHandleReadResult`, `EpochHeader.system`, `ctx.agent`, `Inbox` e `SystemPrompt.persona` **não mudam** neste salto (todo o diff de `packages/core/session/src` são dois literais de tipo de evento acrescentados e uma linha de comentário), então repeti-las aqui seria deriva. Elas vivem no cartão irmão.
- **Linhas futuras.** `0.1.5-rc.1` → final e tudo depois ficam fora; o cartão é travado por versão de propósito, porque um cartão que deriva é pior do que nenhum cartão.
- **O caminho de atualização do usuário do DSH.** Este pacote atualiza *código-fonte de plugins*, não a instalação do harness de um usuário.
- **Tokens de tema.** `docs/web-styling.md` não tem nenhuma mudança neste intervalo.
- **Prova.** Um escaneamento limpo é uma hipótese. O critério de saída é um smoke real no host (`DSH_HOME` temporário, CLI rc.1, `plugin add <tarball>`, `--dump-config`) mais uma asserção em navegador real para cada achado do lado cliente.

## Limites de segurança

- **Escaneamento somente leitura.** A CLI nunca escreve dentro do repositório escaneado; `--json` grava apenas no caminho que você indicar.
- **Sem rede, sem shell.** O scanner não importa nada além da biblioteca padrão do Node e nunca inicia um processo.
- **Sem segredos.** Nada no pacote lê credenciais, tokens de ambiente ou dados de sessão.
- **Receita de smoke em sandbox.** A verificação de host real do cartão usa um `DSH_HOME` de `mkdtemp`; nunca toca o seu `~/.dsh` real.

## Desenvolvimento

```sh
npm install                        # ou: pnpm install (o repositório inclui pnpm-lock.yaml)
npm test                           # node --test: scanner, paridade cartão<->catálogo, Cordis + SkillRegistry reais
npm run verify:self-contained      # todo import resolve dentro do pacote
npm run verify:artifacts           # o tarball leva a habilidade, a CLI e o patch, e exclui os testes
npm run check:readmes              # consistência dos READMEs em cinco idiomas
npm pack
```

O scanner tem seus próprios fixtures sintéticos `fixtures/bad-repo` (com todas as costuras de erro de propósito) e `fixtures/good-repo` (adaptado), além de um negativo ao vivo em um repositório da família já fixado no `0.1.5-rc.1`, de modo que uma regressão no catálogo falha nesta suíte e não em um usuário. `test/card.test.mjs` afirma que o cartão e `lib/scan.mjs` nomeiam **exatamente** os mesmos ids de costura com as mesmas severidades — a regra de vinculação de evidência como portão de máquina.

## Tópicos

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (espelham as `keywords` do `package.json`; `dsh-plugin` é o canal de visibilidade do ecossistema).

## Família de plugins DSH da PerryLink

Parte da família de plugins DSH da PerryLink — mais de 40 repositórios cobrindo sessões, memória, permissões, entrega, observabilidade e ferramentas de desenvolvimento. Explore o catálogo em [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) ou no [tópico `dsh-plugin`](https://github.com/topics/dsh-plugin).

## Licença

Apache-2.0 — veja [LICENSE](LICENSE). As dependências de instalação e suas licenças estão em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); nada é empacotado.
