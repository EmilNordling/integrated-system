import { Ctor, Token } from './_common';

const metadata = new Map<Token, Ctor<unknown>[]>();

export function __sprinkelMetaData(token: Token, deps: Ctor<unknown>[]): void {
  metadata.set(token, deps);
}

export function __getMetadata(token: Token): Ctor<unknown>[] {
  return metadata.get(token) ?? [];
}

export function __setCustomLookUp(fn: (token: any) => any): void {
  __customLookUp.fn = fn;
}

export const __customLookUp = {
  fn: undefined as ((token: any) => any) | undefined,
};
