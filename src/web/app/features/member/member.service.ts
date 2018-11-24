import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Member } from './member';

import { environment } from '../../../environments/environment';

@Injectable()
export class MemberService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Member[]> {
    return this.http.get<Member[]>(`${environment.api}members${environment.apiSuffix}?_sort=id`);
  }

}
