import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppRoutingPipe } from './app-routing.pipe';
import { AuthModule } from './auth/auth.module';
import { StorageService } from './core/storage.service';
import { FeaturesModule } from './features/features.module';
import { MaterialModule } from './shared/material/material.module';

export function jwtOptionsFactory(storageService: any): any {
  return {
    tokenGetter: () => {
      return storageService.getToken();
    },
    allowedDomains: ['localhost:8080'],
    disallowedRoutes: [
      /http:\/\/localhost:8080\/api\/auth\/*/,
    ],
  };
}

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [StorageService],
      },
    }),
    OverlayModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule,
    FeaturesModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
