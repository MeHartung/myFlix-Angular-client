import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

/**
 * Component for displaying a list of movies in card format.
 * Allows users to view details about genres, directors, and synopses, 
 * and manage their favorite movies.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /**
   * Array of movies to be displayed in the component.
   */
  movies: any[] = [];

  /**
   * Set of favorite movie IDs to efficiently track user's favorite movies.
   */
  favoriteMovies: Set<string> = new Set();

  /**
   * @param fetchApiData - Service to handle API requests for movies and favorites.
   * @param snackBar - Snackbar service for displaying notifications to the user.
   * @param dialog - Dialog service for displaying genre, director, and synopsis information.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  /**
   * Angular lifecycle hook that initializes the component.
   * Calls methods to retrieve movies and the user's favorite movies.
   */
  ngOnInit(): void {
    this.getMovies();
    this.loadFavoriteMovies();
  }

  /**
   * Retrieves all movies from the API and assigns them to the movies array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  /**
   * Loads the user's favorite movies from the API and stores them in a Set.
   */
  loadFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = new Set(resp.map((movie: any) => movie._id));
    });
  }

  /**
   * Checks if a movie is marked as a favorite.
   * @param id - The ID of the movie to check.
   * @returns {boolean} - True if the movie is a favorite, false otherwise.
   */
  isFavorite(id: string): boolean {
    return this.favoriteMovies.has(id);
  }

  /**
   * Opens a dialog displaying information about a genre.
   * @param genre - The genre object containing name and description.
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        title: genre.Name,
        content: genre.Description
      },
    });
  }

  /**
   * Opens a dialog displaying information about a director.
   * @param director - The director object containing name and bio.
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        title: director.Name,
        content: director.Bio
      },
    });
  }

  /**
   * Opens a dialog displaying the movie synopsis.
   * @param description - The synopsis description to display.
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        title: 'Synopsis',
        content: description
      },
    });
  }

  /**
   * Adds a movie to the user's favorites and updates the favoriteMovies set.
   * @param id - The ID of the movie to add to favorites.
   */
  addToFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.favoriteMovies.add(id);
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * Removes a movie from the user's favorites and updates the favoriteMovies set.
   * @param id - The ID of the movie to remove from favorites.
   */
  removeFromFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.favoriteMovies.delete(id);
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000,
      });
    });
  }
}