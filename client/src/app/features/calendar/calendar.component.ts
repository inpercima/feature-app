import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Calendar } from './calendar';
import { CalendarService } from './calendar.service';
import { DialogComponent } from './dialog/dialog.component';
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

  constructor(private formBuilder: FormBuilder, private calendarService: CalendarService, private memberService: MemberService,
              public dialog: MatDialog) { }

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
    this.calendarService.save(this.calendarForm).subscribe(result => this.checkCreation(result));
  }

  createCalendar(): void {
    this.calendarService.createCalendar().subscribe(result => this.calendar = result);
  }

  checkCreation(create: boolean) {
    if (create) {
      this.createCalendar();
      this.isSelected = false;
    }
  }

  changeMember(item: Calendar) {
    this.isSelected = true;
    this.calendarForm.setValue({ member: item.member, date: item.date, representativeMember: '' });
  }

  revert(id: number) {
    this.calendarService.revert(id).subscribe(result => this.checkCreation(result));
  }

  openDialog(item: Calendar): void {
    const dialogRef = this.dialog.open(DialogComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.revert(item.id);
      }
      this.checkCreation(result);
  });
}

}
