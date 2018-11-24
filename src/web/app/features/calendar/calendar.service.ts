import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdminService } from '../admin/admin.service';
import { Calendar } from './calendar';
import { Member } from '../member/member';
import { MemberService } from '../member/member.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class CalendarService {

  // Millisekunden für ein Tag, 24h*60m*60s*1000m
  private ONE_DAY = 86400000;

  protected members: Member[];

  constructor(private http: HttpClient, private adminService: AdminService, private memberService: MemberService) { }

  public createCalendar(): Observable<Calendar[]> {
    this.memberService.list().subscribe(members => this.members = members);
    return this.http.get<Calendar[]>(`${environment.api}calendar${environment.apiSuffix}`).pipe(map(response => {
      const calendar: Calendar[] = [];
      const currentDateMidnigh = this.getDateMidnight(true, null);
      this.daysBetween(currentDateMidnigh).subscribe(days => {
        let calendarDate = currentDateMidnigh;
        let index = this.getStartIndex(days);
        for (let i = 0; i < 60; i++) {
          index = this.getIndex(index);
          const user = this.members.find(member => member.id === index);
          index++;
          const item: Calendar = this.createCalendarItem(calendarDate, user);
          calendarDate = this.updateDate(calendarDate);
          if (response.length) {
            response.forEach(function (value) {
              if (value.date === item.date) {
                item.isChanged = true;
                item.representativeMember = value.representativeMember;
              }
            });
          }
          calendar.push(item);
        }
      });
      return calendar;
    }));
  }

  /**
   * Calculates the days between the start date and the current date.
   */
  private daysBetween(currentDate: Date): Observable<number> {
    return this.adminService.listAll().pipe(map(response => {
      const startDate = this.getDateMidnight(false, response.startDate);
      return Math.round(Math.abs((startDate.getTime() - currentDate.getTime()) / this.ONE_DAY));
    }));
  }

  /**
   * For the parameter 'current' = true, the current day is used to set the time to midnight.
   * With 'current' = false, the date in parameter 'date' is used.
   */
  private getDateMidnight(current: boolean, date: string): Date {
    const currentDate = current ? new Date() : new Date(`${date} 00:00:00`);
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }

  private createCalendarItem(date: Date, member: Member): Calendar {
    const item = {} as Calendar;
    item.member = member.username;
    item.date = date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
    return item;
  }

  private getStartIndex(days: number): number {
    let index = 1;
    for (let i = 0; i < days; i++) {
      index = this.getIndex(index);
      index++;
    }
    return index;
  }

  private getIndex(index: number): number {
    return index <= this.members.length ? index : 1;
  }

  private updateDate(date: Date): Date {
    const newDate: Date = new Date(date.getTime() + this.ONE_DAY);
    return new Date(newDate.getTime() + (date.getTimezoneOffset() < newDate.getTimezoneOffset() ? 7200000 : 0));
  }

  public save(formGroup: FormGroup): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api}calendar${environment.apiSuffix}`, formGroup.value).pipe(map(response => {
      return response !== null && response;
    }));
  }

  public revert(date: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api}calendar${environment.apiSuffix}date=${date}`).pipe(map(response => {
      return response !== null && response;
    }));
  }

}
