import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController, private toatsCtrl: ToastController) { }

  ngOnInit() {
  }

  login() {
    this.navCtrl.navigateForward(['/tabs/list']);
  }

  signup() {
    console.log({ msg: 'Signup clicked' });
    this.navCtrl.navigateForward(['/signup']);
  }

}
