import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPapPage } from './list-pap.page';

const routes: Routes = [
  {
    path: '',
    component: ListPapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPapPageRoutingModule {}
