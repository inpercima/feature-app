import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Admin } from './admin';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  list(): Observable<Admin> {
    return this.http.get<Admin>(`${environment.api}admin`);
  }

  save(form: any): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}admin`, form).pipe(map(response => response !== null && response));
  }
}
