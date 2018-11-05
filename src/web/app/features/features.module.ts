import { NgModule } from '@angular/core';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeatureComponent } from './feature/feature.component';

@NgModule({
  declarations: [
    FeatureComponent,
  ],
  imports: [
    FeaturesRoutingModule,
  ],
})
export class FeaturesModule { }
