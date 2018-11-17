import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Admin } from './admin';
import { ConfigService } from '../../core/config.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  public listAll(): Observable<Admin> {
    return this.http.get<Admin>(`${this.configService.getApi()}/admin`);
  }

}
