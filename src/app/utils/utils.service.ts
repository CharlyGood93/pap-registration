import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private datePipe: DatePipe) { }

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

  formatDatetime(datetime: any) {
    console.log({ datetime });
    const convert = datetime * 1000;
    console.log({ convert });
    const transform = this.datePipe.transform(convert, 'dd/MM/yyyy HH:mm:ss a');
    console.log({ transform });
    return transform;
  }

}
