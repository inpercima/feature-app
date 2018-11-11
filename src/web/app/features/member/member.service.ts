import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '../../core/config.service';
import { Member } from './member';

@Injectable()
export class MemberService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  public list(): Observable<Member[]> {
    return this.http.get<any>(this.configService.getApi() + '/members');
  }

}
