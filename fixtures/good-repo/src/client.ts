// SPDX-License-Identifier: Apache-2.0
// Synthetic fixture: a client half already adapted to the 0.1.5-rc.1 slot
// catalog. It must produce zero error-severity hits. Not shipped.
import type { DshLlm } from '@deepseek-ai/dsh-llm'

// The rc.1 model the adapter's default advisory catalog now leads with.
export const fallbackModel = 'deepseek-flash'

export function apply(ctx: any, llm: DshLlm) {
  // The conversation content seat, addressed through its rc.1 parent entry.
  ctx.slots.inject('main.conversation', () => ctx.slots.register({ name: 'main.conversation' }, Root))

  // A tool view row under a key of its own: `present` belongs to the shipped tool.
  ctx.slots.inject('tool.call.toolview', () => ctx.slots.register({ name: 'tool.call.toolview', key: 'fixture-row' }, Row))

  ctx.slots.inject('settings.section', () => ctx.slots.register({ id: 'fixture' }, Card))

  // A reader that re-snapshotted the fail-closed vocabulary for rc.1.
  const known = KNOWN_SESSION_EVENT_TYPES
  void known
  void llm
  return { fallbackModel }
}

declare const Root: any
declare const Row: any
declare const Card: any
declare const KNOWN_SESSION_EVENT_TYPES: ReadonlySet<string>
