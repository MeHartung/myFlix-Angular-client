import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * NavbarComponent displays the navigation bar and provides a logout functionality.
 * Allows the user to clear session data and navigate back to the welcome page.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  /**
   * @param router - Router service for navigating between pages.
   */
  constructor(private router: Router) {}

  /**
   * Logs out the user by clearing session data from localStorage and redirects to the welcome page.
   */
  logout(): void {
    console.log('Logging out');
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}