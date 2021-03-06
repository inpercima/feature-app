import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const result = this.authService.isAuthenticated();
    if (!result) {
      // store the attempted URL for redirecting
      this.authService.redirectUrl = state.url;
      // not authenticated, navigate to the login page
      this.router.navigate(['login']);
      return false;
    } else {
      // authorized
      return true;
    }
  }
}
