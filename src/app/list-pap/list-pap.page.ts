import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

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
    firebase.auth().signOut().then(() => {
      this.navCtrl.navigateRoot('/login');
    }).catch(async (err) => {
      const toast = await this.toastCtrl.create({
        message: 'Error al cerrar sesi&oacute;n',
        duration: 5000,
        color: 'danger'
      });
      toast.present();
    });
  }

  async deleteRegistry() {
    const deleteAlert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Eliminando Registro',
      subHeader: 'Se eliminará de forma permanente',
      message: '&#191;Est&aacute;s seguro de eliminar el registro&#63;',
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
    await deleteAlert.present();
  }

  search(event: any) {
    let detail: string = event.detail.value;
    console.log({ detail });
  }

}
