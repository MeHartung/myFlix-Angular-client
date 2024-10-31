import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  template: `<h2 mat-dialog-title>{{ data.genre.Name }}</h2>
             <p mat-dialog-content>{{ data.genre.Description }}</p>`
})
export class GenreDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
