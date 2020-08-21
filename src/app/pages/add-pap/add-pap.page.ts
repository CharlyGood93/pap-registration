import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UtilsService } from '../../utils/utils.service';
import { RegistryFactoryService } from '../../core/factory/registry-factory.service';

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
  config: any;

  constructor(private navCtrl: NavController, private fb: FormBuilder, private toastCtrl: ToastController,
    private router: Router, private utils: UtilsService, private registryFactory: RegistryFactoryService) {
    this.formAddNewPAP = this.fb.group({
      datetime: ['', Validators.required],
      holiday: [null],
      paymentStatus: ['', Validators.required],
      project: ['', Validators.required],
      papType: ['', Validators.required],
      papDescription: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.owner = localStorage.getItem('owner');
    console.log({ owner: this.owner });
  }

  goToBack() {
    this.navCtrl.navigateBack(['/list-pap']);
  }

  async addNewPAP(formAddNewPAP: FormGroup) {
    const data = formAddNewPAP.value;
    const registry = this.registryFactory.addRegistry(data, this.owner);
    if (registry) {
      this.config = {
        message: 'Nuevo PAP Registrado con &eacute;xito',
        duration: 2000,
        color: 'primary'
      };
    } else {
      this.config = {
        message: 'Error al a&ntilde;adir un nuevo registro',
        duration: 2000,
        color: 'danger'
      };
    }
    this.utils.generateToast(this.config);
    this.router.navigate(['/list-pap']);
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
