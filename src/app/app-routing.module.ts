import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'add-pap',
    loadChildren: () => import('./pages/add-pap/add-pap.module').then( m => m.AddPapPageModule)
  },
  {
    path: 'list-pap',
    loadChildren: () => import('./pages/list-pap/list-pap.module').then( m => m.ListPapPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },  {
    path: 'footer',
    loadChildren: () => import('./shared/footer/footer.module').then( m => m.FooterPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
