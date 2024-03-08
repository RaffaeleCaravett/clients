import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'search',
    loadChildren: () => import('./components/search/search.module').then(m => m.SearchModule),canActivate:[AuthGuard]
  },
  {
    path:'forms',
    loadChildren: () => import('./components/forms/forms.module').then(m => m.FormssModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
