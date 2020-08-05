import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formSigninSignup: FormGroup;

  constructor(private navCtrl: NavController, private toatsCtrl: ToastController, private fb: FormBuilder, private utils: UtilsService) {
    this.formSigninSignup = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    this.validateAuthState();
  }

  ngOnInit() {
  }

  async signinSignup(fg: FormGroup, action: string) {
    if (fg.valid && fg.touched) {
      let email: string = fg.value.email;
      let password: string = fg.value.password;
      if (action === 'signin') {
        this.loginFirebase(email, password);
      } else {
        this.signupFirebase(email, password);
      }
    }
  }

  loginFirebase(email: string, password: string) {
    this.utils.generateLoading('Iniciando sesi&oacute;n...');
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      this.navCtrl.navigateForward(['/list-pap']);
    }).catch(async (err) => {
      const toast: any = await this.toatsCtrl.create({
        message: 'El usuario y/o password son incorrectos',
        duration: 5000,
        color: 'danger'
      });
      toast.present();
    });
  }

  signupFirebase(email: string, password: string) {
    this.utils.generateLoading('Creando cuenta...');
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      this.navCtrl.navigateForward(['/list-pap']);
    }).catch(async (err) => {
      const toast: any = await this.toatsCtrl.create({
        message: 'Error al crear la cuenta, reintalo m%&aacute;s tarde',
        duration: 5000,
        color: 'danger'
      });
      toast.present();
    });
  }

  formInputIsRequired(input: string) {
    if (this.formSigninSignup.controls[input]) {
      if (this.formSigninSignup.controls[input].hasError('required')) {
        return true;
      }
    }
    return false;
  }

  validateAuthState() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navCtrl.navigateForward(['/list-pap']);
      }
    });
  }

}
