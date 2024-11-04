import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

/**
 * Component for displaying and updating the user's profile information.
 * Allows the user to view and edit their profile details, and manage their list of favorite movies.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /**
   * Stores the user's profile information.
   */
  user: any = {};

  /**
   * Stores the user's favorite movies.
   */
  favoriteMovies: any[] = [];

  /**
   * @param fetchApiData - Service to handle API requests for user data and favorite movies.
   * @param snackBar - Snackbar service for displaying notifications to the user.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook that initializes the component.
   * Fetches the user's profile data on component initialization.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Retrieves the user's profile data and assigns it to the user property.
   * Calls getFavoriteMovies() to populate the favorite movies list.
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((user: any) => {
      this.user = user;
      this.getFavoriteMovies();
    });
  }

  /**
   * Retrieves all movies and filters them to include only those marked as the user's favorites.
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any) => {
      // Filters movies to show only the user's favorite movies
      this.favoriteMovies = movies.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  /**
   * Updates the user's profile information with the current user data.
   * Shows a confirmation message upon successful update and updates localStorage.
   */
  updateProfile(): void {
    this.fetchApiData.editUser(this.user).subscribe((result: any) => {
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000,
      });
      localStorage.setItem('user', JSON.stringify(result));
    });
  }

  /**
   * Removes a movie from the user's favorite list.
   * @param movieId - The ID of the movie to remove from favorites.
   */
  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
      this.getFavoriteMovies();
    });
  }
}