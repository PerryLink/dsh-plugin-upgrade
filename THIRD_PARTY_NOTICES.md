# Third-party notices

`dsh-plugin-upgrade-rc1` ships **no bundled third-party code**. The published tarball
contains only this repository's source, the packaged skill and its version card.

The dependencies below are declared as `peerDependencies` (the host provides them at
runtime) and as `devDependencies` (used only to run the test suite in this repository). None
of them is copied into the published artifact.

| Package | Range | Role | License |
|---|---|---|---|
| `@deepseek-ai/cordis` | `^4.0.2` (peer) | Plugin runtime (Context, effect, inject) | Apache-2.0 |
| `@deepseek-ai/dsh-skill` | `>=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0` (peer) | `skills` service and `SkillRegistry` used by the tests | Apache-2.0 |
| `@deepseek-ai/schemastery` | `^3.18.2` (peer) | `Config` schema | Apache-2.0 |
| `@deepseek-ai/dsh-skill` | `0.1.5-rc.1` (dev) | Real-registry mount test against the published rc.1 line | Apache-2.0 |

The scanner (`lib/scan.mjs`) and the CLI import only Node.js built-ins (`node:fs`,
`node:path`) and therefore add no transitive install-time dependency of their own.

License texts for the peer packages are distributed by those packages. This repository's own
code is Apache-2.0 — see [LICENSE](LICENSE).
