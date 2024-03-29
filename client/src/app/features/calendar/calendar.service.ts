import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdminService } from '../admin/admin.service';
import { MemberService } from '../member/member.service';
import { Member } from '../member/member';
import { Calendar } from './calendar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // Millisekunden für ein Tag, 24h*60m*60s*1000m
  private ONE_DAY = 86400000;

  private members!: Member[];

  constructor(private http: HttpClient, private adminService: AdminService, private memberService: MemberService) { }

  public createCalendar(): Observable<Calendar[]> {
    this.memberService.list().subscribe(members => this.members = members);
    return this.http.get<Calendar[]>(`${environment.api}calendar`).pipe(map(response => {
      const calendar: Calendar[] = [];
      const currentDateMidnight = this.getDateMidnight(null);
      this.daysBetween(currentDateMidnight).subscribe(days => {
        let calendarDate = currentDateMidnight;
        let index = this.getStartIndex(days);
        for (let i = 0; i < 60; i++) {
          index = this.getIndex(index);
          const user = this.members.find(member => Number(member.id) === index);
          index++;
          if (user) {
            const item = this.createCalendarItem(calendarDate, user);
            calendarDate = this.updateDate(calendarDate);
            if (response.length) {
              response.forEach(value => {
                if (item.date.includes(formatDate(value.date, 'MM/dd/yyyy', 'en-US'))) {
                  item.id = value.id;
                  item.isChanged = true;
                  item.representativeMember = value.representativeMember;
                }
              });
            }
            calendar.push(item);
          }
        }
      });
      return calendar;
    }));
  }

  /**
   * Calculates the days between the start date and the current date.
   */
  private daysBetween(currentDate: Date): Observable<number> {
    return this.adminService.list().pipe(map(response => {
      const startDate = this.getDateMidnight(response.startDate.replace(/-/g, '/'));
      return Math.round(Math.abs((startDate.getTime() - currentDate.getTime()) / this.ONE_DAY));
    }));
  }

  /**
   * For the parameter 'current' = true, the current day is used to set the time to midnight.
   * With 'current' = false, the date in parameter 'date' is used.
   */
  private getDateMidnight(date: string | null): Date {
    const currentDate = date ? new Date(`${date} 00:00:00`) : new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }

  private createCalendarItem(date: Date, member: Member): Calendar {
    const item = {} as Calendar;
    item.member = member.username;
    item.date = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
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

  public save(form: FormGroup): Observable<boolean> {
    form.get('date')?.setValue(formatDate(form.value.date, 'yyyy-MM-dd', 'en-US'));
    return this.http.post<boolean>(`${environment.api}calendar`, form.value).pipe(map(response => response !== null && response));
  }

  public revert(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api}calendar.php/${id}`).pipe(map(response => response !== null && response));
  }
}
