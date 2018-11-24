import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormService } from '../../core/form.service';
import { Note } from './note';

import { environment } from '../../../environments/environment';

@Injectable()
export class NoteService {

  constructor(private formService: FormService, private http: HttpClient) { }

  public list(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.api}notes${environment.apiSuffix}`);
  }

  public save(formGroup: FormGroup): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}notes${environment.apiSuffix}`, formGroup.value).pipe(map(response => {
      return response !== null && response;
    }));
  }

}
