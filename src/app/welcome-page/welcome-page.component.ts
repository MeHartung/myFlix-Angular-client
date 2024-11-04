import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * The WelcomePageComponent serves as the entry point for users, displaying options
 * to either register a new account or log into an existing one.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
   * Injects MatDialog to handle opening dialog windows for user login and registration.
   * @param dialog - Angular Material Dialog service for opening modal dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Angular lifecycle hook that initializes the component.
   */
  ngOnInit(): void {}

  /**
   * Opens the user registration dialog.
   * Uses the UserRegistrationFormComponent as the dialog content.
   */
  openUserRegistrationDialog(): void {
    console.log('Opening registration dialog'); // Log for debugging
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }

  /**
   * Opens the user login dialog.
   * Uses the UserLoginFormComponent as the dialog content.
   */
  openUserLoginDialog(): void {
    console.log('Opening login dialog'); // Log for debugging
    this.dialog.open(UserLoginFormComponent, { width: '280px' });
  }
}