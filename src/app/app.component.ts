import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule] // Импортируем RouterModule для работы с router-outlet
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, { width: '280px' });
  }
}