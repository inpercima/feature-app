import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Note } from './note';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.api}note`);
  }

  public save(form: any): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}note`, form).pipe(map(response => response !== null && response));
  }
}
