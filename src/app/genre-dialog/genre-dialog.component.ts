import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component to display information about a movie genre in a dialog.
 * Receives genre data (name and description) via MAT_DIALOG_DATA injection.
 */
@Component({
  selector: 'app-genre-dialog',
  template: `<h2 mat-dialog-title>{{ data.genre.Name }}</h2>
             <p mat-dialog-content>{{ data.genre.Description }}</p>`
})
export class GenreDialogComponent {
  /**
   * @param data - The data injected into the dialog, containing genre name and description.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}