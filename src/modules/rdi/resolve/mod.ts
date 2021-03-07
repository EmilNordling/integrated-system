import { registeredServices } from '../_registration';
import type { Ctor } from '../_common';
import { branchStep } from './_1_branch_step';
import { producerStep } from './_2_producer_step';
import { retrieveStep } from './_3_retrieve_step';
import { Resolution, resolutionMap } from './_resolution';

/**
 * Returns an instance, during the process all of its dependencies will also be created.
 */
export function resolve<T>(token: Ctor<T>): T {
  if (token === undefined) {
    throw new Error(`Retrieved undefined, this is caused of circular JS imports`);
  }

  const registration = registeredServices.get(token);
  if (registration === undefined) {
    throw new Error(`ctor is not registered`);
  }

  // The idea with the weak map usage here is to help the garbage collector
  // by not storing all the contextualized data through out the different
  // scopes.
  const resolutionKey = {};
  resolutionMap.set(resolutionKey, new Resolution(token, registration));

  branchStep(resolutionKey);
  producerStep(resolutionKey);
  const final = retrieveStep<T>(resolutionKey);

  return final;
}
