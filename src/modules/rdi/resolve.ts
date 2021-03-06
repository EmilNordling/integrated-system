import { Context, globalContext } from './_context';
import { Graph } from './_graph';
import { __customLookUp, __getMetadata } from './meta';
import { registeredServices } from './_registration';
import { Ctor, Lifetimes, Token } from './_types';

/**
 * Returns an instance, during the process all of its dependencies will also be created.
 */
export function resolve<T>(resolvingCtor: Ctor<T>): T {
  if (resolvingCtor === undefined) {
    throw new Error(`Retrieved undefined, this is caused of circular JS imports`);
  }

  const registeredCtor = registeredServices.get(resolvingCtor);
  if (registeredCtor === undefined) {
    throw new Error(`ctor is not registered`);
  }

  // WeakMap to hold service references for each service within the branch
  interface Dependencies {
    parentId: Token | null;
    registrationId: Token;
    lifetime: Lifetimes;
  }
  const dependenciesForEachDependency = new Map<Token, Dependencies[]>();

  interface StackElement {
    id: Token;
    parentId: Token | null;
    registrationId: Token;
    lifetime: Lifetimes;
    dependencies: Token[];
  }
  const resolvingDependenciesBranch = new Graph<StackElement>((element) => element.id);

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

  const stack: StackElement[] = [
    createStackElement({
      parentId: null,
      registrationId: resolvingCtor,
      lifetime: registeredCtor.settings.lifeTime,
    }),
  ];

  // --------- Branch step ---------

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

  // --------- Producer step ---------

  // Created once per service call
  const transientRoot = Symbol('transient_root');
  const resolvedScopedServices = new Context<any>();
  const resolvedTransientServices = new Context<Array<any>>();

  function retrieveArgs(id: Token): unknown[] {
    const args: unknown[] = [];
    const lookupDependencies = dependenciesForEachDependency.get(id);
    if (lookupDependencies === undefined) {
      return args;
    }

    for (const lookupDependency of lookupDependencies) {
      if (lookupDependency.lifetime === Lifetimes.Singleton) {
        const dependency = globalContext.retrieve(lookupDependency.registrationId);
        if (dependency === undefined) {
          throw new Error(`Singleton ${'anonymous'} service has not been resolved yet`);
        }

        args.push(dependency);

        continue;
      }

      if (lookupDependency.lifetime === Lifetimes.Scoped) {
        const alreadyResolvedDependency = resolvedScopedServices.retrieve(lookupDependency.registrationId);
        if (alreadyResolvedDependency === undefined) {
          throw new Error(`Singleton ${'anonymous'} service has not been resolved yet`);
        }

        args.push(alreadyResolvedDependency);

        continue;
      }

      if (lookupDependency.lifetime === Lifetimes.Transient) {
        const parentId = lookupDependency.parentId;
        if (parentId === null) {
          throw new Error('No parentId was found and it should not go through root at this point');
        }

        const transientInstances = resolvedTransientServices.retrieve(parentId) ?? [];
        const registeredCtorBasedOnLookupDependency = registeredServices.get(lookupDependency.registrationId);
        if (registeredCtorBasedOnLookupDependency === undefined) {
          throw new Error(`${'anonymous'} is not registered`);
        }

        const findFirstMatchingCtorIndex = transientInstances.findIndex((transientInstance) => {
          if (transientInstance instanceof registeredCtorBasedOnLookupDependency.ctor) return true;

          return false;
        });

        args.push(transientInstances.splice(findFirstMatchingCtorIndex, 1)[0]);

        continue;
      }

      throw new Error(`Argument could not be resolved, no lifetime could be found `);
    }

    return args;
  }

  // Need to recursively go through the branch, from bottom to it has reached
  // the top
  cycleCount = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (cycleCount++ > 10000) {
      throw new Error('Recursion in producer step');
    }

    const edges = resolvingDependenciesBranch.edges();

    if (edges.length === 0) {
      if (!resolvingDependenciesBranch.isEmpty()) {
        throw new Error('Graph contains nodes which never got removed');
      }

      break;
    }

    for (const { data } of edges) {
      const lookupRegistered = registeredServices.get(data.registrationId);
      if (lookupRegistered === undefined) {
        throw new Error(`${'anonymous'} is not registered`);
      }

      switch (data.lifetime) {
        case Lifetimes.Singleton: {
          // Check if dependency is already resolved
          const alreadyResolvedService = globalContext.retrieve(data.id);
          if (alreadyResolvedService === undefined) {
            globalContext.add(data.id, new lookupRegistered.ctor(...retrieveArgs(data.registrationId)));
          }

          break;
        }

        case Lifetimes.Scoped: {
          // Check if dependency is already resolved
          const alreadyResolvedService = resolvedScopedServices.retrieve(data.id);
          if (alreadyResolvedService === undefined) {
            resolvedScopedServices.add(data.id, new lookupRegistered.ctor(...retrieveArgs(data.registrationId)));
          }

          break;
        }

        case Lifetimes.Transient: {
          const parentId = data.parentId ?? transientRoot;
          const shouldCreateStorage = !resolvedTransientServices.isInstanced(parentId);
          const resolvedTransientInstance = new lookupRegistered.ctor(...retrieveArgs(data.registrationId));

          if (shouldCreateStorage) {
            resolvedTransientServices.add(parentId, [resolvedTransientInstance]);
          } else {
            // The check has already been done above so it's fine to cast this
            // as a non null
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            resolvedTransientServices.retrieve(parentId)!.push(resolvedTransientInstance);
          }

          break;
        }

        default:
          throw new Error(`The service lacks a lifetime`);
      }

      resolvingDependenciesBranch.removeNode(data.id);
    }
  }

  // --------- Retrieve step ---------

  if (registeredCtor.settings.lifeTime === Lifetimes.Scoped) {
    return resolvedScopedServices.retrieve(resolvingCtor) as T; // Casting as T since by this point it SHOULD be in resolved_scoped_services
  }

  if (registeredCtor.settings.lifeTime === Lifetimes.Transient) {
    const resolvedTransientInstances = resolvedTransientServices.retrieve(transientRoot);
    if (resolvedTransientInstances === undefined) {
      throw new Error(`transient root was never created`);
    }

    return resolvedTransientInstances[0] as T; // Casting as T since by this point the index 0 SHOULD be the requested resolving_ctor instance
  }

  return globalContext.retrieve(resolvingCtor) as T; // Casting as T since by this point it SHOULD be in resolved_singleton_services
}
