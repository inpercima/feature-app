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
  styles: ['./note.component.css'],
})
export class NoteComponent implements OnInit {

  protected members: Member[];

  protected noteForm: FormGroup;

  protected notes: Note[];

  private datePipe = new DatePipe('en-US');

  private now = this.datePipe.transform(Date.now(), 'MM/dd/yyyy');

  constructor(private formBuilder: FormBuilder, private noteService: NoteService, private memberService: MemberService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      member: ['', Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required],
      date: [this.now, Validators.required],
    });

    this.memberService.list().subscribe(result => this.members = result);
    this.loadNotes();
  }

  onSubmit() {
    this.noteForm.get('date').setValue(this.datePipe.transform(this.noteForm.get('date').value, 'yyyy-MM-dd'));
    this.noteService.save(this.noteForm).subscribe(() => {
      this.noteForm.get('date').setValue(this.now);
      this.loadNotes();
      this.openSnackBar();
    });
  }

  openSnackBar() {
    this.snackBar.open('saved', '', {
      duration: 2000,
    });
  }

  private loadNotes() {
    this.noteService.list().subscribe(result => this.notes = result);
  }
}
