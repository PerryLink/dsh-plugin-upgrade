// SPDX-License-Identifier: Apache-2.0
// Checkout ruler probe. Compiled by `pnpm run typecheck:checkout` through
// tsconfig.checkout.json, which aliases the three host specifiers this package
// imports to the LOCAL HARNESS CHECKOUT's built types. It is never executed: it
// exists so that a host-line shape change — a moved export, a renamed field, a
// narrowed literal union — fails HERE, against the checkout, instead of at a
// user's first mount. Keep every declaration below in step with its real call
// site: `index.mjs` (Config, the registration in `apply()`) and
// `test/plugin.test.mjs` (a real Context, the real SkillRegistry, one effect).
import { Context } from '@deepseek-ai/cordis'
import SkillRegistry from '@deepseek-ai/dsh-skill'
import type { SkillRegistration } from '@deepseek-ai/dsh-skill'
import Schema from '@deepseek-ai/schemastery'

/** Mirrors `index.mjs` `Config`: the schema the Host validates form writes against. */
export const Config = Schema.object({
  enabled: Schema.boolean().default(true),
  skillName: Schema.string().default('plugin-upgrade'),
  skillsRoot: Schema.string().default('/tmp/skills'),
  userInvocable: Schema.boolean().default(true),
})

/** Mirrors the object `apply()` hands to `ctx.skills.register()`. */
const registration: SkillRegistration = {
  name: 'plugin-upgrade',
  source: 'bundled',
  description: 'DSH plugin upgrade · 0.1.3-alpha.1 -> 0.1.5-rc.1 (merged corridor): seam scanner and corridor card.',
  whenToUse: 'Use when upgrading a plugin across the 0.1.3-alpha.1 -> 0.1.5-rc.1 corridor.',
  content: '# Plugin upgrade\n\nLocate your leg first.\n',
  resourceBase: { kind: 'directory', path: '/tmp/skills/plugin-upgrade' },
  invocation: { modelInvocable: true, userInvocable: true },
}

/** Mirrors `test/plugin.test.mjs`: real Context + real registry, registration as an effect. */
export async function mountProbe(): Promise<void> {
  const ctx = new Context()
  await ctx.plugin(SkillRegistry)
  ctx.effect(() => ctx.skills.register(registration))
}

export { registration }
