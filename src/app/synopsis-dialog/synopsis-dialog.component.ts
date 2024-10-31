// src/app/synopsis-dialog/synopsis-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-dialog',
  template: `<h2 mat-dialog-title>{{ data.title }}</h2>
             <p mat-dialog-content>{{ data.description }}</p>`
})
export class SynopsisDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}