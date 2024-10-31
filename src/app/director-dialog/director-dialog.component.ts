// src/app/director-dialog/director-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}