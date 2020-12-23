import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material/material.module';
import { AdminComponent } from './admin/admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeatureComponent } from './feature/feature.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { MemberComponent } from './member/member.component';
import { PostComponent } from './post/post.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [
    AdminComponent,
    CalendarComponent,
    FeatureComponent,
    MemberComponent,
    NoteComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    MaterialModule,
  ],
})
export class FeaturesModule { }
