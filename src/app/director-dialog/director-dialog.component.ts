// src/app/director-dialog/director-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component to display information about a movie director in a dialog.
 * Receives director data (name, biography, birth and death dates) via MAT_DIALOG_DATA injection.
 */
@Component({
  selector: 'app-director-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.director.Name }}</h2>
    <mat-dialog-content>
        <p>{{ data.director.Bio }}</p>
        <p *ngIf="data.director.Birth"><strong>Birth date:</strong> {{ data.director.Birth | date: 'longDate' }}</p>
        <p *ngIf="data.director.Death"><strong>Death date:</strong> {{ data.director.Death | date: 'longDate' }}</p>
    </mat-dialog-content>
  `,
  styles: [`
    mat-dialog-content {
      max-width: 500px;
      margin: 0 auto;
      text-align: left;
    }
    
    p {
      margin-bottom: 10px;
      line-height: 1.5;
    }
  `]
})
export class DirectorDialogComponent {
  /**
   * @param data - The data injected into the dialog, containing director's details: name, bio, birth, and death dates.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}