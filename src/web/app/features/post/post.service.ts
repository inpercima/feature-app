import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Post } from './post';

import { environment } from '../../../environments/environment';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api}post${environment.apiSuffix}`);
  }

  public delete(): void {
    this.http.delete(`${environment.api}post${environment.apiSuffix}`).subscribe();
  }

  public save(): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}post${environment.apiSuffix}`, {});
  }

}
