import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: environment.defaultRoute,
}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {

  public static ROUTES: Routes = routes;

}
