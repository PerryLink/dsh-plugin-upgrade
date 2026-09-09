// verify-artifacts: pack the package into a temp directory and prove the published
// tarball carries the plugin entry, the skill bundle, the CLI and the patch layer,
// and that the entry imports under plain Node.
// Usage: node scripts/verify-artifacts.mjs
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, rmSync, existsSync, readFileSync, symlinkSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const staging = mkdtempSync(join(tmpdir(), 'dsh-plugin-upgrade-pack-'))
const failures = []
try {
  execFileSync('npm', ['pack', '--pack-destination', staging], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, shell: true })
  const tgz = readdirSync(staging).find(f => f.endsWith('.tgz'))
  if (!tgz) throw new Error('npm pack produced no tarball')
  const extract = join(staging, 'x')
  execFileSync('tar', ['-xzf', join(staging, tgz), '-C', staging], { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true })
  const pkgRoot = join(staging, 'package')
  if (!existsSync(pkgRoot)) { rmSync(extract, { recursive: true, force: true }); failures.push('tarball has no package/ root') }

  const required = [
    'index.mjs',
    'cordis.patch.yml',
    'lib/scan.mjs',
    'scripts/scan-0.1.5.mjs',
    'skills/plugin-upgrade-015/SKILL.md',
    'skills/plugin-upgrade-015/scripts/scan-0.1.5.mjs',
    'skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-alpha.1.md',
    'README.md',
    'CHANGELOG.md',
    'LICENSE',
  ]
  for (const rel of required) if (!existsSync(join(pkgRoot, rel))) failures.push(`tarball is missing ${rel}`)

  // The packaged entry must import without the harness present. It imports the
  // declared peer @deepseek-ai/schemastery, so lend the extracted tree this
  // repo's installed peers through a directory link instead of reinstalling.
  try {
    const nm = join(pkgRoot, 'node_modules')
    if (!existsSync(nm) && existsSync(join(root, 'node_modules'))) {
      symlinkSync(join(root, 'node_modules'), nm, process.platform === 'win32' ? 'junction' : 'dir')
    }
    const entryUrl = pathToFileURL(join(pkgRoot, 'index.mjs')).href
    const out = execFileSync(process.execPath, ['-e', `import(${JSON.stringify(entryUrl)}).then(m => console.log('exports:' + ['name','inject','Config','apply'].filter(k => k in m).join(',')))`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true })
    if (!/exports:name,inject,Config,apply/.test(out)) failures.push(`entry export surface unexpected: ${out.trim()}`)
  } catch (error) {
    failures.push(`packaged entry failed to import: ${error instanceof Error ? String(error.stderr || error.message).slice(0, 200) : String(error)}`)
  }

  // The packaged SKILL.md must keep its corridor frontmatter.
  const skill = readFileSync(join(pkgRoot, 'skills/plugin-upgrade-015/SKILL.md'), 'utf8')
  if (!/^name:\s*plugin-upgrade-015\s*$/m.test(skill)) failures.push('packaged SKILL.md lost its frontmatter name')

  // cordis.patch.yml must stay a top-level YAML ARRAY of loader patch entries:
  // a mapping (`insert:` at column 0) mounts nothing and dsh reports
  // "must be a top-level YAML array of loader patch entries" at profile load.
  const patch = readFileSync(join(pkgRoot, 'cordis.patch.yml'), 'utf8')
  const body = patch.split(/\r?\n/).filter(l => l.trim() !== '' && !l.trim().startsWith('#'))
  if (!body[0]?.startsWith('- ')) failures.push(`cordis.patch.yml is not a top-level YAML array (starts with ${JSON.stringify(body[0]?.slice(0, 30))})`)
  if (!body.some(l => /^-\s+insert:/.test(l))) failures.push('cordis.patch.yml has no top-level `- insert:` entry')
  if (!body.some(l => /name:\s*dsh-plugin-upgrade\s*$/.test(l))) failures.push('cordis.patch.yml does not insert the dsh-plugin-upgrade row')

  // The skill-relative scanner entry must work from inside the tarball, because
  // the skill body resolves `./scripts/...` against the skill directory.
  const probe = join(staging, 'bad-probe')
  mkdirSync(probe, { recursive: true })
  writeFileSync(join(probe, 'index.ts'), "ctx.on('tool/code-dispatch', () => {})\n")
  try {
    execFileSync(process.execPath, [join(pkgRoot, 'skills/plugin-upgrade-015/scripts/scan-0.1.5.mjs'), '--repo', probe, '--quiet'], { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true })
    failures.push('packaged skill-relative scanner exited 0 on a real seam')
  } catch (error) {
    if (error.status !== 1) failures.push(`packaged skill-relative scanner exited ${error.status}, expected 1`)
  }

  if (failures.length) {
    console.error('artifacts: FAIL')
    for (const f of failures) console.error('  ' + f)
    process.exitCode = 1
  } else {
    console.log(`artifacts: OK (${required.length} required files present, entry imports, skill frontmatter intact)`)
  }
} finally {
  rmSync(staging, { recursive: true, force: true })
}
