// SPDX-License-Identifier: Apache-2.0
// Synthetic fixture: a client half that was never adapted past 0.1.5-alpha.1.
// Every error-severity seam of the corridor is present on purpose, plus one
// representative advisory hit per remaining seam. Not shipped.
import { TextPreview } from '@deepseek-ai/dsh-client-ui-sidebar-textpreview'
import type { DshLlm } from '@deepseek-ai/dsh-llm'

export const fallbackModel = 'deepseek-v4-flash'

export function apply(ctx: any, llm: DshLlm) {
  // C1 — the removed bare slot key, same-line form.
  ctx.slots.inject('conversation', () => ctx.slots.register({ name: 'conversation' }, Panel))

  // C1 — the removed bare slot key, multi-line form: the two lines below are
  // both hits, which is what a real repo looks like after a formatter run.
  ctx.slots.inject(
    'conversation',
    () => ctx.slots.register({ name: 'conversation' }, Panel),
  )

  // H2 — a tool view row that rc.1's `present` tool now occupies.
  ctx.slots.register({ name: 'tool.call.toolview', key: 'present' }, PresentRow)

  // C5 — the old right-pane preview entry point.
  ctx.slots.inject('sidebar.right.pane.tab', () => ctx.slots.register({ name: 'sidebar.right.pane.tab' }, TextPreview))

  // C4 — hand-written props that predate the usePanelInfo standard prop.
  const cardProps = { usePanelInfo: makeUsePanelInfo() }
  ctx.slots.inject('settings.section', () => ctx.slots.register({ id: 'fixture' }, Card, cardProps))

  // H1 — a reader that enumerates the fail-closed event vocabulary.
  const known = KNOWN_SESSION_EVENT_TYPES
  void known
  void llm
  return { fallbackModel }
}

declare const Panel: any
declare const PresentRow: any
declare const Card: any
declare const makeUsePanelInfo: () => unknown
declare const KNOWN_SESSION_EVENT_TYPES: ReadonlySet<string>
