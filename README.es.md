<div align="center">

# ⬆️ dsh-plugin-upgrade-rc1
- **Canal de la tienda 1024**: ejecuta `npm i -g dsh1024` una vez y luego `dsh1024 plugin --profile web add dsh-plugin-upgrade-rc1` (cuenta para el ranking de instalaciones de [deepseek1024.com](https://deepseek1024.com)).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade-rc1)

**Habilidad de actualización de plugins para DeepSeek Harness, con versión bloqueada — `0.1.5-alpha.1` → `0.1.5-rc.1`.**

*Una tarjeta de corredor más un escáner de costuras sin dependencias, para que una mitad de cliente que dejó de montarse en silencio nunca se confunda con «typecheck en verde».*

> **Repositorio oficial.** Este es el único repositorio oficial de dsh-plugin-upgrade-rc1, mantenido por PerryLink. Los repositorios con el mismo nombre en otras cuentas no están afiliados.

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

## Compatibilidad

| Superficie | Estado |
|---|---|
| Harness | DeepSeek Harness `0.1.5-rc.1` (tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`; inicio del corredor `dsh-v0.1.5-alpha.1` = `5dda764ed3aa`). Banda de peers `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Plataformas | Donde corra Node; el escáner solo usa el sistema de archivos y es neutral respecto a la plataforma |
| Modelo | Modelos solo de texto totalmente soportados; la habilidad es un Markdown, sin requisitos de herramientas ni visión |
| Alcance | **Un solo corredor**: `0.1.5-alpha.1` → `0.1.5-rc.1`. No es un framework de migración general. |
| Corredor hermano | `0.1.3-alpha.1` → `0.1.5-alpha.1` es [`dsh-plugin-upgrade`](https://github.com/PerryLink/dsh-plugin-upgrade). Lee esa tarjeta primero si tu banda de peers está por debajo de `0.1.5-alpha.1`; este paquete no vuelve a cubrir esas costuras. |

## Lo que obtienes

Dos mitades, un solo catálogo de costuras:

- **Una habilidad de agente incluida (`plugin-upgrade-015rc1`)** — la tarjeta del corredor y un bucle de arreglar-y-verificar. El modelo la carga solo cuando una tarea la necesita; el paquete no aporta ningún párrafo al prompt del sistema ni registra herramientas.
- **Una CLI sin dependencias (`dsh-plugin-upgrade-rc1-scan`)** — informa hechos `file:line` de diez costuras (`C1`–`C5`, `H1`–`H4`, `P1`) releídas del rango de tags el 2026-09-10. Sale con `1` ante cualquier hallazgo de severidad error, así que entra directo en CI.

El objetivo es el modo de fallo que este corredor existe para matar: **la rotura de este salto es silenciosa.** El slot de cliente desnudo `conversation` se eliminó sin alias, y `ctx.slots.inject()` solo ejecuta su callback cuando la declaración existe: una mitad de cliente que aún lo apunta deja de montarse sin error, sin línea de log y sin build fallido. Dos clases de rotura sobreviven a `typecheck` + `test`:

1. la línea de tipos está desactualizada, así que el repo compila contra el **catálogo antiguo** de slots (costura `C3`);
2. las pruebas están simuladas contra la forma antigua, así que pasan mientras el host descarta tu contribución.

Medición honesta: el barrido de este paquete encontró que las mitades de cliente de la familia usan solo **8** claves de slot, y las 8 sobreviven en rc.1 — para ellas la rotura es **latente, no real**. Los plugins de cliente de terceros que apuntaban a la clave desnuda `conversation` son los que se rompen, y lo hacen en silencio.

## Inicio rápido

```sh
# 1. instala el bundle en tu perfil
dsh plugin --profile web add dsh-plugin-upgrade-rc1

# 2. verifica que la fila se montó
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade-rc1'

# 3. escanea el plugin que vas a actualizar
npx dsh-plugin-upgrade-rc1-scan --repo ../my-plugin
```

Luego pide al agente que use la habilidad `plugin-upgrade-015rc1`, o lleva el bucle tú mismo con la tarjeta en
`skills/plugin-upgrade-015rc1/references/v0.1.5-alpha.1-to-v0.1.5-rc.1.md`.

## Instalación y desinstalación

```sh
dsh plugin --profile web add dsh-plugin-upgrade-rc1            # desde npm
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade-rc1#main"   # desde el código
dsh plugin --profile web remove dsh-plugin-upgrade-rc1         # desinstalar (reversible)
```

Instalar el bundle solo registra una habilidad; quitar la fila quita la habilidad. La CLI es un destino `npx` normal y no necesita perfil.

## Configuración

Cada clave es opcional y vive en el patch del perfil:

| Clave | Por defecto | Significado |
|---|---|---|
| `enabled` | `true` | Registra la habilidad incluida. Pon `false` para mantener la dependencia montada pero en silencio. |
| `skillName` | `plugin-upgrade-015rc1` | Directorio bajo `skillsRoot` que se registra, y el nombre que aparece en el catálogo. |
| `skillsRoot` | el `./skills` del propio paquete | Dónde vive `<skillName>/SKILL.md`. Apúntalo a tu propia tarjeta para reutilizar la infraestructura. |
| `userInvocable` | `true` | Si una persona puede invocar la habilidad por nombre además del modelo. |

```yaml
- insert:
    - id: dsh-plugin-upgrade-rc1
      name: dsh-plugin-upgrade-rc1
      config:
        skillName: plugin-upgrade-015rc1
```

El plugin monta de forma ruidosa: un `SKILL.md` ausente, un cuerpo vacío o un frontmatter sin `name` hacen fallar el montaje en lugar de registrar una habilidad vacía.

## Superficies

**Habilidad** — `plugin-upgrade-015rc1` (invocable por el modelo y por personas por defecto). Cuerpo: el bucle de 6 pasos. Referencias: la tarjeta del corredor. Scripts: el detector, dentro del directorio de la habilidad para que las rutas relativas resuelvan.

**CLI** — `dsh-plugin-upgrade-rc1-scan`:

```sh
dsh-plugin-upgrade-rc1-scan [--repo <path>] [--json <out.json>] [--seams C1,P1] [--quiet]
```

| Bandera | Significado |
|---|---|
| `--repo <path>` | Repositorio a escanear (por defecto: el directorio actual). |
| `--json <out.json>` | También escribe el informe legible por máquina (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams C1,P1` | Restringe a costuras concretas. |
| `--quiet` | Suprime la salida humana (combínala con `--json`). |

Códigos de salida: `0` sin hallazgos de severidad error · `1` al menos un hallazgo de severidad error · `2` uso o fallo del escaneo. Un escaneo limpio es necesario pero no suficiente: el criterio de salida de este corredor es un smoke real en el host **y** una aserción en un navegador real para la mitad de cliente.

## Las diez costuras

| Id | Severidad | Qué cambió en la línea `0.1.5-rc.1` |
|---|---|---|
| `C1` | error | El slot de cliente desnudo `conversation` se eliminó y se sustituyó por `main` + `main.conversation`, **sin alias**. `ctx.slots.inject()` solo se dispara si la declaración existe, así que un plugin que lo apunta deja de montarse **en silencio**. |
| `C2` | error | `@deepseek-ai/dsh-client-ui-sidebar-textpreview` pasó a llamarse `…-sidebar-documentpreview`; el nombre antiguo desapareció y no hay paquete shim. |
| `C3` | error | Falso verde en el lado cliente: tipos de dev/test fijados en la línea `0.1.5-alpha.*`, o un alias `paths` de `tsconfig` apuntando a un directorio de checkout inexistente, hacen que TypeScript vuelva al catálogo antiguo. |
| `C4` | warn | rc.1 añadió un modelo de panel principal global (`main`, `sidebar.panellist`, `ctx.layout.selectPanel(MainPanelId \| null)`) y añadió la prop estándar `usePanelInfo` a casi todos los slots. |
| `C5` | warn | La vista previa de documentos se movió al slot con clave `sidebar.right.tab.document` (`DocumentContent`); `sidebar.right.pane.tab` sobrevive pero su entrada padre pasó a ser `rightbar.session`. |
| `H1` | warn | `KNOWN_SESSION_EVENT_TYPES` ganó `deliverables/presented` y `subagent/catalog`: el vocabulario fail-closed creció. |
| `H2` | warn | La fila de la nueva herramienta `present` ocupa la clave `'present'` de `tool.call.toolview`, que en alpha.1 estaba libre. |
| `H3` | info | Nuevas capacidades opcionales: `ctx.sessionFeedback`, `ctx.layout.beginNavigation()`, `ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`. Listadas en la tarjeta; deliberadamente sin detección automática. |
| `H4` | info | El catálogo asesor por defecto del adaptador DeepSeek ahora encabeza con `deepseek-flash` (DeepSeek-V41-Flash). |
| `P1` | error | La banda de peers debe conservar su segundo segmento: `>=0.1.2-rc.1 <0.2.0` por sí solo **rechaza** `0.1.5-rc.1` bajo la regla prerelease-tuple de npm semver (medido `false` en semver 7.8.5). |

`C4`, `C5`, `H1`, `H2` y `H4` son deliberadamente asesorables: tienen coincidencias legítimas (un repo que ya usa la API nueva, una instantánea de documentación, la tabla de ids de modelo de un plugin), así que el escáner las reporta como pistas para revisión manual, no como fallos.

## Lo que esto no cubre

- **El corredor anterior.** `0.1.3-alpha.1` → `0.1.5-alpha.1` es `dsh-plugin-upgrade`. Lee su tarjeta primero si tu banda de peers está por debajo de `0.1.5-alpha.1`; este paquete no vuelve a cubrir esas costuras.
- **Costuras del formato de sesión.** `assistant/message.stream`, `SessionHandleReadResult`, `EpochHeader.system`, `ctx.agent`, `Inbox` y `SystemPrompt.persona` **no cambian** en este salto (todo el diff de `packages/core/session/src` son dos literales de tipo de evento añadidos y una línea de comentario), así que repetirlas aquí sería deriva. Viven en la tarjeta hermana.
- **Líneas futuras.** `0.1.5-rc.1` → final y lo posterior quedan fuera; la tarjeta está bloqueada por versión a propósito, porque una tarjeta que deriva es peor que ninguna tarjeta.
- **La ruta de actualización del usuario de DSH.** Este paquete actualiza *código fuente de plugins*, no la instalación del harness de un usuario.
- **Tokens de tema.** `docs/web-styling.md` no tiene ningún cambio en este rango.
- **Prueba.** Un escaneo limpio es una hipótesis. El criterio de salida es un smoke real en el host ( `DSH_HOME` temporal, CLI rc.1, `plugin add <tarball>`, `--dump-config`) más una aserción en un navegador real para cada hallazgo del lado cliente.

## Límites de seguridad

- **Escaneo de solo lectura.** La CLI nunca escribe dentro del repositorio escaneado; `--json` escribe solo en la ruta que indiques.
- **Sin red, sin shell.** El escáner no importa nada fuera de la biblioteca estándar de Node y nunca lanza un proceso.
- **Sin secretos.** Nada en el paquete lee credenciales, tokens de entorno ni datos de sesión.
- **Receta de smoke en sandbox.** La comprobación de host real de la tarjeta usa un `DSH_HOME` de `mkdtemp`; nunca toca tu `~/.dsh` real.

## Desarrollo

```sh
npm install                        # o: pnpm install (el repo incluye pnpm-lock.yaml)
npm test                           # node --test: escáner, paridad tarjeta<->catálogo, Cordis + SkillRegistry reales
npm run verify:self-contained      # cada import resuelve dentro del paquete
npm run verify:artifacts           # el tarball lleva la habilidad, la CLI y el patch, y excluye las pruebas
npm run check:readmes              # consistencia de los README en cinco idiomas
npm pack
```

El escáner tiene sus propios fixtures sintéticos `fixtures/bad-repo` (con todas las costuras de error a propósito) y `fixtures/good-repo` (adaptado), más un negativo en vivo sobre un repositorio de la familia ya fijado a `0.1.5-rc.1`, de modo que una regresión del catálogo falla en esta suite y no en un usuario. `test/card.test.mjs` afirma que la tarjeta y `lib/scan.mjs` nombran **exactamente** los mismos ids de costura con las mismas severidades: la regla de vinculación de evidencia como puerta de máquina.

## Temas

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (reflejan las `keywords` de `package.json`; `dsh-plugin` es el canal de visibilidad del ecosistema).

## Familia de plugins DSH de PerryLink

Parte de la familia de plugins DSH de PerryLink: más de 40 repositorios que cubren sesiones, memoria, permisos, entrega, observabilidad y herramientas para desarrolladores. Explora el catálogo en [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) o el [tema `dsh-plugin`](https://github.com/topics/dsh-plugin).

## Licencia

Apache-2.0 — consulta [LICENSE](LICENSE). Las dependencias de instalación y sus licencias están en [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); no se incluye nada empaquetado.
