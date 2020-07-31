import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  signup() {
    this.navCtrl.navigateForward(['/tabs/list']);
  }

  goToLogin() {
    this.navCtrl.navigateBack(['/login']);
  }

}
