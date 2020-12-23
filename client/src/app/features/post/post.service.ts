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

  public list(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api}post${environment.apiSuffix}?_sort=date&_order=desc`);
  }

  public delete(): void {
    this.http.delete(`${environment.api}post${environment.apiSuffix}/0`).subscribe();
  }

  public save(): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}post${environment.apiSuffix}`, {});
  }

}
