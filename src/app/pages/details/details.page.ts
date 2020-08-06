import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  data: any;

  constructor(private router: Router, private navCtrl: NavController, private utils: UtilsService) {
    if (this.router.getCurrentNavigation().extras.state) {
      let data: any = this.router.getCurrentNavigation().extras.state;
      localStorage.setItem('data', JSON.stringify(data));
    }
    this.data = JSON.parse(localStorage.getItem('data'));
    console.log(this.data);
  }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.navigateBack(['/list-pap']);
  }

  formatDatetime(datetime: any) {
    return this.utils.formatDatetime(datetime);
  }

}
