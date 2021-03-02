import { Singleton, Timer } from 'one-atom';
import type { UserModel } from './models/user_model';

@Singleton()
export class AuthApiService {
  constructor() {
    // Empty
  }

  public get(): Promise<UserModel> {
    return new Promise((resolve) => {
      Timer.wait(() => {
        resolve({
          id: 'a676947e-9ad8-42d7-976a-42c8142a3541',
          isEmployee: false,
          name: 'Name',
          email: 'email@email-group.com',
        });
      }, 200);
    });
  }
}
