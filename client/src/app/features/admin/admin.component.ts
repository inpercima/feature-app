import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminService } from './admin.service';

@Component({
  selector: 'fa-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  protected adminForm: FormGroup;

  private datePipe = new DatePipe('en-US');

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private snackBar: MatSnackBar) { }

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
    const startDate = this.adminForm.get('startDate');
    if (startDate.valid) {
      startDate.setValue(this.datePipe.transform(startDate.value, 'yyyy-MM-dd'));
    }
    this.adminService.save(this.adminForm).subscribe(() => {
      startDate.setValue(new Date(startDate.value).toISOString());
      this.openSnackBar();
    });
  }

  openSnackBar() {
    this.snackBar.open('saved', '', {
      duration: 2000,
    });
  }

}
