import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Member } from '../member/member';
import { MemberService } from '../member/member.service';
import { NoteService } from './note.service';
import { Note } from './note';

@Component({
  selector: 'fa-note',
  templateUrl: './note.component.html',
})
export class NoteComponent implements OnInit {

  protected members: Member[];

  protected noteForm: FormGroup;

  protected notes: Note[];

  constructor(private formBuilder: FormBuilder, private noteService: NoteService, private memberService: MemberService,
    private router: Router) { }

  ngOnInit(): void {
    const date = new DatePipe('de').transform(Date.now(), 'yyyy-MM-dd');
    this.noteForm = this.formBuilder.group({
      member: ['', Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required],
      date: [date, Validators.required],
    });

    this.memberService.list().subscribe(result => {
      this.members = result;
    });
    this.noteService.list().subscribe(result => {
      this.notes = result;
    });
  }

  onSubmit() {
    this.noteService.save(this.noteForm).subscribe(result => {
      if (result) {
      }
    });
  }
}
