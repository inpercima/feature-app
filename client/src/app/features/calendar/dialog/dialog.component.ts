import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'fa-dialog',
  templateUrl: './dialog.component.html',
  styles: ['./dialog.component.css'],
})

export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
