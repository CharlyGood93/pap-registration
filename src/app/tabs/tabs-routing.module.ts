import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../list-pap/list-pap-routing.module').then(m => m.ListPapPageRoutingModule)
      },
      {
        path: 'add',
        loadChildren: () => import('../add-pap/add-pap-routing.module').then(m => m.AddPapPageRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
