import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import config from '../../config.json';
import { AuthGuard } from '../core/auth-guard.service';
import { FeatureComponent } from './feature/feature.component';

const routes: Routes = [{
  canActivate: [AuthGuard],
  component: FeatureComponent,
  path: (<any>config).routes.default,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class FeaturesRoutingModule {

  public static ROUTES = routes;

}
