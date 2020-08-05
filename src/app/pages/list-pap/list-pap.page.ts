import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-list-pap',
  templateUrl: './list-pap.page.html',
  styleUrls: ['./list-pap.page.scss'],
})
export class ListPapPage implements OnInit {

  owner: string = '';
  registries: any[] = [];
  db: any = firebase.firestore().collection('pap-registration');
  detail: string = '';
  notFound: boolean = false;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController, private router: Router,
    private utils: UtilsService) {
  }

  ngOnInit() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.owner = user.uid;
    //   }
    // });
    let user = firebase.auth().currentUser;
    // console.log({ user });
    if (user != null) {
      localStorage.setItem('owner', user.uid);
      // this.owner = user.uid;
      // console.log({ owner: this.owner });
    }
    this.getRegistries();
  }

  getRegistries() {
    this.owner = localStorage.getItem('owner');
    const query = this.db.orderBy('paymentStatus', 'desc')
      .where('owner', '==', this.owner);
    query.onSnapshot(snap => {
      this.registries = snap.docs;
    });
  }

  logout() {
    this.utils.generateLoading('Cerrando sesi&oacuten;n...');
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

  async updateRegistry(registry: firebase.firestore.QueryDocumentSnapshot) {
    const updateAlert = await this.alertCtrl.create({
      header: 'Actualizar Registro',
      subHeader: 'Se actualizará el estado de pago',
      message: '&#191;Est&aacute;s seguro de continuar&#63;',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log({ msg: 'Se cancelo la actualización del estado de pago' });
          }
        },
        {
          text: 'Actualizar',
          role: 'update',
          handler: () => {
            this.db.doc(registry.id).update({
              paymentStatus: 'Pagado'
            }).then(async () => {
              const toast = await this.toastCtrl.create({
                message: 'Estado de pago actualizado correctamente',
                duration: 3000,
                color: 'primary'
              });
              toast.present();
            }).catch(async (err) => {
              const toast = await this.toastCtrl.create({
                message: 'Error al actualizar el estado de pago',
                duration: 3000,
                color: 'danger'
              });
              toast.present();
            });
          }
        }
      ]
    });
    await updateAlert.present();
  }

  async deleteRegistry(registry: firebase.firestore.QueryDocumentSnapshot) {
    const deleteAlert = await this.alertCtrl.create({
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
    this.detail = event.detail.value;
    this.detail = this.detail.substring(0, 1).toUpperCase() + this.detail.substring(1);
    console.log({ detail: this.detail });
    if (this.detail !== '') {
      const query = this.db
        .where('owner', '==', this.owner)
        .where('paymentStatus', '==', this.detail);
      query.onSnapshot(snap => {
        this.registries = snap.docs;
      });
    }
  }

  addNewPAP() {
    this.navCtrl.navigateForward(['/add-pap']);
  }

  viewDetails(registry: firebase.firestore.QueryDocumentSnapshot) {
    this.navCtrl.navigateForward(['/details'], { state: registry });
  }

}
