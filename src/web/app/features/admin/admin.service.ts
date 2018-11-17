import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Admin } from './admin';
import { ConfigService } from '../../core/config.service';
import { FormService } from '../../core/form.service';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient, private configService: ConfigService, private formService: FormService) { }

  public listAll(): Observable<Admin> {
    return this.http.get<Admin>(`${this.configService.getApi()}/admin`);
  }

  public save(formGroup: FormGroup): Observable<boolean> {
    const body = this.formService.createBody(formGroup);
    const header = this.formService.createHeader();
    return this.http.post<boolean>(`${this.configService.getApi()}/admin`, body, header).pipe(map(response => {
      return response !== null && response;
    }));
  }

}
