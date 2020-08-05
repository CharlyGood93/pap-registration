import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPapPageRoutingModule } from './add-pap-routing.module';

import { AddPapPage } from './add-pap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPapPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPapPage]
})
export class AddPapPageModule {}
