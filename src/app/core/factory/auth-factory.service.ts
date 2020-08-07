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
    console.log(signin);
    if (signin !== null) {
      this.utils.setSession('user', signin);
      this.status = true;
    }
    return this.status;
  }

  async signup(email: string, password: string) {
    const signup = await this.authProvider.signup(email, password);
    console.log(signup);
    if (signup !== null) {
      this.utils.setSession('user', signup);
      this.status = true;
    }
    return this.status;
  }

  async logout() {
    const signout = await this.authProvider.logout();
    console.log(signout);
    if (signout !== null) {
      this.utils.destroySession('user');
      this.status = true;
    }
    return this.status;
  }

  async authState(user: any) {
    const state = await this.authProvider.authState(user);
    if (state !== null) {
      this.status = true;
    }
    return this.status;
  }

}
