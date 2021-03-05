import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Admin } from '../admin/admin';
import { AdminService } from '../admin/admin.service';
import { FeatureService } from './feature.service';
import { Member } from '../member/member';
import { MemberService } from '../member/member.service';
import { PostService } from '../post/post.service';

@Component({
  selector: 'fa-feature',
  templateUrl: './feature.component.html',
  styles: ['./feature.component.css'],
})
export class FeatureComponent implements OnInit {

  constructor(private clipboard: Clipboard, private formBuilder: FormBuilder, private snackBar: MatSnackBar,
              private adminService: AdminService, private memberService: MemberService, private featureService: FeatureService,
              private postService: PostService) { }

  date!: Date;

  admin = {} as Admin;

  members = [] as Member[];

  membersAsString = '';

  filteredLocations!: Observable<string[]>;

  filteredPhotographer!: Observable<string[]>;

  form = this.formBuilder.group({
    photographer: ['', '', this.usedUserValidator()],
    location: [''],
    member: [''],
  });

  ngOnInit(): void {
    this.date = new Date();
    this.adminService.list().subscribe(admin => {
      this.admin = admin;
      this.filteredPhotographer = this.form.controls.photographer.valueChanges.pipe(startWith(''), map(value => {
        return this.admin.photographer.split(',').filter(photographer => photographer.toLowerCase().includes(value.toLowerCase()));
      }));
      this.filteredLocations = this.form.controls.location.valueChanges.pipe(startWith(''), map(value => {
        return this.admin.locations.split(',').filter(location => location.toLowerCase().includes(value.toLowerCase()));
      }));
      this.memberService.list().subscribe(members => {
        this.members = members;
        members.forEach(member => this.membersAsString += `@${member.username} `);
        this.membersAsString = this.membersAsString.trim();
      });
    });
  }

  copy(): void {
    this.clipboard.copy(document.querySelector('.featureText')?.innerHTML ?? '');
    this.postService.saveOne(this.form.value.photographer).subscribe();
    this.snackBar.open('copied to clipboard', '', { duration: 2000 });
  }

  usedUserValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      // return null to show there is no error
      return this.featureService.checkUser(control.value).pipe(map(value => value.length ? { featured: true } : null));
    };
  }
}
