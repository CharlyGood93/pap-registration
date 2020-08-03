import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-pap',
  templateUrl: './add-pap.page.html',
  styleUrls: ['./add-pap.page.scss'],
})
export class AddPapPage implements OnInit {

  formAddNewPAP: FormGroup;
  chargeDataSelect: any = {
    project: [
      { name: 'Registro Movistar Play' }
    ],
    paymentStatus: [
      { name: 'Pendiente' },
      { name: 'Pagado' }
    ],
    papType: [
      { name: 'Incidencia' },
      { name: 'Mejora Continua' }
    ]
  };
  owner: string = '';

  constructor(private navCtrl: NavController, private fb: FormBuilder, private toastCtrl: ToastController) {
    this.formAddNewPAP = this.fb.group({
      datetime: ['', Validators.required],
      holiday: [null],
      paymentStatus: ['', Validators.required],
      project: ['', Validators.required],
      papType: ['', Validators.required],
      papDescription: ['', Validators.required],
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.owner = user.uid;
      }
    });
  }

  ngOnInit() {

  }

  goToBack() {
    this.navCtrl.navigateBack(['/list-pap']);
  }

  async addNewPAP(formAddNewPAP: FormGroup) {
    const data = formAddNewPAP.value;
    let toast: any;
    if (data.holiday === null) {
      data.holiday = false;
    }
    console.log(data);
    firebase.firestore().collection('pap-registration').add({
      datetime: new Date(data.datetime),
      holiday: data.holiday,
      paymentStatus: data.paymentStatus,
      project: data.project,
      papType: data.papType,
      papDescription: data.papDescription,
      owner: this.owner
    }).then(async (docRef) => {
      toast = await this.toastCtrl.create({
        message: 'Nuevo PAP Registrado con &eacute;xito',
        duration: 3000,
        color: 'primary'
      });
      toast.present();
      this.navCtrl.navigateBack(['/list-pap']);
    }).catch(async (err) => {
      toast = await this.toastCtrl.create({
        message: err.message,
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    });
  }

  formInputIsRequired(input: string) {
    if (this.formAddNewPAP.controls[input]) {
      if (this.formAddNewPAP.controls[input].hasError('required')) {
        return true;
      }
    }
    return false;
  }
  
}
