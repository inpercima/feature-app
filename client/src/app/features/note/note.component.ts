import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Member } from '../member/member';
import { MemberService } from '../member/member.service';
import { NoteService } from './note.service';
import { Note } from './note';

@Component({
  selector: 'fa-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {

  members!: Member[];

  private datePipe = new DatePipe('en-US');

  private now = this.datePipe.transform(Date.now(), 'MM/dd/yyyy');

  form = this.formBuilder.group({
    member: ['', Validators.required],
    title: ['', Validators.required],
    text: ['', Validators.required],
    date: [this.now, Validators.required],
    dateView: [this.now, Validators.required],
  });

  notes!: Note[];

  constructor(private formBuilder: FormBuilder, private noteService: NoteService, private memberService: MemberService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.memberService.list().subscribe(result => this.members = result);
    this.loadNotes();
  }

  onSubmit(): void {
    this.form.patchValue({ date: this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd') });
    this.noteService.save(this.form.value).subscribe(() => {
      this.loadNotes();
      this.snackBar.open('saved', '', { duration: 2000 });
    });
  }

  private loadNotes(): void {
    this.noteService.list().subscribe(result => this.notes = result);
  }
}
