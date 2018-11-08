import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { environment } from 'src/web/environments/environment';
import * as post from './post.json';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return environment.mode === 'nonedb' ? of(post.posts) : this.http.get<any>('./post.handler.php');
  }

  public delete(): void {
    this.http.delete('./post.handler.php').subscribe();
  }

  public save(): Observable<boolean> {
    return this.http.post<boolean>('./post.handler.php', {});
  }

}
