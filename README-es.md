<div align="center">

# ⬆️ dsh-plugin-upgrade
- **Canal de la tienda 1024**: ejecuta `npm i -g dsh1024` una vez y luego `dsh1024 plugin --profile web add dsh-plugin-upgrade` (cuenta para el ranking de instalaciones de [deepseek1024.com](https://deepseek1024.com)).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade)
[![dshfind](https://dshfind.com/api/badge/PerryLink/dsh-plugin-upgrade?metric=downloads&lang=es)](https://dshfind.com/es/plugins/PerryLink/dsh-plugin-upgrade?ref=badge)

**Habilidad de actualización de plugins para DeepSeek Harness — un paquete, un índice de corredores, dos corredores cerrados: `0.1.3-alpha.1` → `0.1.5-rc.1` (`legAB`) y `0.1.5-rc.2` → `0.1.6-alpha.2` (`legC`).**

*El escáner se enruta solo: lee la banda dsh declarada por el repositorio destino (o toma `--span`) y luego aplica el catálogo propio de ese corredor, vinculado a evidencia — las 20 costuras de `legAB` (tramo A `0.1.3-alpha.1` → `0.1.5-alpha.1` más tramo B `0.1.5-alpha.1` → `0.1.5-rc.1`) o las 5 costuras de `legC` (`E1`–`E5`). Un solo punto de entrada, para que una mitad de cliente que dejó de montarse en silencio nunca se confunda con «typecheck en verde».*

> **Repositorio oficial.** Este es el único repositorio oficial de dsh-plugin-upgrade, mantenido por PerryLink. Sustituye a los dos paquetes retirados con versión bloqueada `dsh-plugin-upgrade` (tramo A) y `dsh-plugin-upgrade-rc1` (tramo B), y es el paquete en el que se integró el corredor `0.1.5-rc.2` → `0.1.6-alpha.2` (tramo C): el nombre `dsh-plugin-upgrade-016` nunca llegó al registro. Los repositorios con el mismo nombre en otras cuentas no están afiliados. **Tanto `dsh-plugin-upgrade-015` como `dsh-plugin-upgrade-016` quedaron retirados el 2026-10-05 y no reciben más correcciones, versiones ni actualizaciones de seguridad**; toda actualización de plugins continúa aquí, y el corredor lo decide la versión que el propio repositorio destino declara, por lo que ya no hace falta un paquete con versión bloqueada por cada salto del host.

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


**📖 Base de conocimiento del ecosistema** — datos medidos, no marketing: [guía de desarrollo · datos de selección · criterios de mantenimiento](https://perrylink.github.io/dsh-plugin-guide/).

<!-- star-cta -->
## Instalación y desinstalación

```sh
dsh plugin --profile web add dsh-plugin-upgrade            # desde npm
dsh plugin --profile web add github:PerryLink/dsh-plugin-upgrade   # desde el código
dsh plugin --profile web remove dsh-plugin-upgrade         # desinstalar (reversible)
```

Instalar el bundle solo registra una habilidad; quitar la fila quita la habilidad. La CLI es un destino `npx` normal y no necesita perfil.

## ⭐ 如果它帮到了你

Este plugin forma parte de la [familia de plugins DSH](https://github.com/PerryLink) (más de 40, todos Apache-2.0). Si te resulta útil, **dale una estrella**: no desbloquea nada, pero ayuda a que la siguiente persona lo encuentre antes.

*English:* part of a 40+ plugin family for DeepSeek Harness. If it is useful, **a star helps the next person find it** — nothing is gated behind it.

## What is dsh-plugin-upgrade?

Habilidad de actualización de plugins para DeepSeek Harness — un paquete, un índice de corredores, dos corredores cerrados: `0.1.3-alpha.1` → `0.1.5-rc.1` (`legAB`) y `0.1.5-rc.2` → `0.1.6-alpha.2` (`legC`).

El escáner se enruta solo: lee la banda dsh declarada por el repositorio destino (o toma `--span`) y luego aplica el catálogo propio de ese corredor, vinculado a evidencia — las 20 costuras de `legAB` (tramo A `0.1.3-alpha.1` → `0.1.5-alpha.1` más tramo B `0.1.5-alpha.1` → `0.1.5-rc.1`) o las 5 costuras de `legC` (`E1`–`E5`). Un solo punto de entrada, para que una mitad de cliente que dejó de montarse en silencio nunca se confunda con «typecheck en verde».

![Demostración de terminal de dsh-plugin-upgrade: dsh-plugin-upgrade — corridor scan of a sibling plugin repo](https://raw.githubusercontent.com/PerryLink/dsh-plugin-upgrade/main/docs/assets/dsh-plugin-upgrade-hero.png)

![Animated terminal demo of dsh-plugin-upgrade](https://raw.githubusercontent.com/PerryLink/dsh-plugin-upgrade/main/docs/assets/dsh-plugin-upgrade-demo.gif)

*La misma ejecución, animada.*

## Comparison

![Gráfico comparativo medido de dsh-plugin-upgrade](https://raw.githubusercontent.com/PerryLink/dsh-plugin-upgrade/main/docs/assets/dsh-plugin-upgrade-evidence.png)

40 family repos swept · README §What you get (leg A, 2026-09-09)

## Compatibilidad

| Superficie | Estado |
|---|---|
| Harness | DeepSeek Harness `dsh-v0.2.1-alpha.1` (línea actual; pins de dev/test `0.2.1-alpha.1`). El índice de corredores está ligado a la evidencia de los tramos que midió: `legAB` = `0.1.3-alpha.1 → 0.1.5-rc.1` (tag `dsh-v0.1.7-alpha.2` = `183f08e9c6dd`; relevo tramo A→B `dsh-v0.1.7-alpha.2` = `5dda764ed3aa`) y `legC` = `0.1.5-rc.2 → 0.1.6-alpha.2` (tag `dsh-v0.1.7-alpha.2`). Banda de peers `@deepseek-ai/dsh-skill >=0.1.6-0 <0.2.0 \|\| >=0.2.0-0 <0.3.0 \|\| >=0.2.1-0 <0.3.0`, `@deepseek-ai/cordis ^4.0.5-alpha.1`, `@deepseek-ai/schemastery ^3.18.5-alpha.1`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Plataformas | Donde corra Node; el escáner solo usa el sistema de archivos y es neutral respecto a la plataforma |
| Modelo | Modelos solo de texto totalmente soportados; la habilidad es un Markdown, sin requisitos de herramientas ni visión |
| Índice de corredores | Un paquete, un punto de entrada. `lib/route.mjs` contiene los corredores cerrados y la CLI enruta al que corresponde según la banda declarada del repo destino (`engines.dsh`, los rangos `@deepseek-ai/dsh*`); `--span legAB\|legC` anula la conjetura y una banda no declarada recae en el corredor más antiguo. Los dos catálogos nunca se fusionan: cada corredor conserva su propio array de costuras, tarjeta, evidencia, fixtures y puerta de paridad. |
| Alcance | **Dos corredores cerrados**: `legAB` = `0.1.3-alpha.1` → `0.1.5-rc.1` (tramo A + tramo B), `legC` = `0.1.5-rc.2` → `0.1.6-alpha.2`. Un corredor nunca se ensancha: un salto que añade una costura es un corredor nuevo — una tarjeta nueva y una fila nueva en el índice, no un paquete nuevo. |
| Tramos | Cada tramo vive en este paquete: el tramo A conserva las costuras `S1`–`S10` + `M1`, el tramo B conserva `C1`, `C2`, `C4`, `C5`, `H1`–`H4`, `P1`, y el tramo C conserva `E1`–`E5` — cada uno con su propia evidencia, sección de tarjeta, fixtures y ruta de reversión. No hay paquete hermano que instalar. |
| `C3` | Retirada: la tarjeta del tramo B escribía como `C3` el falso verde de la línea de tipos obsoleta, que es el mismo defecto que el `M1` del tramo A. La fusión queda registrada en la tarjeta; `--seams C3` no coincide con nada. |
| Paquete anterior | No montes el retirado `dsh-plugin-upgrade` en el mismo perfil: ambos registran la skill `plugin-upgrade`, así que el segundo montaje colisiona con ese nombre. Ese paquete está obsoleto en npm y su repositorio se retiró; este paquete sustituye sus dos tramos. |

## Lo que obtienes

Dos mitades, un catálogo de costuras por corredor:

- **Una habilidad de agente incluida (`plugin-upgrade`)** — la tarjeta del corredor fusionado y un bucle de arreglar-y-verificar. El cuerpo primero enruta a quien la llama al tramo que corresponde a su banda de peers; el modelo la carga solo cuando una tarea la necesita de verdad, y el paquete no aporta ningún párrafo al prompt del sistema ni registra herramientas.
- **Una CLI sin dependencias (`dsh-plugin-upgrade-scan`)** — resuelve el corredor e informa hechos `file:line` de las costuras de ese corredor: las veinte de `legAB` (`S3`, `S8`, `S9`, `M1`, `S4`, `S5`, `S6`, `S7`, `S2`, `S1`, `S10`, `C1`, `C2`, `P1`, `C4`, `C5`, `H1`, `H2`, `H4`, `H3`) releídas de los rangos de tags del harness el 2026-09-09 (tramo A) y el 2026-09-10 (tramo B), o las cinco de `legC` (`E1`–`E5`) medidas en `dsh-v0.1.7-alpha.1` (2026-09-19). Sale con `1` ante cualquier hallazgo de severidad error, así que entra directo en CI.

El objetivo es el modo de fallo que este corredor existe para matar: **la rotura de este lapso es mayormente silenciosa, y lo es por ambos extremos.** La línea de tipos puede estar obsoleta, así que el repo compila contra el **catálogo antiguo** (costura `M1`), y el slot de cliente desnudo `conversation` se eliminó sin alias mientras `ctx.slots.inject()` solo ejecuta su callback cuando la declaración existe: una mitad de cliente que aún lo apunta deja de montarse sin error, sin línea de log y sin build fallido (costura `C1`). Tres clases de rotura sobreviven a `typecheck` + `test`:

1. la puerta local compila una línea de tipos obsoleta — un alias `paths` antiguo, o tipos de dev/test fijados en `0.1.5-alpha.*` (costura `M1`);
2. un escritor de logs omite el campo `stream` obligatorio de V3, así que la sesión se importa y luego se niega a reanudarse (costura `S3`);
3. las pruebas están simuladas contra la forma antigua, así que pasan mientras el host descarta tu contribución (costura `C1`).

Medición honesta: el barrido del espacio de trabajo del tramo B encontró que las mitades de cliente de la familia usan solo **8** claves de slot, y las 8 sobreviven en rc.1 — para ellas la rotura de rc.1 es **latente, no real**. Los plugins de cliente de terceros que apuntaban a la clave desnuda `conversation` son los que se rompen, y lo hacen en silencio. El barrido del tramo A encontró la textura opuesta: 40 repos, 11 de ellos dieron con `M1`, y arreglar la ruta obsoleta destapó errores reales de TypeScript en 3 repos que antes estaban «en verde».

## Inicio rápido

```sh
dsh plugin --profile web add github:PerryLink/dsh-plugin-upgrade
```

```sh
# 1. instala el bundle en tu perfil
dsh plugin --profile web add dsh-plugin-upgrade

# 2. verifica que la fila se montó
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade'

# 3. escanea el plugin que vas a actualizar
npx dsh-plugin-upgrade-scan --repo ../my-plugin
```

Luego pide al agente que use la habilidad `plugin-upgrade`, o lleva el bucle tú mismo con la tarjeta que corresponda a tu banda:
`skills/plugin-upgrade/references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md` (`legAB` — el tramo A es §1, el tramo B es §2, el índice de costuras fusionado es §3) o `skills/plugin-upgrade/references/v0.1.5-rc.2-to-v0.1.6-alpha.2.md` (`legC`). El escáner elige el corredor por ti; añade `--span legC` cuando la banda declarada sea ambigua.

## Configuración

Cada clave es opcional y vive en el patch del perfil:

| Clave | Por defecto | Significado |
|---|---|---|
| `enabled` | `true` | Registra la habilidad incluida. Pon `false` para mantener la dependencia montada pero en silencio. |
| `skillName` | `plugin-upgrade` | Directorio bajo `skillsRoot` que se registra, y el nombre que aparece en el catálogo. |
| `skillsRoot` | el `./skills` del propio paquete | Dónde vive `<skillName>/SKILL.md`. Apúntalo a tu propia tarjeta para reutilizar la infraestructura. |
| `userInvocable` | `true` | Si una persona puede invocar la habilidad por nombre además del modelo. |

```yaml
- insert:
    - id: dsh-plugin-upgrade
      name: dsh-plugin-upgrade
      config:
        skillName: plugin-upgrade
```

El plugin monta de forma ruidosa: un `SKILL.md` ausente, un cuerpo vacío o un frontmatter sin `name` hacen fallar el montaje en lugar de registrar una habilidad vacía.

## Superficies

**Habilidad** — `plugin-upgrade` (invocable por el modelo y por personas por defecto). Cuerpo: la tabla de enrutado por tramo, las 8 reglas duras y el bucle de 6 pasos. Referencias: la tarjeta del corredor fusionado. Scripts: el detector, dentro del directorio de la habilidad para que las rutas relativas resuelvan.

**CLI** — `dsh-plugin-upgrade-scan`:

```sh
dsh-plugin-upgrade-scan [--repo <path>] [--span legAB|legC|<span>] [--json <out.json>] [--seams S3,C1,P1] [--quiet]
```

| Bandera | Significado |
|---|---|
| `--repo <path>` | Repositorio a escanear (por defecto: el directorio actual). Su banda dsh declarada elige el corredor. |
| `--span legAB\|legC\|<span>` | Fuerza un corredor en lugar de conjeturarlo desde la banda declarada. Una banda desconocida recae en `legAB`. |
| `--json <out.json>` | También escribe el informe legible por máquina (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams S3,C1,P1` | Restringe a costuras concretas del catálogo del corredor resuelto (los ids nunca se comparten entre corredores). |
| `--quiet` | Suprime la salida humana (combínala con `--json`). |

Códigos de salida: `0` sin hallazgos de severidad error · `1` al menos un hallazgo de severidad error · `2` uso o fallo del escaneo. Un escaneo limpio es necesario pero no suficiente: el criterio de salida es un smoke real en el host, más un ida y vuelta de reanudación para los escritores de logs (tramo A) y una aserción en un navegador real para la mitad de cliente (tramo B).

## Las veinte costuras de `legAB`

El orden sigue el catálogo de `lib/scan.mjs` (primero el tramo A, luego el tramo B), que es también el orden al que `test/card.test.mjs` fija la tarjeta.

| Id | Severidad | Qué cambió en el camino a `0.1.5-rc.1` |
|---|---|---|
| `S3` | error | `assistant/message` ganó un campo `stream` obligatorio (formato de sesión V3): un log escrito sin él se importa con éxito y luego se niega a reanudarse (`Session.fromRestore` lanza `invalid settlement fields`). |
| `S8` | error | `SessionHandle.read()` devuelve `SessionHandleReadResult` (`{ eventState, events }`) en lugar del array de eventos; las operaciones de array deben desenvolver `.events`. |
| `S9` | error | La configuración de `SystemPrompt` renombró `persona` → `personaPrefix` / `personaSuffix`. Sustituirlo por `includeHarnessIdentity: false` **no** es equivalente: elimina el bloque de identidad del harness. |
| `M1` | error | La puerta local compila una línea de tipos obsoleta: tipos de dev/test fijados en `0.1.5-alpha.*`, o un alias `paths` de `tsconfig` que resuelve a un directorio de checkout inexistente, hacen que TypeScript vuelva en silencio a los tipos publicados. Puerta en verde, regla equivocada. |
| `S4` | error | `tool/code-dispatch` pasó a llamarse `tool/ptc-dispatch`; la etiqueta antigua ya no se reconoce en las sesiones V3. |
| `S5` | error | `ctx.agent` se eliminó: quien llama debe pasar el Agent explícitamente (por ejemplo, el segundo parámetro de `setup(agentCtx, agent)`). |
| `S6` | error | `Inbox` es una interfaz de tipo, no una clase construible; los fixtures usan la forma oficial no soportada y el código en tiempo de ejecución lee `agent.inbox`. |
| `S7` | warn | `SubprocessHandle.pid` se eliminó (solo queda `SubprocessTerminalHandle.pid`); quita el campo de los fixtures de prueba. |
| `S2` | warn | `EpochHeader.system` se eliminó: el prompt del sistema es ahora el `system/message` del nodo 0 de la superficie. |
| `S1` | warn | Formato de sesión V3 y nombres de log con sufijo de generación: la generación actual es `session.v3.jsonl.zstd`, así que los scripts que fijan `session.jsonl.zstd` fallan en silencio. |
| `S10` | warn | Los eventos de sesión escritos por un plugin deben pasar por la puerta de adaptación fail-closed del host: `Session.append` no tiene canal de escritura `ignorable`, así que un append incondicional puede dejar una sesión ilegible. |
| `C1` | error | El slot de cliente desnudo `conversation` se eliminó y se sustituyó por `main` + `main.conversation`, **sin alias**. `ctx.slots.inject()` solo se dispara si la declaración existe, así que un plugin que lo apunta deja de montarse **en silencio**. |
| `C2` | error | `@deepseek-ai/dsh-client-ui-sidebar-textpreview` pasó a llamarse `…-sidebar-documentpreview`; el nombre antiguo desapareció y no hay paquete shim. |
| `P1` | error | La banda de peers debe conservar su segundo segmento: `>=0.1.2-rc.1 <0.2.0` por sí solo **rechaza** `0.1.5-rc.1` bajo la regla prerelease-tuple de npm semver (medido `false` en semver 7.8.5). |
| `C4` | warn | rc.1 añadió un modelo de panel principal global (`main`, `sidebar.panellist`, `ctx.layout.selectPanel(MainPanelId \| null)`) y añadió la prop estándar `usePanelInfo` a casi todos los slots. |
| `C5` | warn | La vista previa de documentos se movió al slot con clave `sidebar.right.tab.document` (`DocumentContent`); `sidebar.right.pane.tab` sobrevive pero su entrada padre pasó a ser `rightbar.session`. |
| `H1` | warn | `KNOWN_SESSION_EVENT_TYPES` ganó `deliverables/presented` y `subagent/catalog`: el vocabulario fail-closed creció. |
| `H2` | warn | La fila de la nueva herramienta `present` ocupa la clave `'present'` de `tool.call.toolview`, que en alpha.1 estaba libre. |
| `H4` | info | El catálogo asesor por defecto del adaptador DeepSeek ahora encabeza con `deepseek-flash` (DeepSeek-V41-Flash). |
| `H3` | info | Nuevas capacidades opcionales: `ctx.sessionFeedback`, `ctx.layout.beginNavigation()`, `ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`. Listadas en la tarjeta; deliberadamente sin detección automática. |

`S7`, `S2`, `S1`, `S10`, `C4`, `C5`, `H1`, `H2` y `H4` son deliberadamente asesorables: tienen coincidencias legítimas (un repo que ya usa la API nueva, una instantánea de documentación, la tabla de ids de modelo de un plugin, un `ChildProcess.pid` de Node), así que el escáner las reporta como pistas para revisión manual, no como fallos. `M1` y `P1` son comprobaciones **estructurales** — resuelven `package.json` y `tsconfig*.json` en lugar de coincidir texto — y `H3` es **solo de tarjeta**: documentada, con paridad de ids comprobada y deliberadamente sin detector (`CARD_ONLY = ['H3']`).

## Las cinco costuras de `legC` (`0.1.5-rc.2` → `0.1.6-alpha.2`)

El orden sigue el catálogo de `lib/scan-0.1.6.mjs`, que es también el orden al que `test/card.test.mjs` fija la tarjeta de `legC`. Aquí toda costura es `error` y todas se detectan (`CARD_ONLY = []`).

| Id | Severidad | Qué cambió en el camino a `0.1.6-alpha.2` |
|---|---|---|
| `E1` | error | `agent/created` despacha sus listeners en serie: un listener que lanza — o que hace trabajo lento — bloquea por completo la creación del agente. Envuelve el trabajo síncrono en `try`/`catch` y aplaza el resto con `queueMicrotask`/`setImmediate` o tu propia cola. |
| `E2` | error | Un `apply()` asíncrono cuyo primer `await` precede a sus registros: todo lo registrado después cae en la ventana de descarga y lanza `INACTIVE_EFFECT`, mientras el cierre antiguo sigue corriendo. Registra todo antes del primer `await`, dentro de un único `ctx.effect()`. |
| `E3` | error | Claves de slot/estado eliminadas: `settings.plugin.item` pasó a ser el keyed→list `plugins.item`, y `SessionListState.current` desapareció — una tarjeta de ajustes desaparece **en silencio** (retorno temprano por `spec === undefined`), y los casts de `current` siguen compilando mientras la función está muerta. |
| `E4` | error | API de cliente eliminada: `sessions.open` / `openSubagent` / `clear` pasaron a `retain` / `using` / `retainInfo`. |
| `E5` | error | Literales de modelo eliminados: `deepseek-v4-flash*` y `deepseek-v4-vision-exp`. El catálogo de modelos por defecto se encogió de 4 a 2, y un id sin catalogar pasa tal cual como solo texto. |

Se aplica la misma disciplina que en `legAB`: un escaneo limpio es necesario, no suficiente. La rotura de `legC` es silenciosa o solo en tiempo de ejecución (la línea de tipos publicada oculta las eliminaciones), así que el criterio de salida sigue siendo un smoke real en el host sobre un `DSH_HOME` temporal, más el ida y vuelta del escritor de logs y la aserción en navegador real donde correspondan.

## Lo que esto no cubre

- **Un salto más allá de todos los corredores de aquí.** `legAB` termina en `0.1.5-rc.1` por construcción: el salto del harness `0.1.5-rc.1` → `0.1.5-rc.2` no añadió ninguna costura de cara a los plugins (el pin de dev/test de este propio paquete corre ahora sobre la línea `0.1.7-rc.2`, de modo que el catálogo queda verificado contra esos tipos publicados; la sonda del workflow compat sigue anclada en `0.1.6-alpha.2`), y `legC` cubre `0.1.5-rc.2` → `0.1.6-alpha.2`. Un salto posterior que añada una costura **no** está cubierto: un corredor está cerrado, y ensanchar una tarjeta es peor que añadir una. Ese salto recibe una tarjeta nueva y una fila nueva en el índice — no un paquete nuevo.
- **El salto `0.1.1` → `0.1.2`.** Usa la habilidad de convergencia de la comunidad.
- **Repetir entre tramos.** El tramo A posee las costuras del formato de sesión (`assistant/message.stream`, `SessionHandleReadResult`, `EpochHeader.system`, `ctx.agent`, `Inbox`, `SystemPrompt.persona`, la generación de log V3) y el tramo B no las repite: todo el diff de `packages/core/session/src` en el rango del tramo B son dos literales de tipo de evento añadidos y una línea de comentario. La sección de tarjeta de cada tramo conserva su propia declaración de alcance.
- **La ruta de actualización del usuario de DSH.** Este paquete actualiza *código fuente de plugins*, no la instalación del harness de un usuario.
- **Tokens de tema.** `docs/web-styling.md` no tiene ningún cambio en el rango del tramo B.
- **Prueba.** Un escaneo limpio es una hipótesis. El criterio de salida es un smoke real en el host (`DSH_HOME` temporal, CLI objetivo, `plugin add <tarball>`, `--dump-config`) más un ida y vuelta de reanudación para los escritores de logs de sesión (tramo A) y una aserción en un navegador real para cada hallazgo del lado cliente (tramo B).

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

El escáner tiene un par de fixtures sintéticos **por tramo de `legAB`**: `fixtures/leg-a-bad-repo` (las costuras de sesión/configuración del tramo A, con todas las costuras de error presentes a propósito) junto con `fixtures/leg-a-good-repo` (adaptado), y `fixtures/bad-repo` (las costuras de slot de cliente del tramo B) junto con `fixtures/good-repo` (adaptado) — más un negativo en vivo sobre un repositorio de la familia ya fijado a `0.1.5-rc.1`, de modo que una regresión del catálogo falla en esta suite y no en un usuario aguas abajo. `test/card.test.mjs` afirma que el índice de cada tarjeta y su propio catálogo (`lib/scan.mjs` para `legAB`, `lib/scan-0.1.6.mjs` para `legC`) nombran **exactamente** los mismos ids de costura con las mismas severidades, que el `CARD_ONLY` de `legAB` es exactamente `['H3']` mientras el de `legC` está vacío, y que los dos catálogos no comparten ningún id de costura — la regla de vinculación de evidencia como puerta de máquina, por corredor.

## Temas

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (reflejan las `keywords` de `package.json`; `dsh-plugin` es el canal de visibilidad del ecosistema).

## Licencia

Apache-2.0 — consulta [LICENSE](LICENSE). Las dependencias de instalación y sus licencias están en [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); no se incluye nada empaquetado.


## PerryLink DSH Plugin Family

Este proyecto es uno de los **87 plugins activamente mantenidos** de DeepSeek Harness de [PerryLink](https://github.com/PerryLink). El registro familiar tiene **95** plugins — **5 congelados**, **3 retirados** — y permanece plegado abajo para que cada README conserve una primera pantalla corta. Expándelo para ver cada fila, con el motivo en la columna Estado.

<details>
<summary>Expandir los 95 plugins</summary>

| Plugin | Una línea | Estado |
|---|---|---|
| **[dsh-aqua-input-check](https://github.com/PerryLink/dsh-aqua-input-check)** | 水产养殖投入品记录核对（按投入品用量、休药期与起捕间隔核对记录自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-archive-check](https://github.com/PerryLink/dsh-archive-check)** | 档案归档完整性与保管期限核对（依据《档案法》及配套规定，仅提示差异，不作出定性结论） |  |
| **[dsh-auto-review](https://github.com/PerryLink/dsh-auto-review)** | Second-model auto-review on the approval chain, fail-closed by default |  |
| **[dsh-autotier](https://github.com/PerryLink/dsh-autotier)** | Automatic strong/cheap model-tier routing with deterministic risk guards and a `/tier` command |  |
| **[dsh-background-agents](https://github.com/PerryLink/dsh-background-agents)** | Durable background child agents with a Web UI sidebar, messaging and interrupt | 🚫 RETIRADO — ver el README del repositorio |
| **[dsh-bid-ca-precheck](https://github.com/PerryLink/dsh-bid-ca-precheck)** | 投标文件符合性预检（按招标文件逐条核对响应情况，仅提示差异，不作出定性结论） |  |
| **[dsh-bid-qual-check](https://github.com/PerryLink/dsh-bid-qual-check)** | 投标人资格条件核对（按资格条件与证明材料核对逐条响应，仅提示差异，不作出定性结论） |  |
| **[dsh-budget](https://github.com/PerryLink/dsh-budget)** | Cost governance for DeepSeek Harness: budgets, carbon, and latency in one panel. | 🧊 CONGELADO — ver el README del repositorio |
| **[dsh-cert-mcp](https://github.com/PerryLink/dsh-cert-mcp)** | Read-only MCP server exposing the certification registry: grades, snapshots and five-dimension evidence |  |
| **[dsh-checkpoint-rewind](https://github.com/PerryLink/dsh-checkpoint-rewind)** | Claude Code /rewind-equivalent: snapshots, session forks, one-shot restore |  |
| **[dsh-claude-move](https://github.com/PerryLink/dsh-claude-move)** | Migrate Claude Code sessions, memory, skills and CLAUDE.md into DSH | 🧊 CONGELADO — ver el README del repositorio |
| **[dsh-click](https://github.com/PerryLink/dsh-click)** | Cross-platform native desktop control for DeepSeek Harness — Windows first. |  |
| **[dsh-composer-history](https://github.com/PerryLink/dsh-composer-history)** | Terminal-style input history for the web composer: arrows, Ctrl+R search |  |
| **[dsh-contract-stance](https://github.com/PerryLink/dsh-contract-stance)** | 合同条款立场台账核对（按立场、风险等级与退让底线核对台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-customs-doc-check](https://github.com/PerryLink/dsh-customs-doc-check)** | 报关单证一致性核对（按公开的报关单填制规范核对单证间字段一致性，仅提示差异，不作出定性结论） |  |
| **[dsh-data-quality](https://github.com/PerryLink/dsh-data-quality)** | Dataset quality checks and citation cross-checks (the optional numeric bridge consumed here) |  |
| **[dsh-defend](https://github.com/PerryLink/dsh-defend)** | Prompt-injection, jailbreak, and secret-leak defense for DeepSeek Harness. | 🧊 CONGELADO — ver el README del repositorio |
| **[dsh-demurrage-ledger](https://github.com/PerryLink/dsh-demurrage-ledger)** | 滞箱费台账核对（按免箱期与费率核对超期天数与金额的自洽性，仅提示差异，不作出定性结论） |  |
| **[dsh-doublecheck](https://github.com/PerryLink/dsh-doublecheck)** | Engineering-discipline guard: requirements grill, test gates, adversary review |  |
| **[dsh-draw](https://github.com/PerryLink/dsh-draw)** | Unified static-image generation routing for DeepSeek Harness. | 🧊 CONGELADO — ver el README del repositorio |
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
| **[dsh-reach](https://github.com/PerryLink/dsh-reach)** | Multi-channel approval/question bridge: WeChat/Telegram/Feishu, session console | 🧊 CONGELADO — ver el README del repositorio |
| **[dsh-repair-order-qc](https://github.com/PerryLink/dsh-repair-order-qc)** | 维修工单结算核对（按项目金额、配件工时合计与结算总额核对算术自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-research-report](https://github.com/PerryLink/dsh-research-report)** | Verifiable research-report engine: content-addressed evidence ledger and sealed versions |  |
| **[dsh-review-reply-check](https://github.com/PerryLink/dsh-review-reply-check)** | 审稿意见逐条回应覆盖核对（按意见与回应一一对应核对覆盖完整性，仅提示差异，不作出定性结论） |  |
| **[dsh-rulefile-check](https://github.com/PerryLink/dsh-rulefile-check)** | 规则库文件自检核对（按条款引用纪律与效力上限核对规则库自身合规，仅提示差异，不作出定性结论） |  |
| **[dsh-safety-brief-check](https://github.com/PerryLink/dsh-safety-brief-check)** | 安全技术交底记录要素齐备性与签字闭环核对（依据公开的安全生产法规与检查标准，仅提示差异，不作出定性结论） |  |
| **[dsh-score](https://github.com/PerryLink/dsh-score)** | Multi-dimensional quality scoring for DeepSeek Harness plugins. |  |
| **[dsh-session-pin](https://github.com/PerryLink/dsh-session-pin)** | Pin sessions in the Web sidebar with durable ordering | 🚫 RETIRADO — ver el README del repositorio |
| **[dsh-session-sync](https://github.com/PerryLink/dsh-session-sync)** | Cross-device session sync for DeepSeek Harness — a dedicated git mirror of your session store. |  |
| **[dsh-site-log-check](https://github.com/PerryLink/dsh-site-log-check)** | 监理日志跨日连续性与旁站覆盖提示（依据 GB/T 50319-2013 等公开文件，仅提示差异，不作出定性结论） |  |
| **[dsh-skill-pack-security](https://github.com/PerryLink/dsh-skill-pack-security)** | Security-audit skill pack: secret scan, dependency and supply-chain review |  |
| **[dsh-soe-decision-check](https://github.com/PerryLink/dsh-soe-decision-check)** | 三重一大决策台账核对（按前置研究、会议审议与决议记录核对程序留痕，仅提示差异，不作出定性结论） |  |
| **[dsh-soilwater-check](https://github.com/PerryLink/dsh-soilwater-check)** | 土壤与地下水监测台账核对（按点位、监测项目、限值与超标判定核对台账自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-sop-sync-check](https://github.com/PerryLink/dsh-sop-sync-check)** | 作业规程与 FMEA／控制计划一致性核对（按编号与版本核对三份文件是否同步，仅提示差异，不作出定性结论） |  |
| **[dsh-spc-gbt-adapter](https://github.com/PerryLink/dsh-spc-gbt-adapter)** | 控制图常数与过程能力指数核对（按 GB/T 4091 的常规控制图常数表核对控制限与 Cp/Cpk 的自洽性，仅提示差异，不作出定性结论） |  |
| **[dsh-talk](https://github.com/PerryLink/dsh-talk)** | Voice-first session loop for DeepSeek Harness: talk to it, hear it answer. |  |
| **[dsh-team-rooms](https://github.com/PerryLink/dsh-team-rooms)** | Cross-session team rooms: shared message bus, task board and timeline | 🚫 RETIRADO — ver el README del repositorio |
| **[dsh-tender-extract](https://github.com/PerryLink/dsh-tender-extract)** | 招标文件条款摘录核对（按出处与原文逐字核对摘录完整性，仅提示差异，不作出定性结论） |  |
| **[dsh-tender-matrix](https://github.com/PerryLink/dsh-tender-matrix)** | 评标因素评分矩阵核对（按分值上限与合计核对矩阵自洽，仅提示差异，不作出定性结论） |  |
| **[dsh-test-drive](https://github.com/PerryLink/dsh-test-drive)** | Isolated install-and-smoke test drives for DeepSeek Harness plugins. |  |
| **[dsh-ticktick](https://github.com/PerryLink/dsh-ticktick)** | TickTick/Dida365 task bridge: session-header panel + 11 tools |  |
| **[dsh-translate](https://github.com/PerryLink/dsh-translate)** | Vendor parameter translation and deterministic JSON repair for DeepSeek Harness. |  |
| **[dsh-warranty-calc](https://github.com/PerryLink/dsh-warranty-calc)** | 质保期与索赔金额核对（按质保期月数与里程、索赔金额算式核对自洽，仅提示差异，不作出定性结论） |  |

</details>

</details>

</details>