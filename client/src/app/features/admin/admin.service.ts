import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Admin } from './admin';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public listAll(): Observable<Admin> {
    return this.http.get<Admin>(`${environment.api}admin${environment.apiSuffix}`);
  }

  public save(formGroup: FormGroup): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}admin${environment.apiSuffix}`, formGroup.value).pipe(map(response => {
      return response !== null && response;
    }));
  }

}
