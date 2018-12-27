import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeatureComponent } from './feature/feature.component';
import { MemberComponent } from './member/member.component';
import { NoteComponent } from './note/note.component';
import { PostComponent } from './post/post.component';

import { environment } from '../../environments/environment';

const routes: Routes = [{
  canActivate: [AuthGuard],
  component: FeatureComponent,
  path: environment.defaultRoute,
}, {
  canActivate: [AuthGuard],
  component: PostComponent,
  path: 'posts',
}, {
  canActivate: [AuthGuard],
  component: CalendarComponent,
  path: 'calendar',
}, {
  canActivate: [AuthGuard],
  component: NoteComponent,
  path: 'notes',
}, {
  canActivate: [AuthGuard],
  component: MemberComponent,
  path: 'members',
}, {
  canActivate: [AuthGuard],
  component: AdminComponent,
  path: 'admin',
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class FeaturesRoutingModule {

  public static ROUTES = routes;

}
