import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class FeatureService {

  constructor(private http: HttpClient) { }

  public checkUser(username: string): Observable<any> {
    return this.http.get<any>(`${environment.api}posts${environment.apiSuffix}?photographer=${username}`);
  }

}
