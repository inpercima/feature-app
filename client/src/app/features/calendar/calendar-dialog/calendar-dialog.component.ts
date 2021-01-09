import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fa-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
})

export class CalendarDialogComponent {

  constructor(public dialogRef: MatDialogRef<CalendarDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
