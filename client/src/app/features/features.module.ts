import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeatureComponent } from './feature/feature.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { MemberComponent } from './member/member.component';

@NgModule({
  declarations: [
    AdminComponent,
    CalendarComponent,
    FeatureComponent,
    MemberComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
  ],
})
export class FeaturesModule { }
