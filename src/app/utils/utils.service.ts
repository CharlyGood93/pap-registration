import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) { }

  async generateBasicToast() {
    const toast = await this.toastCtrl.create({
      message: 'hola mundo',
      duration: 3000,
      color: 'primary'
    });
    return await toast.present();
  }

  async generateLoading(msg: string) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed', role, data);
  }

}
