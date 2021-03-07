import { __customLookUp, __getMetadata } from '../meta';
import { Graph } from '../_graph';
import { registeredServices } from '../_registration';
import { Ctor, Lifetimes, Token } from '../_common';
import type { Dependencies, StackElement } from './_common';
import { resolutionMap } from './_resolution';

// --------- Branch step ---------
// This step's responsibility is to create a tree data structure of the
// resolving class's constructor dependencies.

function createStackElement(dependency: Dependencies): StackElement {
  let id = dependency.registrationId;

  if (dependency.lifetime === Lifetimes.Transient) {
    // For debugging purposes its description is prefix with "$", a way to
    // difference transients from other dependencies
    id = Symbol(`$`);
  }

  return {
    id,
    parentId: dependency.parentId,
    registrationId: dependency.registrationId,
    lifetime: dependency.lifetime,
    dependencies: [],
  };
}

export function branchStep(resolutionKey: object): void {
  const resolution = resolutionMap.get(resolutionKey);
  if (!resolution) throw new Error('ooc');
  // WeakMap to hold service references for each service within the branch

  const dependenciesForEachDependency = new Map<Token, Dependencies[]>();
  const resolvingDependenciesBranch = new Graph<StackElement>((element) => element.id);

  const stack: StackElement[] = [
    createStackElement({
      parentId: null,
      registrationId: resolution.token,
      lifetime: resolution.registration.settings.lifeTime,
    }),
  ];

  let cycleCount = 0;
  while (stack.length > 0) {
    // The pop here will always return a value
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const resolvingStackElement = stack.pop()!;

    if (cycleCount++ > 10000) {
      throw new Error('Recursion in branch step');
    }

    const registeredServiceFactory = registeredServices.get(resolvingStackElement.registrationId);
    if (registeredServiceFactory === undefined) {
      throw new Error(`${'anonymous'} is not registered`);
    }

    resolvingDependenciesBranch.lookupOrInsertNode(resolvingStackElement);

    // This row is basically the whole magic behind the service resolving logic
    const tokens: Ctor<unknown>[] = __customLookUp.fn
      ? __customLookUp.fn(registeredServiceFactory.ctor)
      : __getMetadata(registeredServiceFactory.ctor);
    const dependencies: Dependencies[] = tokens.map((dependency) => {
      const registeredDependency = registeredServices.get(dependency);
      if (registeredDependency === undefined) {
        throw new Error(`ctor is not registered`);
      }

      return {
        parentId: resolvingStackElement.id,
        registrationId: dependency,
        lifetime: registeredDependency.settings.lifeTime,
      };
    });
    dependenciesForEachDependency.set(registeredServiceFactory.ctor, dependencies);

    for (const dependency of dependencies) {
      resolvingStackElement.dependencies.push(dependency.registrationId);

      const edge: StackElement = createStackElement(dependency);
      resolvingDependenciesBranch.insertEdge(resolvingStackElement, edge);
      stack.push(edge);
    }
  }

  resolution.deps = [dependenciesForEachDependency, resolvingDependenciesBranch];
}
