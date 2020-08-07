import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {

  resp: any;

  constructor() { }

  async signin(email: string, password: string) {
    let user: any;
    try {
      const signin = await firebase.auth().signInWithEmailAndPassword(email, password);
      user = signin.user;
    } catch (error) {
      user = null
    }
    return user;
  }

  async signup(email: string, password: string) {
    let user: any;
    try {
      const signup = await firebase.auth().createUserWithEmailAndPassword(email, password);
      user = signup.user;
    } catch (error) {
      user = null;
    }
    return user;
  }

  async logout() {
    let logout: any;
    try {
      const signout = await firebase.auth().signOut();
      logout = signout;
    } catch (error) {
      logout = null;
    }
    return logout;
    // try {
    //   await firebase.auth().signOut();
    //   console.log(firebase.auth().signOut());
    //   this.resp = {
    //     code: 0,
    //     desc: 'Logged out'
    //   };
    // } catch (error) {
    //   this.resp = {
    //     code: 1,
    //     desc: 'Error to logged out'
    //   };
    // }
    // return this.resp;
  }

  async authState(user: any) {
    let auth: any;
    try {
      const state = firebase.auth().onAuthStateChanged(user);
      auth = state;
    } catch (error) {
      auth = null;
    }
    return auth;
  }

}
