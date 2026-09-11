<div align="center">

# ⬆️ dsh-plugin-upgrade-0.1.3-0.1.5
- **Canal da loja 1024**: rode `npm i -g dsh1024` uma vez e depois `dsh1024 plugin --profile web add dsh-plugin-upgrade-0.1.3-0.1.5` (conta para o ranking de instalações do [deepseek1024.com](https://deepseek1024.com)).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade-0.1.3-0.1.5)

**Habilidade de atualização de plugins para o DeepSeek Harness, com versão travada e fundida — `0.1.3-alpha.1` → `0.1.5-rc.1`, carregada em duas pernas fechadas.**

*Perna A `0.1.3-alpha.1` → `0.1.5-alpha.1`, perna B `0.1.5-alpha.1` → `0.1.5-rc.1`: um cartão de corredor mais um scanner de costuras sem dependências sobre o catálogo fundido de 20 costuras, para que uma metade de cliente que parou de montar em silêncio nunca seja confundida com «typecheck verde».*

> **Repositório oficial.** Este é o único repositório oficial de dsh-plugin-upgrade-0.1.3-0.1.5, mantido pela PerryLink. Ele substitui os dois pacotes com versão travada `dsh-plugin-upgrade` (perna A) e `dsh-plugin-upgrade-rc1` (perna B). Repositórios com o mesmo nome em outras contas não são afiliados.

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

## Compatibilidade

| Superfície | Estado |
|---|---|
| Harness | DeepSeek Harness `0.1.5-rc.1` (tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`; passagem da perna A→B `dsh-v0.1.5-alpha.1` = `5dda764ed3aa`; início do corredor `0.1.3-alpha.1`). Faixa de peers `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Plataformas | Onde o Node rodar; o scanner só usa o sistema de arquivos e é neutro em relação à plataforma |
| Modelo | Modelos somente texto totalmente suportados; a habilidade é um Markdown, sem exigência de ferramentas ou visão |
| Escopo | **Duas pernas fechadas, um único intervalo**: perna A `0.1.3-alpha.1` → `0.1.5-alpha.1` mais perna B `0.1.5-alpha.1` → `0.1.5-rc.1`. Um corredor nunca se alarga: um salto depois de `0.1.5-rc.1` é um novo pacote. |
| Pernas | As duas pernas vivem neste pacote: a perna A mantém as costuras `S1`–`S10` + `M1`, a perna B mantém `C1`, `C2`, `C4`, `C5`, `H1`–`H4`, `P1` — cada uma com suas próprias evidências, seção de cartão, fixtures e caminho de rollback. Não há pacote irmão a instalar. |
| `C3` | Aposentada: o cartão da perna B chamava de `C3` o verde falso da linha de tipos desatualizada, que é o mesmo defeito da `M1` da perna A. A fusão está registrada no cartão; `--seams C3` não corresponde a nada. |

## O que você recebe

Duas metades, um único catálogo de costuras:

- **Uma habilidade de agente empacotada (`plugin-upgrade-015`)** — o cartão do corredor fundido e um ciclo de corrigir-e-verificar. O corpo primeiro encaminha quem chama para a perna que corresponde à sua faixa de peers; o modelo só a carrega quando uma tarefa realmente precisa dela, e o pacote não contribui com nenhum parágrafo de prompt de sistema nem com nenhuma ferramenta.
- **Uma CLI sem dependências (`dsh-plugin-upgrade-015-scan`)** — reporta fatos `file:line` das vinte costuras fundidas (`S3`, `S8`, `S9`, `M1`, `S4`, `S5`, `S6`, `S7`, `S2`, `S1`, `S10`, `C1`, `C2`, `P1`, `C4`, `C5`, `H1`, `H2`, `H4`, `H3`) relidas dos intervalos de tags do harness em 2026-09-09 (perna A) e 2026-09-10 (perna B). Sai com `1` em qualquer achado de severidade error, então entra direto no CI.

O objetivo é o modo de falha que este corredor existe para matar: **a quebra deste intervalo é em grande parte silenciosa, pelas duas pontas.** A linha de tipos pode estar desatualizada, então o repositório compila contra o **catálogo antigo** (costura `M1`), e o slot de cliente puro `conversation` foi removido sem alias enquanto `ctx.slots.inject()` só executa o callback quando a declaração existe — então uma metade de cliente que ainda aponta para ele para de montar sem erro, sem linha de log e sem build quebrado (costura `C1`). Três classes de quebra sobrevivem a `typecheck` + `test`:

1. o portão local compila uma linha de tipos desatualizada — alias `paths` antigo, ou tipos de dev/test fixados em `0.1.5-alpha.*` (costura `M1`);
2. um escritor de log omite o campo `stream` exigido pelo V3, então a sessão é importada e depois se recusa a retomar (costura `S3`);
3. os testes são simulados contra a forma antiga, então passam enquanto o host descarta a contribuição (costura `C1`).

Medição honesta: a varredura do workspace da perna B encontrou que as metades de cliente da família usam apenas **8** chaves de slot, e todas as 8 sobrevivem no rc.1 — para elas a quebra do rc.1 é **latente, não real**. Os plugins de cliente de terceiros que apontavam para a chave pura `conversation` são os que quebram, e quebram em silêncio. A varredura da perna A encontrou a textura oposta: 40 repositórios, 11 deles atingidos por `M1`, e corrigir o caminho desatualizado expôs erros reais de TypeScript em 3 repositórios que antes estavam «verdes».

## Início rápido

```sh
# 1. instale o bundle no seu perfil
dsh plugin --profile web add dsh-plugin-upgrade-0.1.3-0.1.5

# 2. confirme que a linha montou
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade-0.1.3-0.1.5'

# 3. escaneie o plugin que você vai atualizar
npx dsh-plugin-upgrade-015-scan --repo ../my-plugin
```

Depois peça ao agente para usar a habilidade `plugin-upgrade-015`, ou conduza o ciclo você mesmo com o cartão em
`skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md` (a perna A é a §1, a perna B é a §2, o índice fundido de costuras é a §3).

## Instalação e desinstalação

```sh
dsh plugin --profile web add dsh-plugin-upgrade-0.1.3-0.1.5            # do npm
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5#main"   # do código-fonte
dsh plugin --profile web remove dsh-plugin-upgrade-0.1.3-0.1.5         # desinstalar (reversível)
```

Instalar o bundle apenas registra uma habilidade; remover a linha remove a habilidade. A CLI é um alvo `npx` normal e não precisa de perfil algum.

## Configuração

Toda chave é opcional e fica no patch do perfil:

| Chave | Padrão | Significado |
|---|---|---|
| `enabled` | `true` | Registra a habilidade empacotada. Use `false` para manter a dependência montada porém silenciosa. |
| `skillName` | `plugin-upgrade-015` | Diretório sob `skillsRoot` a registrar, e o nome exibido no catálogo. |
| `skillsRoot` | o `./skills` do próprio pacote | Onde vive `<skillName>/SKILL.md`. Aponte para o seu próprio cartão para reutilizar a infraestrutura. |
| `userInvocable` | `true` | Se uma pessoa pode invocar a habilidade pelo nome além do modelo. |

```yaml
- insert:
    - id: dsh-plugin-upgrade-0.1.3-0.1.5
      name: dsh-plugin-upgrade-0.1.3-0.1.5
      config:
        skillName: plugin-upgrade-015
```

O plugin monta de forma ruidosa: um `SKILL.md` ausente, um corpo vazio ou um frontmatter sem `name` fazem a montagem falhar em vez de registrar uma habilidade vazia.

## Superfícies

**Habilidade** — `plugin-upgrade-015` (invocável pelo modelo e por pessoas por padrão). Corpo: tabela de encaminhamento por perna, as 8 regras rígidas e o ciclo de 6 passos. Referências: o cartão do corredor fundido. Scripts: o detector, enviado dentro do diretório da habilidade para que os caminhos relativos resolvam.

**CLI** — `dsh-plugin-upgrade-015-scan`:

```sh
dsh-plugin-upgrade-015-scan [--repo <path>] [--json <out.json>] [--seams S3,C1,P1] [--quiet]
```

| Flag | Significado |
|---|---|
| `--repo <path>` | Repositório a escanear (padrão: diretório atual). |
| `--json <out.json>` | Também grava o relatório legível por máquina (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams S3,C1,P1` | Restringe a costuras específicas do catálogo fundido. |
| `--quiet` | Suprime a renderização humana (combine com `--json`). |

Códigos de saída: `0` nenhum achado de severidade error · `1` ao menos um achado de severidade error · `2` uso ou falha do escaneamento. Um escaneamento limpo é necessário mas não suficiente — o critério de saída é um smoke real no host, mais uma ida-e-volta de retomada para escritores de log (perna A) e uma asserção em navegador real para a metade de cliente (perna B).

## As vinte costuras

A ordem segue o catálogo em `lib/scan.mjs` (perna A primeiro, depois perna B), que também é a ordem à qual `test/card.test.mjs` fixa o cartão.

| Id | Severidade | O que mudou no caminho até `0.1.5-rc.1` |
|---|---|---|
| `S3` | error | `assistant/message` ganhou um campo `stream` obrigatório (formato de sessão V3): um log escrito sem ele é importado com sucesso e depois se recusa a retomar (`Session.fromRestore` lança `invalid settlement fields`). |
| `S8` | error | `SessionHandle.read()` retorna `SessionHandleReadResult` (`{ eventState, events }`) em vez do array de eventos; operações de array precisam desembrulhar `.events`. |
| `S9` | error | A configuração de `SystemPrompt` renomeou `persona` → `personaPrefix` / `personaSuffix`. Substituir por `includeHarnessIdentity: false` **não** é equivalente — isso apaga o bloco de identidade do harness. |
| `M1` | error | O portão local compila uma linha de tipos desatualizada: tipos de dev/test fixados em `0.1.5-alpha.*`, ou um alias `paths` do `tsconfig` resolvendo para um diretório de checkout inexistente, fazem o TypeScript cair em silêncio nos tipos publicados. Portão verde, régua errada. |
| `S4` | error | `tool/code-dispatch` foi renomeado para `tool/ptc-dispatch`; o rótulo antigo não é mais reconhecido em sessões V3. |
| `S5` | error | `ctx.agent` foi removido: quem chama deve passar o Agent explicitamente (por exemplo, o segundo parâmetro de `setup(agentCtx, agent)`). |
| `S6` | error | `Inbox` é uma interface de tipo, não uma classe construível; as fixtures usam a forma oficial não suportada e o código de runtime lê `agent.inbox`. |
| `S7` | warn | `SubprocessHandle.pid` foi removido (só resta `SubprocessTerminalHandle.pid`); remova o campo das fixtures de teste. |
| `S2` | warn | `EpochHeader.system` foi removido: o prompt de sistema agora é o `system/message` do nó de superfície 0. |
| `S1` | warn | Formato de sessão V3 e nomes de log com sufixo de geração — a geração atual é `session.v3.jsonl.zstd`, então scripts que fixam `session.jsonl.zstd` falham em silêncio. |
| `S10` | warn | Eventos de sessão escritos por plugins precisam passar pelo portão de adaptação fail-closed do host: `Session.append` não tem canal de escrita `ignorable`, então um append incondicional pode tornar uma sessão ilegível. |
| `C1` | error | O slot de cliente puro `conversation` foi removido e substituído por `main` + `main.conversation`, **sem alias**. `ctx.slots.inject()` só dispara quando a declaração existe, então um plugin que aponta para ele para de montar **em silêncio**. |
| `C2` | error | `@deepseek-ai/dsh-client-ui-sidebar-textpreview` virou `…-sidebar-documentpreview`; o nome antigo sumiu e não há pacote shim. |
| `P1` | error | A faixa de peers deve manter o segundo segmento: `>=0.1.2-rc.1 <0.2.0` sozinho **rejeita** `0.1.5-rc.1` pela regra prerelease-tuple do npm semver (medido `false` no semver 7.8.5). |
| `C4` | warn | O rc.1 adicionou um modelo de painel principal global (`main`, `sidebar.panellist`, `ctx.layout.selectPanel(MainPanelId \| null)`) e acrescentou a prop padrão `usePanelInfo` a quase todos os slots. |
| `C5` | warn | A pré-visualização de documentos migrou para o slot com chave `sidebar.right.tab.document` (`DocumentContent`); `sidebar.right.pane.tab` sobrevive, mas sua entrada pai passou a ser `rightbar.session`. |
| `H1` | warn | `KNOWN_SESSION_EVENT_TYPES` ganhou `deliverables/presented` e `subagent/catalog`: o vocabulário fail-closed cresceu. |
| `H2` | warn | A linha da nova ferramenta `present` ocupa a chave `'present'` de `tool.call.toolview`, que no alpha.1 estava livre. |
| `H4` | info | O catálogo consultivo padrão do adaptador DeepSeek agora começa com `deepseek-flash` (DeepSeek-V41-Flash). |
| `H3` | info | Novas capacidades opcionais: `ctx.sessionFeedback`, `ctx.layout.beginNavigation()`, `ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`. Listadas no cartão; deliberadamente sem detecção automática. |

`S7`, `S2`, `S1`, `S10`, `C4`, `C5`, `H1`, `H2` e `H4` são deliberadamente consultivas: têm correspondências legítimas (um repositório que já usa a API nova, um snapshot de documentação, a tabela de ids de modelo de um plugin, um `ChildProcess.pid` do Node), então o scanner as reporta como pistas para revisão manual, não como falhas. `M1` e `P1` são verificações **estruturadas** — resolvem `package.json` e `tsconfig*.json` em vez de casar texto — e `H3` é **somente-cartão**: documentada, com paridade de id verificada e deliberadamente sem detector (`CARD_ONLY = ['H3']`).

## O que isto não cobre

- **Um salto depois de `0.1.5-rc.1`.** O intervalo fundido termina no rc.1 por construção: o salto do harness `0.1.5-rc.1` → `0.1.5-rc.2` não acrescentou nenhuma costura voltada a plugins (o pin de dev/test deste próprio pacote e a sonda de CI rodam na linha `0.1.5-rc.2`, para que o catálogo seja verificado contra os tipos publicados mais recentes). Qualquer coisa que acrescente uma costura depois é um **novo pacote** — um cartão que deriva é pior do que nenhum cartão.
- **O salto `0.1.1` → `0.1.2`.** Use a habilidade de convergência da comunidade.
- **Repetir costuras entre pernas.** A perna A é dona das costuras do formato de sessão (`assistant/message.stream`, `SessionHandleReadResult`, `EpochHeader.system`, `ctx.agent`, `Inbox`, `SystemPrompt.persona`, a geração de log V3) e a perna B não as repete — todo o diff de `packages/core/session/src` no intervalo da perna B são dois literais de tipo de evento acrescentados e uma linha de comentário. A seção de cartão de cada perna mantém sua própria declaração de escopo.
- **O caminho de atualização do usuário do DSH.** Este pacote atualiza *código-fonte de plugins*, não a instalação do harness de um usuário.
- **Tokens de tema.** `docs/web-styling.md` não tem nenhuma mudança no intervalo da perna B.
- **Prova.** Um escaneamento limpo é uma hipótese. O critério de saída é um smoke real no host (`DSH_HOME` temporário, CLI alvo, `plugin add <tarball>`, `--dump-config`) mais uma ida-e-volta de retomada para escritores de log de sessão (perna A) e uma asserção em navegador real para cada achado do lado cliente (perna B).

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

O scanner tem um par de fixtures sintéticas **por perna**: `fixtures/leg-a-bad-repo` (as costuras de sessão/config da perna A, com toda costura de erro presente de propósito) com `fixtures/leg-a-good-repo` (adaptado), e `fixtures/bad-repo` (as costuras de slot de cliente da perna B) com `fixtures/good-repo` (adaptado) — além de um negativo ao vivo em um repositório da família já fixado no `0.1.5-rc.1`, de modo que uma regressão no catálogo falha nesta suíte e não em um usuário a jusante. `test/card.test.mjs` afirma que o índice do cartão fundido e `lib/scan.mjs` nomeiam **exatamente** os mesmos vinte ids de costura com as mesmas severidades, e que `CARD_ONLY` é exatamente `['H3']` — a regra de vinculação de evidência como portão de máquina.

## Tópicos

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (espelham as `keywords` do `package.json`; `dsh-plugin` é o canal de visibilidade do ecossistema).

## Família de plugins DSH da PerryLink

Parte da família de plugins DSH da PerryLink — mais de 40 repositórios cobrindo sessões, memória, permissões, entrega, observabilidade e ferramentas de desenvolvimento. Explore o catálogo em [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) ou no [tópico `dsh-plugin`](https://github.com/topics/dsh-plugin).

## Licença

Apache-2.0 — veja [LICENSE](LICENSE). As dependências de instalação e suas licenças estão em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); nada é empacotado.
