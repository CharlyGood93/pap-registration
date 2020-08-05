import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPapPageRoutingModule } from './list-pap-routing.module';

import { ListPapPage } from './list-pap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPapPageRoutingModule
  ],
  declarations: [ListPapPage]
})
export class ListPapPageModule {}
