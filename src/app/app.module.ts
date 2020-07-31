import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyAOAkjoOZkVb2fp-YuNbn7GscXzXKGXFNE",
  authDomain: "control-jornadas.firebaseapp.com",
  databaseURL: "https://control-jornadas.firebaseio.com",
  projectId: "control-jornadas",
  storageBucket: "control-jornadas.appspot.com",
  messagingSenderId: "935534527603",
  appId: "1:935534527603:web:88407cdfcf0580b35ad606",
  measurementId: "G-9W8C4GVNKV"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
