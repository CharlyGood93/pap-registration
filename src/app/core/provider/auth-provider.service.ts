import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {

  resp: any;

  constructor() { }

  async signin(email: string, password: string) {
    try {
      const signin = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.resp = {
        code: 0,
        desc: 'Logged in',
        user: signin.user
      };
    } catch (error) {
      this.resp = {
        code: 1,
        desc: 'User or password incorrect',
        user: null
      };
    }
    return this.resp;
  }

  async signup(email: string, password: string) {
    const signup = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(signup);
    try {
      console.log({ msg: 'signup ok' });
      this.resp = {
        code: 0,
        desc: 'User created',
        user: signup.user
      };
    } catch (error) {
      console.log({ msg: 'signup nok' });
      this.resp = {
        code: 1,
        desc: 'Error to create a new user',
        user: null
      };
    }
    return this.resp;
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      console.log(firebase.auth().signOut());
      this.resp = {
        code: 0,
        desc: 'Logged out'
      };
    } catch (error) {
      this.resp = {
        code: 1,
        desc: 'Error to logged out'
      };
    }
    return this.resp;
  }

  async authState() {

  }

}
