import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Member } from '../member/member';
import { MemberService } from '../member/member.service';
import { Calendar } from './calendar';
import { CalendarService } from './calendar.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'fa-calendar',
  templateUrl: './calendar.component.html',
  styles: ['./calendar.component.css'],
})

export class CalendarComponent implements OnInit {

  calendar!: Calendar[];

  members!: Member[];

  form = this.formBuilder.group({
    date: [''],
    member: [''],
    representativeMember: ['', Validators.required],
  });

  isSelected = false;

  constructor(private formBuilder: FormBuilder, private calendarService: CalendarService, private memberService: MemberService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.memberService.list().subscribe(members => this.members = members);
    this.createCalendar();
  }

  onSubmit(): void {
    this.calendarService.save(this.form).subscribe(result => this.checkCreation(result));
  }

  createCalendar(): void {
    this.calendarService.createCalendar().subscribe(result => this.calendar = result);
  }

  checkCreation(create: boolean): void {
    if (create) {
      this.createCalendar();
      this.isSelected = false;
    }
  }

  changeMember(item: Calendar): void {
    this.isSelected = true;
    this.form.setValue({ member: item.member, date: item.date, representativeMember: '' });
  }

  revert(id: number): void {
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
