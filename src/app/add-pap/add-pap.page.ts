import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pap',
  templateUrl: './add-pap.page.html',
  styleUrls: ['./add-pap.page.scss'],
})
export class AddPapPage implements OnInit {

  formAddNewPAP: FormGroup;

  constructor(private navCtrl: NavController, private fb: FormBuilder) {
    this.formAddNewPAP = this.fb.group({
      datetime: ['', Validators.required],
      holiday: [null, Validators.required],
      paymentStatus: ['', Validators.required],
      project: ['', Validators.required],
      papType: ['', Validators.required],
      papDescription: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.navigateBack(['/tabs']);
  }

  getHoliday(event: any) {
    console.log(event);
    this.formAddNewPAP.value.holiday = event.detail.checked;
  }

  getDateTime(event: any) {
    console.log(event.detail.value);
    this.formAddNewPAP.value.datetime = event.detail.value;
  }

  addNewPAP(formAddNewPAP: FormGroup) {
    console.log(formAddNewPAP);
  }

  formInputIsRequired(input: string) {
    if (this.formAddNewPAP.controls[input]) {
      if (this.formAddNewPAP.value.input === "" && this.formAddNewPAP.controls[input].hasError('required')) {
        return true;
      }
    }
    return false;
  }

}
