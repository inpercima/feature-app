import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '../../core/config.service';

@Injectable()
export class FeatureService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  public checkUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.configService.getApi()}/posts?photographer=${username}`);
  }

}
