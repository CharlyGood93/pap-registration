import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../utils/utils.service';
import { AuthFactoryService } from '../../core/factory/auth-factory.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  formSigninSignup: FormGroup;
  config: any;

  constructor(private navCtrl: NavController, private toatsCtrl: ToastController, private fb: FormBuilder,
    private utils: UtilsService, private authFactory: AuthFactoryService) {
  }

  ngOnInit() {
    this.formSigninSignup = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    this.validateAuthState();
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

  async loginFirebase(email: string, password: string) {
    const signin = await this.authFactory.signin(email, password);
    if (signin) {
      this.utils.generateLoading('Iniciando sesión...');
      this.navCtrl.navigateForward(['/list-pap']);
    } else {
      this.config = {
        message: 'El usuario y/o password son incorrectos',
        duration: 2000,
        color: 'danger'
      }
      this.utils.generateToast(this.config);
    }
  }

  async signupFirebase(email: string, password: string) {
    const signup = await this.authFactory.signup(email, password);
    if (signup) {
      this.utils.generateLoading('Creando cuenta...');
      this.navCtrl.navigateForward(['/list-pap']);
    } else {
      this.config = {
        message: 'Error al crear la cuenta, reintalo más tarde',
        duration: 2000,
        color: 'danger'
      }
      this.utils.generateToast(this.config);
    }
  }

  formInputIsRequired(input: string) {
    if (this.formSigninSignup.controls[input]) {
      if (this.formSigninSignup.controls[input].hasError('required')) {
        return true;
      }
    }
    return false;
  }

  async validateAuthState() {
    const authState = this.utils.validateAuthState();
    if (authState) {
      this.navCtrl.navigateForward(['/list-pap']);
    }
  }

}
