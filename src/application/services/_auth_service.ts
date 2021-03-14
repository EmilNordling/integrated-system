import { Singleton } from '@modules/rdi/mod';
import { __registerMetaData } from '@modules/rdi/meta';
import { AuthApiService } from '@api/auth_api.service';
import type { UserModel } from '@api/models/user_model';

@Singleton()
export class AuthService {
  public user: UserModel | null = null;

  constructor(private readonly authApi: AuthApiService) {
    // Empty
  }

  public async fetchActiveUser(): Promise<UserModel> {
    // todo this is test function, it's currently impl bad

    if (this.user === null) {
      const user = await this.authApi.get();
      this.user = user;

      return user;
    }

    return this.user;
  }
}
// A vite plugin will be added later
__registerMetaData(AuthService, [AuthApiService]);
