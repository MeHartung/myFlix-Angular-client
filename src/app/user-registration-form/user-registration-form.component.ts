import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for the user registration form.
 * Provides a form for users to create a new account by entering their details,
 * and handles user registration through the API.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Stores the user registration details: username, password, email, and birthday.
   * @property {string} Username - The username chosen by the user.
   * @property {string} Password - The password chosen by the user.
   * @property {string} Email - The user's email address.
   * @property {string} Birthday - The user's birth date.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @param fetchApiData - Service to handle API requests related to user registration.
   * @param dialogRef - Reference to the open dialog, allowing it to be closed upon successful registration.
   * @param snackBar - Snackbar service for displaying notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook that initializes the component.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by sending the user data to the API.
   * Closes the dialog on success and displays a success message.
   * On error, logs the error and displays an error message.
   */
  registerUser(): void {
    console.log(this.userData); // Log data before sending
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close(); // Close dialog on successful registration
        this.snackBar.open('Registration successful!', 'OK', { duration: 2000 });
      },
      (error) => {
        console.error('Error during registration:', error);
        this.snackBar.open(error.error || 'An error occurred', 'OK', { duration: 2000 });
      }
    );
  }
}