import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Member } from './member';
import * as member from './member.json';

@Injectable()
export class MemberService {

  constructor() { }

  public list(): Observable<Member[]> {
    if (environment.mode === 'nonedb') {
      return of(member.members);
    }
  }

}
