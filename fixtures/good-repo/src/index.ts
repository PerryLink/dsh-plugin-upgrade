// Synthetic "after" fixture: the same plugin adapted to 0.1.5-alpha.1. The scanner
// must report zero error-severity hits here.
import type { Inbox } from '@deepseek-ai/dsh-agent'
import SystemPrompt from '@deepseek-ai/dsh-system-prompt'

/** Official unsupported shape: every method throws, matching agent-loop-testkit. */
export function unsupportedInbox(): Inbox {
  const boom = () => { throw new Error('unsupported') }
  return { push: boom, claim: boom, list: boom, hasPending: boom, drain: boom, dispose: boom } as unknown as Inbox
}

export function good(ctx: any, handle: any, agent: any, session: any) {
  // S5: the Agent is passed explicitly by the host setup hook
  const preset = agent.session.header.agentPreset
  // S6: the inbox is read from the agent, never constructed
  const inbox = agent.inbox
  // S7: no pid on the handle
  const running = handle.done
  // S4: the current event name
  const event = { type: 'tool/ptc-dispatch', data: {} }
  // S9: the renamed SystemPrompt config
  const mount = ctx.plugin(SystemPrompt, { personaPrefix: '' })
  return { preset, inbox, running, event, mount }
}

// S8: the read result is destructured
export async function readEvents(handle: any) {
  const { events } = await handle.read()
  return events.filter((e: any) => e.type === 'tool/result')
}

// S3: the V3 stream field is present
export async function persistAssistant(session: any) {
  await session.append({
    type: 'assistant/message',
    data: { content: [{ type: 'text', text: 'hello' }], stream: [] },
  })
}
