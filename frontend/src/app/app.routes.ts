import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'feature',
    pathMatch: 'full',
  },
  {
    loadComponent: () => import('./features/empty/empty.component').then((c) => c.EmptyComponent),
    path: environment.defaultRoute,
  },
  {
    loadComponent: () => import('./features/empty/empty.component').then((c) => c.EmptyComponent),
    path: 'posts',
  },
  {
    loadComponent: () => import('./features/empty/empty.component').then((c) => c.EmptyComponent),
    path: 'calendar',
  },
  {
    loadComponent: () => import('./features/empty/empty.component').then((c) => c.EmptyComponent),
    path: 'notes',
  },
  {
    loadComponent: () => import('./features/members/members.component').then((c) => c.MembersComponent),
    path: 'members',
  },
  {
    loadComponent: () => import('./features/empty/empty.component').then((c) => c.EmptyComponent),
    path: 'admin',
  },
];
