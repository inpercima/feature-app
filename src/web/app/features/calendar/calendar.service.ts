import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdminService } from '../admin/admin.service';
import { Calendar } from './calendar';
import { FormService } from '../../core/form.service';

@Injectable()
export class CalendarService {

  // Millisekunden für ein Tag, 24h*60m*60s*1000m
  public ONE_DAY = 86400000;

  constructor(private formService: FormService, private http: HttpClient, private adminService: AdminService) { }

  public createCalendar(): Observable<Calendar[]> {
    let currentDateMidnight: Date = this.getDateMidnight(true, null);
    let index: number;

    return this.http.get<Calendar[]>(`./calendar.handler.php`).pipe(map(response => {
      const calendar: Calendar[] = [];
      this.daysBetween(currentDateMidnight).subscribe(days => {
        index = this.getStartIndex(days);
      });

      for (let i = 0; i < 60; i++) {
        index = this.getIndex(index);
        const item: Calendar = this.createCalendarItem(currentDateMidnight, index);
        index++;
        currentDateMidnight = this.updateDate(currentDateMidnight);
        if (response.length) {
          response.forEach(function(value) {
            if (value.date === item.date) {
              item.isChanged = true;
              item.representativeMember = value.representativeMember;
            }
          });
        }
        calendar.push(item);
      }
      return calendar;
    }));
  }

  /**
   * Berechnet die Tage die zwischen dem Startdatum und dem aktuellem Datum liegen.
   */
  private daysBetween(currentDate: Date): Observable<number> {
    return this.adminService.listAll().pipe(map(response => {
      const startDate = this.getDateMidnight(false, response.startDate);
      return Math.round(Math.abs((startDate.getTime() - currentDate.getTime()) / this.ONE_DAY));
    }));
  }

  /**
   * Beim Parameter current, wird der aktuelle Tag verwendet, um die Uhrzeit auf Mitternacht zu setzen.
   * Bei current false wird das hinterlegte Datum verwendet.
   */
  private getDateMidnight(current: boolean, date: string): Date {
    const currentDate = current ? new Date() : new Date(`${date} 00:00:00`);
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }

  private createCalendarItem(date: Date, index: number): Calendar {
    const item = {} as Calendar;
    const user = this.CALENDAR_USERS[index];
    item.member = item.member = user + (date.getDay() === 2 && user === 'Dean' ? 'stag' : '');
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
    item.date = date.toLocaleDateString('de-DE', options);
    return item;
  }

  private getStartIndex(days: number): number {
    let index = 0;
    for (let i = 0; i < days; i++) {
      index = this.getIndex(index);
      index++;
    }
    return index;
  }

  private getIndex(index: number): number {
    return index < 5 ? index : 0;
  }

  private updateDate(date: Date): Date {
    const newDate: Date = new Date(date.getTime() + this.ONE_DAY);
    return new Date(newDate.getTime() + (date.getTimezoneOffset() < newDate.getTimezoneOffset() ? 7200000 : 0));
  }

  public save(formGroup: FormGroup): Observable<boolean> {
    const body = this.formService.createBody(formGroup);
    const header = this.formService.createHeader();
    return this.http.post<boolean>('./calendar.handler.php', body, header).pipe(map(response => {
      return response !== null && response;
    }));
  }

  public revert(date: string): Observable<boolean> {
    return this.http.delete<boolean>(`./calendar.handler.php?date=${date}`).pipe(map(response => {
      return response !== null && response;
    }));
  }

}
