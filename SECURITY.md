# Security Policy

## Reporting a vulnerability

Report privately through GitHub's [private vulnerability reporting](https://github.com/PerryLink/dsh-plugin-upgrade-015/security/advisories/new)
(Security → Advisories → Report a vulnerability). Please do not open a public issue for a
suspected vulnerability.

Include the version, the exact command or plugin config, the observed behavior and, when
possible, a minimal reproduction. You can expect an acknowledgement within a few days.

## Scope

`dsh-plugin-upgrade-015` is a **read-only developer tool**:

- The scanner reads files under `--repo` and never writes inside the scanned repository.
  `--json` writes only to the path you pass.
- It imports nothing beyond Node's standard library, opens no socket and spawns no process.
- It reads no credentials, no environment tokens and no session data.
- The bundled skill is a Markdown body plus a version card; it contributes no system-prompt
  paragraph and registers no tool.

In scope:

- a crafted repository that makes the scanner write outside the requested paths, escape the
  scanned root, or execute code;
- a path-traversal or symlink escape in `--repo` / `--json` handling;
- a plugin config that mounts the skill from outside the intended root, or that silently
  registers a skill different from the packaged one;
- a published artifact that differs from this repository's source.

Out of scope:

- findings in the DeepSeek Harness itself (report those upstream);
- the *content* of the corridor card being incomplete for a repository the maintainer has
  never seen — that is a bug report, not a vulnerability;
- anything that requires the attacker to already control the machine or the repository
  being scanned.

## Supported versions

The latest published `0.1.x` line receives fixes. Prerelease versions of the harness are
supported as declared in `package.json` peer ranges.
