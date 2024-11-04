// src/app/synopsis-dialog/synopsis-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component to display a movie's synopsis in a dialog.
 * Receives data via MAT_DIALOG_DATA injection, including the movie's title and description.
 */
@Component({
  selector: 'app-synopsis-dialog',
  template: `<h2 mat-dialog-title>{{ data.title }}</h2>
             <p mat-dialog-content>{{ data.description }}</p>`
})
export class SynopsisDialogComponent {
  /**
   * @param data - The data injected into the dialog, containing the movie's title and description.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}