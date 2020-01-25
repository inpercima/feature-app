import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { RequestService } from 'src/app/core/request.service';

@Injectable()
export class FeatureService {

  constructor(private http: HttpClient, private requestService: RequestService) { }

  public checkUser(username: string): Observable<any> {
    return this.http.get<any>(this.requestService.url('post', `?photographer=${username}`));
  }

}
