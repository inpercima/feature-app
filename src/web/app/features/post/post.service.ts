import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from '../../core/config.service';
import { Post } from './post';

@Injectable()
export class PostService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  public list(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.configService.getApi()}/posts`);
  }

  public delete(): void {
    this.http.delete('./post.handler.php').subscribe();
  }

  public save(): Observable<boolean> {
    return this.http.post<boolean>('./post.handler.php', {});
  }

}
