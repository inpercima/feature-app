import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from '../../core/config.service';
import { FormService } from '../../core/form.service';
import { Note } from './note';

@Injectable()
export class NoteService {

  constructor(private formService: FormService, private http: HttpClient, private configService: ConfigService) { }

  public list(): Observable<Note[]> {
    return this.http.get<Note[]>(this.configService.getApi() + '/notes');
  }

  public save(formGroup: FormGroup): Observable<boolean> {
    const body = this.formService.createBody(formGroup);
    const header = this.formService.createHeader();
    return this.http.post<boolean>('./note.handler.php', body, header).pipe(map(response => {
      return response !== null && response;
    }));
  }

}
