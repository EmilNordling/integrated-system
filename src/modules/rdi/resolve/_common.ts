import type { Lifetimes, Token } from '../_common';

export interface Dependencies {
  parentId: Token | null;
  registrationId: Token;
  lifetime: Lifetimes;
}

export interface StackElement {
  id: Token;
  parentId: Token | null;
  registrationId: Token;
  lifetime: Lifetimes;
  dependencies: Token[];
}
