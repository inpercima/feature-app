import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Calendar } from './calendar';
import { CalendarService } from './calendar.service';
import { Member } from '../member/member';
import { MemberService } from '../member/member.service';

@Component({
  selector: 'fa-calendar',
  templateUrl: './calendar.component.html',
  styles: ['./calendar.component.css'],
})

export class CalendarComponent implements OnInit {

  protected calendar: Calendar[];

  protected members: Member[];

  protected calendarForm: FormGroup;

  protected isSelected: boolean;

  constructor(private formBuilder: FormBuilder, private calendarService: CalendarService, private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.list().subscribe(members => this.members = members);
    this.createCalendar();
    this.calendarForm = this.formBuilder.group({
      date: [''],
      member: [''],
      representativeMember: ['', Validators.required],
    });
  }

  onSubmit() {
    this.calendarService.save(this.calendarForm).subscribe(result => {
      if (result) {
        this.createCalendar();
        this.isSelected = false;
      }
    });
  }

  createCalendar(): void {
   this.calendarService.createCalendar().subscribe(result => this.calendar = result);
  }

  changeMember(item: Calendar) {
    this.isSelected = true;
    this.calendarForm.setValue({ member: item.member, date: item.date, representativeMember: '' });
  }

  revert(date: string) {
    this.calendarService.revert(date).subscribe(result => {
      if (result) {
        this.createCalendar();
        this.isSelected = false;
      }
    });
  }

}
