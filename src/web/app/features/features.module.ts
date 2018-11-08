import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin/admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeatureComponent } from './feature/feature.component';
import { MemberComponent } from './member/member.component';
import { MemberService } from './member/member.service';
import { NoteComponent } from './note/note.component';
import { NoteService } from './note/note.service';
import { PostComponent } from './post/post.component';
import { PostService } from './post/post.service';

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
    FeaturesRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [
    PostService,
    MemberService,
    NoteService,
  ],
})
export class FeaturesModule { }
