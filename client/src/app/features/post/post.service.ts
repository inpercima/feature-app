import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Post } from './post';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  list(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api}post`);
  }

  save(posts: Post[]): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}post`, posts);
  }

  delete(): Observable<any> {
    return this.http.delete(`${environment.api}post`);
  }
}
