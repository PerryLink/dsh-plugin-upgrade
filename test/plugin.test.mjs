// Real-Cordis registration tests: mount the official SkillRegistry, mount this
// plugin, and assert the packaged skill appears in the catalog and disappears on
// dispose. Negative: a missing bundle must fail loud at mount.
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Context } from '@deepseek-ai/cordis'
import SkillRegistry from '@deepseek-ai/dsh-skill'
import * as plugin from '../index.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')

test('registers the packaged skill on the real skills service and removes it on dispose', async () => {
  const ctx = new Context()
  await ctx.plugin(SkillRegistry)
  const fiber = await ctx.plugin(plugin)
  const list = await ctx.skills.list()
  assert.ok(list.some(s => s.name === 'plugin-upgrade-015'), `expected plugin-upgrade-015 in ${list.map(s => s.name).join(',')}`)
  const def = await ctx.skills.get('plugin-upgrade-015')
  assert.ok(def, 'skill definition must resolve')
  assert.match(def.content, /Plugin upgrade/)
  assert.equal(def.source, 'bundled')
  assert.equal(def.invocation.modelInvocable, true)
  assert.equal(def.invocation.userInvocable, true)
  assert.match(def.whenToUse, /0\.1\.5-alpha\.1/)
  // Relative references in the body resolve against the skill's own directory.
  assert.equal(path.basename(def.resourceBase.path), 'plugin-upgrade-015')
  assert.ok(existsSync(path.join(def.resourceBase.path, 'references', 'v0.1.3-alpha.1-to-v0.1.5-alpha.1.md')))
  await fiber.dispose()
  const after = await ctx.skills.list()
  assert.ok(!after.some(s => s.name === 'plugin-upgrade-015'), 'skill must disappear after dispose')
})

test('enabled: false mounts without registering anything', async () => {
  const ctx = new Context()
  await ctx.plugin(SkillRegistry)
  await ctx.plugin(plugin, { enabled: false })
  const list = await ctx.skills.list()
  assert.ok(!list.some(s => s.name === 'plugin-upgrade-015'))
})

test('a missing skill bundle fails loud instead of mounting silently', async () => {
  const ctx = new Context()
  await ctx.plugin(SkillRegistry)
  // Cordis surfaces an apply() throw on the mount fiber, so the rejection lands
  // when the fiber is awaited rather than on the synchronous ctx.plugin() call.
  await assert.rejects(
    async () => { await ctx.plugin(plugin, { skillsRoot: path.join(root, 'fixtures', 'does-not-exist') }) },
    /cannot read skill bundle/,
  )
})

test('splitFrontmatter parses the packaged SKILL.md', () => {
  const parsed = plugin.splitFrontmatter('---\nname: demo\ndescription: a demo\nwhenToUse: when it demos\n---\nbody line\n')
  assert.equal(parsed.description, 'a demo')
  assert.equal(parsed.whenToUse, 'when it demos')
  assert.equal(parsed.body, 'body line\n')
  assert.equal(plugin.splitFrontmatter('no frontmatter').description, undefined)
})

test('splitFrontmatter survives a CRLF checkout (Windows core.autocrlf=true)', () => {
  const parsed = plugin.splitFrontmatter('---\r\nname: demo\r\ndescription: a demo\r\nwhenToUse: when it demos\r\n---\r\nbody line\r\n')
  assert.equal(parsed.description, 'a demo')
  assert.equal(parsed.whenToUse, 'when it demos')
  assert.equal(parsed.body, 'body line\n')
})

test('readSkillBundle mounts a CRLF-converted bundle', () => {
  const tmp = mkdtempSync(path.join(tmpdir(), 'dshup-crlf-'))
  try {
    const dir = path.join(tmp, 'plugin-upgrade-015')
    mkdirSync(dir, { recursive: true })
    const crlf = readFileSync(path.join(root, 'skills', 'plugin-upgrade-015', 'SKILL.md'), 'utf8').replace(/\r?\n/g, '\r\n')
    writeFileSync(path.join(dir, 'SKILL.md'), crlf)
    const bundle = plugin.readSkillBundle(tmp, 'plugin-upgrade-015')
    assert.equal(bundle.frontmatterName, 'plugin-upgrade-015')
    assert.match(bundle.whenToUse, /0\.1\.5-alpha\.1/)
    assert.match(bundle.body, /Plugin upgrade/)
    assert.ok(!bundle.body.startsWith('---'), 'frontmatter must not leak into the body')
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
})
