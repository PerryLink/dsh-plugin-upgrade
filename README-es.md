<div align="center">

# ⬆️ dsh-plugin-upgrade
- **Canal de la tienda 1024**: ejecuta `npm i -g dsh1024` una vez y luego `dsh1024 plugin --profile web add dsh-plugin-upgrade` (cuenta para el ranking de instalaciones de [deepseek1024.com](https://deepseek1024.com)).
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade)

**Habilidad de actualización de plugins con versión fijada para DeepSeek Harness — `0.1.3-alpha.1` → `0.1.5-alpha.1`.**

*Una tarjeta de versión más un escáner de costuras sin dependencias, para que «typecheck está en verde» nunca se confunda con «el plugin sigue funcionando».*

> **Repositorio oficial.** Este es el único repositorio oficial de dsh-plugin-upgrade, mantenido por PerryLink. Los repositorios con el mismo nombre en otras cuentas no están afiliados.

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

## Compatibilidad

| Superficie | Estado |
|---|---|
| Harness | DeepSeek Harness `0.1.5-rc.1` (checkout `2efea31131`, tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`). Banda de peers `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`. |
| Node | `^22.19.0 \|\| >=24.0.0` |
| Plataformas | Donde corra Node; el escáner solo lee el sistema de archivos y es neutral respecto a la plataforma |
| Modelo | Modelos solo de texto totalmente soportados; la habilidad es un cuerpo Markdown, sin requisitos de herramientas ni visión |
| Alcance | **Un solo corredor**: `0.1.3-alpha.1` → `0.1.5-alpha.1`. No es un marco de migración general. |

## Lo que obtienes

Dos mitades y un único catálogo de costuras:

- **Una habilidad de agente incluida (`plugin-upgrade-015`)**: una tarjeta de versión y un bucle de corregir-y-verificar. El modelo solo la carga cuando la tarea realmente la necesita; el paquete no aporta ningún párrafo al prompt del sistema ni registra herramientas.
- **Una CLI sin dependencias (`dsh-plugin-upgrade-scan`)**: informa hechos `archivo:línea` para diez costuras medidas sobre 40 repositorios de plugins reales durante la ola de adaptación del 2026-09-09. Sale con `1` ante cualquier hallazgo de severidad error, así que entra directo en CI.

El objetivo es el modo de fallo que la tarjeta existe para eliminar: **una puerta local en verde no es prueba de adaptación.** Dos clases de rotura sobreviven a `typecheck` + `test`:

1. la línea de tipos publicada oculta la costura y el repositorio compila contra tipos obsoletos (costura `M1`);
2. las pruebas están simuladas contra la forma antigua, así que pasan mientras el host rechaza la nueva.

Cuatro de las diez costuras — `S3`, `S8`, `S9`, `M1` — seguían sin cobertura por ningún PR comunitario de actualización cuando se escribió este paquete; las otras seis están contrastadas con la evidencia de la ola.

## Inicio rápido

```sh
# 1. instala el bundle en tu perfil
dsh plugin --profile web add dsh-plugin-upgrade

# 2. verifica que la fila se montó
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade'

# 3. escanea el plugin que estás actualizando
npx dsh-plugin-upgrade-scan --repo ../my-plugin
```

Después pide al agente que use la habilidad `plugin-upgrade-015`, o guía el bucle tú mismo con la tarjeta en
`skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-alpha.1.md`.

## Instalación y desinstalación

```sh
dsh plugin --profile web add dsh-plugin-upgrade            # desde npm
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade#main"   # desde el código
dsh plugin --profile web remove dsh-plugin-upgrade         # desinstalar (reversible)
```

Instalar el bundle solo registra una habilidad; quitar la fila la elimina. La CLI es un destino `npx` normal y no necesita ningún perfil.

## Configuración

Cada clave es opcional y vive en el patch del perfil:

| Clave | Predeterminado | Significado |
|---|---|---|
| `enabled` | `true` | Registra la habilidad incluida. `false` mantiene la dependencia montada pero silenciosa. |
| `skillName` | `plugin-upgrade-015` | Directorio bajo `skillsRoot` que se registra, y nombre mostrado en el catálogo. |
| `skillsRoot` | el `./skills` del propio paquete | Dónde vive `<skillName>/SKILL.md`. Apúntalo a tu propia tarjeta para reutilizar la infraestructura. |
| `userInvocable` | `true` | Si una persona puede invocar la habilidad por nombre además del modelo. |

```yaml
- insert:
    - id: dsh-plugin-upgrade
      name: dsh-plugin-upgrade
      config:
        skillName: plugin-upgrade-015
```

El montaje falla en voz alta: un `SKILL.md` ausente, un cuerpo vacío o un frontmatter sin `name` abortan el montaje en lugar de registrar una habilidad vacía.

## Superficies

**Habilidad** — `plugin-upgrade-015` (invocable por el modelo y por la persona por defecto). Cuerpo: el bucle de 6 pasos. Referencias: la tarjeta de versión. Scripts: el detector, incluido dentro del directorio de la habilidad para que las rutas relativas resuelvan.

**CLI** — `dsh-plugin-upgrade-scan`:

```sh
dsh-plugin-upgrade-scan [--repo <path>] [--json <out.json>] [--seams S3,S8,M1] [--quiet]
```

| Bandera | Significado |
|---|---|
| `--repo <path>` | Repositorio a escanear (predeterminado: cwd). |
| `--json <out.json>` | Escribe además el informe legible por máquina (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`). |
| `--seams S3,S8,M1` | Restringe a costuras concretas. |
| `--quiet` | Silencia la salida humana (combínala con `--json`). |

Códigos de salida: `0` sin hallazgos de severidad error · `1` al menos uno · `2` uso o fallo de escaneo. Un escaneo limpio es necesario pero no suficiente: el criterio de salida de la tarjeta es una prueba real en un `DSH_HOME` temporal.

## Las diez costuras

| Id | Severidad | Qué cambió en la línea `0.1.5-alpha.1` |
|---|---|---|
| `S1` | warn | El formato de sesión es V3; el archivo de log lleva generación (`session.v3.jsonl.zstd`). Las rutas fijas a `session.jsonl.zstd` dejan de funcionar en silencio. |
| `S2` | warn | `EpochHeader.system` desapareció; el prompt del sistema es `system/message` en el nodo 0 de la superficie. Los lectores necesitan un respaldo estructural. |
| `S3` | error | `assistant/message` requiere `stream`; sin él la sesión se importa pero no se puede reanudar (`Session.fromRestore` rechaza campos de settlement inválidos). |
| `S4` | error | `tool/code-dispatch` pasó a llamarse `tool/ptc-dispatch`. |
| `S5` | error | `ctx.agent` se eliminó; los llamadores reciben el `Agent` explícitamente. |
| `S6` | error | `Inbox` pasó a ser una interfaz de tipo: ya no se puede construir; usa `agent.inbox` y la forma oficial del fixture. |
| `S7` | warn | `SubprocessHandle.pid` se eliminó (solo `SubprocessTerminalHandle` conserva `pid`). |
| `S8` | error | `SessionHandle.read()` ahora devuelve `SessionHandleReadResult`: desenvuelve `.events`. |
| `S9` | error | La configuración `persona` de `SystemPrompt` pasó a `personaPrefix` / `personaSuffix`. |
| `M1` | error | Un alias `paths` de `tsconfig` que apunta a un directorio inexistente hace que TypeScript vuelva en silencio a los tipos publicados: la puerta local se vuelve **falsamente verde**. |

`S7`, `S1`, `S2` y `S10` son deliberadamente informativos: tienen coincidencias legítimas (el `pid` de Node, lectores de generaciones antiguas, la propia puerta de eventos adaptativa de un plugin), así que el escáner los reporta como pistas para revisión manual y no como fallos.

## Lo que esto no cubre

- **Otros corredores.** `0.1.1` → `0.1.2` y líneas futuras quedan fuera; la tarjeta está fijada a propósito, porque una tarjeta que se desvía es peor que ninguna.
- **La ruta de actualización de DSH para usuarios.** Este paquete actualiza el **código fuente del plugin**, no la instalación del harness de un usuario.
- **Comportamiento de cliente/navegador.** El escáner es estático; una mitad cliente aún necesita una aserción real en el navegador.
- **Prueba.** Un escaneo limpio es una hipótesis. El criterio de salida es una prueba real en el host (`DSH_HOME` temporal, CLI objetivo, `plugin add <tarball>`, `--dump-config`, más una ida y vuelta de resume para quien escribe logs de sesión).

## Límites de seguridad

- **Escaneo de solo lectura.** La CLI nunca escribe dentro del repositorio escaneado; `--json` escribe solo en la ruta que le indiques.
- **Sin red ni shell.** El escáner no importa nada fuera de la biblioteca estándar de Node y nunca lanza procesos.
- **Sin secretos.** Nada en el paquete lee credenciales, tokens de entorno ni datos de sesión.
- **Receta de prueba en sandbox.** La comprobación real de la tarjeta usa un `DSH_HOME` creado con `mkdtemp`; nunca toca tu `~/.dsh` real.

## Desarrollo

```sh
pnpm install
pnpm test                          # node --test (Cordis real + SkillRegistry real)
pnpm run verify:self-contained     # cada import resuelve dentro del paquete
pnpm run verify:artifacts          # el tarball incluye la habilidad, la CLI y el patch
pnpm run check:readmes             # consistencia de los README en cinco idiomas
pnpm pack
```

El escáner trae sus propios `fixtures/bad-repo` y `fixtures/good-repo` sintéticos, más un negativo en vivo sobre un repositorio ya adaptado por la ola, de modo que una regresión en el catálogo falla la suite en lugar de llegar a un usuario.

## Temas

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner` (reflejan las keywords de `package.json`; `dsh-plugin` es el canal de visibilidad del ecosistema).

## Familia de plugins DSH de PerryLink

Parte de la familia de plugins DSH de PerryLink: 40 repositorios que cubren sesiones, memoria, permisos, entrega, observabilidad y herramientas para desarrolladores. Explora el catálogo en [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) o el [tema `dsh-plugin`](https://github.com/topics/dsh-plugin).

## Licencia

Apache-2.0 — consulta [LICENSE](LICENSE). Las dependencias de instalación y sus licencias figuran en [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); no se empaqueta nada de terceros.
