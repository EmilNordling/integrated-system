/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Context, globalContext } from '../_context';
import type { Token } from '../_common';
import type { Graph } from '../_graph';
import type { Registration } from '../_registration';
import type { Dependencies, StackElement } from './_common';

export type ResolutionDeps = readonly [
  dependenciesForEachDependency: Map<Token, Readonly<Dependencies[]>>,
  resolvingDependenciesBranch: Graph<StackElement>,
];
export type ResolutionContext = readonly [
  globalContext: typeof globalContext,
  scopedContext: Context<any>,
  localContext: readonly [rootSymbol: Token, context: Context<Array<any>>],
];

export class Resolution<T> {
  public deps: ResolutionDeps | null = null;
  public contexts: ResolutionContext | null = null;

  constructor(public readonly token: Token, public readonly registration: Registration<T>) {
    // Empty
  }
}
