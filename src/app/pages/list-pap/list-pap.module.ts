import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPapPageRoutingModule } from './list-pap-routing.module';

import { ListPapPage } from './list-pap.page';
import { FooterPage } from 'src/app/shared/footer/footer.page';
import { HeaderPage } from '../../shared/header/header.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPapPageRoutingModule
  ],
  declarations: [ListPapPage, HeaderPage, FooterPage]
})
export class ListPapPageModule {}
