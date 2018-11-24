import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminService } from './admin.service';

@Component({
  selector: 'fa-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private snackBar: MatSnackBar) { }

  protected adminForm: FormGroup;

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      accountName: ['', Validators.required],
      featuredTag: ['', Validators.required],
      dateTag: ['', Validators.required],
      locations: ['', Validators.required],
      photographer: ['', Validators.required],
      tags: ['', Validators.required],
      startDate: ['', Validators.required],
    });
    this.adminService.listAll().subscribe(response => {
      this.adminForm.get('accountName').setValue(response.accountName);
      this.adminForm.get('featuredTag').setValue(response.featuredTag);
      this.adminForm.get('dateTag').setValue(response.dateTag);
      this.adminForm.get('locations').setValue(response.locations);
      this.adminForm.get('photographer').setValue(response.photographer);
      this.adminForm.get('tags').setValue(response.tags);
      this.adminForm.get('startDate').setValue(response.startDate);
    });
  }

  onSubmit() {
    this.adminService.save(this.adminForm).subscribe(() => this.openSnackBar());
  }

  openSnackBar() {
    this.snackBar.open('saved', '', {
      duration: 2000,
    });
  }

}
