// Synthetic "before" fixture: every seam the scanner must flag.
import { Inbox } from '@deepseek-ai/dsh-agent'
import SystemPrompt from '@deepseek-ai/dsh-system-prompt'
import type { Session } from '@deepseek-ai/dsh-session'
import type { Context } from '@deepseek-ai/cordis'

export function bad(ctx: any, handle: any, session: any) {
  // S5: ctx.agent was removed
  const preset = ctx.agent?.session?.header?.agentPreset
  // S6: Inbox is no longer a constructable class
  const inbox = new Inbox(session, {})
  // S7: SubprocessHandle has no pid
  const pid = handle.pid
  // S4: the event was renamed
  const event = { type: 'tool/code-dispatch', data: {} }
  // S9: SystemPrompt Config renamed persona
  const mount = ctx.plugin(SystemPrompt, { persona: '' })
  return { preset, inbox, pid, event, mount }
}

// S8: handle.read() no longer returns an array
export async function readEvents(handle: any) {
  const events = await handle.read()
  return events.filter((e: any) => e.type === 'tool/result')
}

// S3: an assistant/message written into a session log without the V3 stream field
export async function persistAssistant(session: any) {
  await session.append({
    type: 'assistant/message',
    data: { content: [{ type: 'text', text: 'hello' }] },
  })
}
