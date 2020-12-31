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
    startDateView: ['', Validators.required],
  });

  private datePipe = new DatePipe('en-US');

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.adminService.list().subscribe(response => {
      this.form.patchValue({
        accountName: response.accountName,
        featuredTag: response.featuredTag,
        dateTag: response.dateTag,
        locations: response.locations,
        photographer: response.photographer,
        tags: response.tags,
        startDate: response.startDate,
        startDateView: response.startDate,
      });
    });
  }

  onSubmit(): void {
    const startDateView = this.form.value.startDateView;
    if (startDateView.valid) {
      this.form.patchValue({ startDate: this.datePipe.transform(startDateView.value, 'yyyy-MM-dd') });
    }
    this.adminService.save(this.form.value).subscribe(() => this.snackBar.open('saved', '', { duration: 2000 }));
  }
}
