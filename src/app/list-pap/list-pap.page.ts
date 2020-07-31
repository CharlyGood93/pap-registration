import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-pap',
  templateUrl: './list-pap.page.html',
  styleUrls: ['./list-pap.page.scss'],
})
export class ListPapPage implements OnInit {

  test: string = 'pagado';

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  logout() {
    this.navCtrl.navigateRoot('/login');
  }

  async showDetails() {
    const showDetail = await this.alertCtrl.create({
      header: 'Detalle del registro',
      message: this.prepareViewDetails(),
      buttons: ['Cerrar']
    });
    await showDetail.present();
  }

  async editRegistry() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        // multiline input.
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        },
        {
          name: 'name8',
          type: 'password',
          placeholder: 'Advanced Attributes',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteRegistry() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log({ msg: 'Se cancelo la eliminación del registro' });
          }
        },
        {
          text: 'Eliminar',
          role: 'delete',
          handler: () => {
            console.log({ msg: 'Registro eliminado' });
          }
        }
      ]
    });

    await alert.present();
  }

  prepareViewDetails() {
    let html = '';
    html += '<ion-list>';
    html += '<ion-item>';
    html += '<ion-label>Fecha: DD/MM/YYYY</ion-label>';
    html += '</ion-item>';
    html += '<ion-item>';
    html += '<ion-label>Feriadio / Fin de semana: Si</ion-label>';
    html += '</ion-item>';
    html += '<ion-item>';
    html += '<ion-label>Estado de pago: Pagado</ion-label>';
    html += '</ion-item>';
    html += '<ion-item>';
    html += '<ion-label>Proyecto: Registro Movistar Play</ion-label>';
    html += '</ion-item>';
    html += '<ion-item>';
    html += '<ion-label>Tipo PaP: Mejora continua</ion-label>';
    html += '</ion-item>';
    html += '<ion-item>';
    html += '<ion-label>Descripción PaP: Se mejora flujo de no cliente</ion-label>';
    html += '</ion-item>';
    html += '</ion-list>';
    return html;
  }

}
