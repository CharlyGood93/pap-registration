import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-list-pap',
  templateUrl: './list-pap.page.html',
  styleUrls: ['./list-pap.page.scss'],
})
export class ListPapPage implements OnInit {

  owner: string = '0ECBzgT7raNPjUEUWk8DnhOFqo83';
  registries: any[] = [];
  db: any = firebase.firestore().collection('pap-registration');

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.owner = user.uid;
      }
    });
    this.getRegistries();
  }

  ngOnInit() {

  }

  getRegistries() {
    const query = this.db.orderBy('paymentStatus', 'desc')
      .where('owner', '==', this.owner);
    query.onSnapshot(snap => {
      this.registries = snap.docs;
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.navigateRoot('/login');
    }).catch(async (err) => {
      const toast = await this.toastCtrl.create({
        message: 'Error al cerrar sesi&oacute;n',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    });
  }

  async deleteRegistry(registry: firebase.firestore.QueryDocumentSnapshot) {
    const deleteAlert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Registro',
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
            console.log(registry.id);
            this.db.doc(registry.id).delete().then(async () => {
              const toast = await this.toastCtrl.create({
                message: 'Registro eliminado correctamente',
                duration: 3000,
                color: 'primary'
              });
              toast.present();
            }).catch(async (err) => {
              const toast = await this.toastCtrl.create({
                message: 'Error al eliminar registro',
                duration: 3000,
                color: 'danger'
              });
              toast.present();
            });
          }
        }
      ]
    });
    await deleteAlert.present();
  }

  search(event: any) {
    this.registries = [];
    let detail: string = event.detail.value;
    detail = detail.substring(0,1).toUpperCase() + detail.substring(1);
    console.log({ detail });
    if (detail !== '') {
      const query = this.db
        .where('owner', '==', this.owner)
        .where('paymentStatus', '==', detail);
      query.onSnapshot(snap => {
        this.registries = snap.docs;
      });
      console.log(this.registries);
    } else {
      this.getRegistries();
    }
  }

  addNewPAP() {
    this.navCtrl.navigateForward(['/add-pap']);
  }

  getDate(timestamp: firebase.firestore.Timestamp) {
    const date = timestamp.toDate();
    return date.toLocaleString();
  }

}
