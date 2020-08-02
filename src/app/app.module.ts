import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

firebase.initializeApp({
  apiKey: "AIzaSyC9laqFvej2Rsfkivw8uSQb5RE6n_eIBJY",
  authDomain: "pap-registration.firebaseapp.com",
  databaseURL: "https://pap-registration.firebaseio.com",
  projectId: "pap-registration",
  storageBucket: "pap-registration.appspot.com",
  messagingSenderId: "982457876844",
  appId: "1:982457876844:web:a831e5ecfb42f4d74d7349",
  measurementId: "G-7YXK4NHV6K"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
