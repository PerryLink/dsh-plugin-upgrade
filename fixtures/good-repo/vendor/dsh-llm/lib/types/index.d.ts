// SPDX-License-Identifier: Apache-2.0
// Stand-in type face for the good fixture's `tsconfig` `paths` alias. The real
// repository points this alias at a `deepseek-harness` checkout (see the card,
// seam M1 — leg B's card spelled this seam C3); the fixture points it at this
// in-repo stub so the "paths resolve" path is exercised deterministically on
// any machine, including CI.
export interface DshLlm {
  readonly provider: string
}
