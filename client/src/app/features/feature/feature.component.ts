import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Admin } from '../admin/admin';
import { AdminService } from '../admin/admin.service';
import { FeatureService } from './feature.service';
import { Member } from '../member/member';
import { MemberService } from '../member/member.service';

@Component({
  selector: 'fa-feature',
  templateUrl: './feature.component.html',
  styles: ['./feature.component.css'],
})
export class FeatureComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private adminService: AdminService,
    private memberService: MemberService, private featureService: FeatureService) { }

  protected date: Date;

  protected admin = {} as Admin;

  protected members: Member[];

  protected membersAsString = '';

  protected filteredLocations: Observable<string[]>;

  protected filteredPhotographer: Observable<string[]>;

  protected featureForm: FormGroup;

  ngOnInit() {
    this.date = new Date();
    this.featureForm = this.formBuilder.group({
      photographer: ['', '', this.usedUserValidator()],
      location: [''],
      member: [''],
    });
    this.adminService.listAll().subscribe(admin => {
      this.admin = admin;
      this.filteredPhotographer = this.featureForm.get('photographer').valueChanges.pipe(startWith(''), map(value => {
        return this.admin.photographer.split(',').filter(photographer => photographer.toLowerCase().includes(value.toLowerCase()));
      }));
      this.filteredLocations = this.featureForm.get('location').valueChanges.pipe(startWith(''), map(value => {
        return this.admin.locations.split(',').filter(location => location.toLowerCase().includes(value.toLowerCase()));
      }));
      this.memberService.list().subscribe(members => {
        this.members = members;
        members.forEach(member => this.membersAsString += `@${member.username} `);
        this.membersAsString = this.membersAsString.trim();
      });
    });
  }

  openSnackBar() {
    this.snackBar.open('copied to clipboard', '', {
      duration: 2000,
    });
  }

  usedUserValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      // return null to show there is no error
      return this.featureService.checkUser(control.value).pipe(map(value => value.length ? { 'featured': true } : null));
    };
  }

}
