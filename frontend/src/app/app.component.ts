import { Component, Inject, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AppRoutingPipe } from './app-routing.pipe';
import { routes } from './app.routes';

@Component({
  imports: [MatButtonModule, MatDialogModule, MatToolbarModule, MatTabsModule, AppRoutingPipe, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'fa-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  appname: string;
  routes: Routes;

  public constructor(
    private dialog: MatDialog,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.appname = environment.appname;
    this.routes = routes;
    this.titleService.setTitle(this.appname);
    this.document.body.classList.add(`${environment.theme}-theme`);
  }

  openDialog(ref: TemplateRef<Element>): void {
    this.dialog.open(ref, {
      maxWidth: '800px',
    });
  }
}
