import { Injectable } from '@angular/core';
import { AuthProviderService } from '../provider/auth-provider.service';
import { UtilsService } from '../../utils/utils.service';

@Injectable({
  providedIn: 'root'
})

export class AuthFactoryService {

  status: boolean = false;

  constructor(private authProvider: AuthProviderService, private utils: UtilsService) { }

  async signin(email: string, password: string) {
    const signin = await this.authProvider.signin(email, password);
    if (signin.code === 0) {
      this.utils.setSession('user', signin.user);
      this.status = true;
    }
    return this.status;
  }

  async signup(email: string, password: string) {
    const signup = await this.authProvider.signup(email, password);
    console.log({ signup });
    if (signup.code === 0) {
      this.utils.setSession('user', signup.user);
      this.status = true;
    }
    return this.status;
  }

  async logout() {
    const logout = await this.authProvider.logout();
    if (logout) {
      this.status = true;
    }
    return this.status;
  }

}
