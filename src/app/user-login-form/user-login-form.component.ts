import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for the user login form.
 * Allows users to log in by entering their username and password, and handles user authentication.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  /**
   * Stores the user's login details: username and password.
   * @property {string} Username - The username entered by the user.
   * @property {string} Password - The password entered by the user.
   */
  @Input() loginData = { Username: '', Password: '' };

  /**
   * @param fetchApiData - Service to handle API requests for user login.
   * @param dialogRef - Reference to the open dialog, allowing it to be closed upon successful login.
   * @param snackBar - Snackbar service for displaying notifications to the user.
   * @param router - Router service for navigation after a successful login.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Logs in the user by sending login credentials to the API.
   * On successful login, stores user and token data in localStorage, navigates to the movies page,
   * closes the dialog, and displays a success message.
   * On error, logs the error and displays an error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.router.navigate(['movies']);
        this.snackBar.open('Logged in', 'OK', { duration: 2000 });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Failed to log in', 'OK', { duration: 2000 });
      }
    );
  }
}