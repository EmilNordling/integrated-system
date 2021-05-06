import { registeredServices } from '../_registration';
import { branchStep } from './_1_branch_step';
import { producerStep } from './_2_producer_step';
import { retrieveStep } from './_3_retrieve_step';
import { Resolution } from './_resolution';
import type { Ctor } from '../_common';

/**
 * Returns an instance, during the process all of its dependencies will also be created.
 */
export function resolve<T>(token: Ctor<T>): T {
  if (token === undefined) {
    throw new Error(`Retrieved undefined, this is caused of circular JS imports`);
  }

  const registration = registeredServices.get(token);
  if (registration === undefined) {
    throw new Error(`The Token being processed has not been registered yet. Token:
      ${token}
    `);
  }

  const resolution = new Resolution(token, registration);
  branchStep(resolution);
  producerStep(resolution);
  const final_T_value = retrieveStep<T>(resolution);

  return final_T_value;
}
