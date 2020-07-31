import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPapPage } from './add-pap.page';

const routes: Routes = [
  {
    path: '',
    component: AddPapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPapPageRoutingModule {}
