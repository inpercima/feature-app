import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageService } from '../core/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly HEADER_AUTHORIZATION = 'Authorization';
  readonly HEADER_BEARER = 'Bearer ';

  // store the URL so we can redirect after logging in
  redirectUrl!: string;

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) { }

  /**
   * Login
   *
   * @param form form value
   */
  login(form: any): Observable<boolean> {
    return this.http.post(`${environment.api}auth`, form, { observe: 'response' }).pipe(map(response => {
      const header = response.headers.get(this.HEADER_AUTHORIZATION);
      if (header !== null) {
        this.storageService.saveToken(header.substr(7));
      }
      if (this.isAuthenticated()) {
        // get the redirect URL from auth service
        // if no redirect has been set, use default
        this.router.navigate([this.redirectUrl ? this.redirectUrl : environment.defaultRoute]);
      }
      return this.isAuthenticated();
    }));
  }

  logout(): void {
    this.storageService.clear();
    this.router.navigate(['login']);
  }

  isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const token = this.storageService.getToken();
    try {
      return token ? !helper.isTokenExpired(token) : false;
    } catch (e) {
      return false;
    }
  }
}
