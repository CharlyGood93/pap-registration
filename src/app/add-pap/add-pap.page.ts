import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-pap',
  templateUrl: './add-pap.page.html',
  styleUrls: ['./add-pap.page.scss'],
})
export class AddPapPage implements OnInit {


  date: Date;
  holiday: boolean = false;
  paymentStatus: string;
  project: string;
  papType: string;
  papDescription: string;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.navigateBack(['/tabs']);
  }

  getHoliday(event: any) {
    console.log(event.detail.checked);
    if (event.detail.checked) {
      this.holiday = true;
    }
  }

  addNewPAP() {
    console.log({ msg: 'Se añadio un nuevo PaP a tus registros' });
  }

}
