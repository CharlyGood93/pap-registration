import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UtilsService } from '../../utils/utils.service';
import { AuthFactoryService } from 'src/app/core/factory/auth-factory.service';
import { RegistryFactoryService } from '../../core/factory/registry-factory.service';

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
  config: any;
  filterOptions: any[] = [
    { name: 'Pendiente' },
    { name: 'Pagado' },
    { name: 'Feriado' },
    { name: 'Todos' },
  ];

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController, private router: Router,
    private utils: UtilsService, private authFactory: AuthFactoryService, private registryFactory: RegistryFactoryService) {
      console.log('construct');
  }

  ngOnInit() {
    console.log('oninit');
    this.getRegistries();
  }

  ionViewWillEnter() {
    this.getRegistries();
  }
  
  async getRegistries() {
    this.owner = localStorage.getItem('owner');
    this.registries = await this.registryFactory.getRegistries(this.owner);
  }

  async logout() {
    const logout = await this.authFactory.logout();
    if (logout) {
      this.utils.generateLoading('Cerrando sesión...');
      this.navCtrl.navigateRoot(['/login']);
    } else {
      this.config = {
        message: 'Error al cerrar sesión',
        duration: 2000,
        color: 'danger'
      };
      this.utils.generateToast(this.config);
    }
  }

  async getFilter(event: any) {
    this.owner = localStorage.getItem('owner');
    const filter = event.detail.value;
    if (filter === 'Todos') {
      this.getRegistries();
    } else {
      this.registries = await this.registryFactory.getRegistriesByFilter(this.owner, filter);
    }
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

  // search(event: any) {
  //   this.registries = [];
  //   this.detail = event.detail.value;
  //   this.detail = this.detail.substring(0, 1).toUpperCase() + this.detail.substring(1);
  //   console.log({ detail: this.detail });
  //   if (this.detail !== '') {
  //     const query = this.db
  //       .where('owner', '==', this.owner)
  //       .where('paymentStatus', '==', this.detail);
  //     query.onSnapshot(snap => {
  //       this.registries = snap.docs;
  //     });
  //   }
  // }

  addNewPAP() {
    this.navCtrl.navigateForward(['/add-pap']);
  }

  viewDetails(registry: firebase.firestore.QueryDocumentSnapshot) {
    this.navCtrl.navigateForward(['/details'], { state: registry });
  }

  formatDatetime(datetime: any) {
    return this.utils.formatDatetime(datetime);
  }

}
