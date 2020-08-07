import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {

  date: any = new Date();

  constructor() {
    this.date = this.date.getFullYear();
  }

  ngOnInit() {
  }

}
