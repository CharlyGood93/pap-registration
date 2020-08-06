import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) { }

  async generateToast(config: any) {
    const toast = await this.toastCtrl.create({
      message: config.message,
      duration: config.duration,
      color: config.color
    });
    await toast.present();
  }

  async generateLoading(msg: string) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      duration: 500
    });
    await loading.present();
    await loading.onDidDismiss();
  }

  setSession(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getSession(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  destroySession(key) {
    return localStorage.removeItem(key);
  }

}
