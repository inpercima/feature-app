import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl!: string;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  /**
   * This is a very simple authentication you should change for production use!
   *
   * @param formGroup loginForm
   */
  login(formGroup: FormGroup) {
    return this.http.post<any>(`${environment.api}auth`, formGroup.value).pipe(map(response => {
      if (response !== null) {
        // set the token property for validate token in the app
        localStorage.setItem('access_token', response.token);
      }
    }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
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
