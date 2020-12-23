import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminService } from './admin.service';

@Component({
  selector: 'fa-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  form = this.formBuilder.group({
    accountName: ['', Validators.required],
    featuredTag: ['', Validators.required],
    dateTag: ['', Validators.required],
    locations: ['', Validators.required],
    photographer: ['', Validators.required],
    tags: ['', Validators.required],
    startDate: ['', Validators.required],
  });

  private datePipe = new DatePipe('en-US');

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.adminService.listAll().subscribe(response => {
      this.form.patchValue({
        accountName: response.accountName,
        featuredTag: response.featuredTag,
        dateTag: response.dateTag,
        locations: response.locations,
        photographer: response.photographer,
        tags: response.tags,
        startDate: response.startDate,
      });
    });
  }

  onSubmit(): void {
    const startDate = this.form.value.startDate;
    if (startDate.valid) {
      startDate.setValue(this.datePipe.transform(startDate.value, 'yyyy-MM-dd'));
    }
    this.adminService.save(this.form).subscribe(() => {
      startDate.setValue(new Date(startDate.value).toISOString());
      this.snackBar.open('saved');
    });
  }
}
