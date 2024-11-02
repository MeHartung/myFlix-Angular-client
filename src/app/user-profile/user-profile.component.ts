import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((user: any) => {
      this.user = user;
      this.getFavoriteMovies();
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any) => {
      // Фильтруем фильмы, чтобы отобразить только избранные
      this.favoriteMovies = movies.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  updateProfile(): void {
    this.fetchApiData.editUser(this.user).subscribe((result: any) => {
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000,
      });
      localStorage.setItem('user', JSON.stringify(result));
    });
  }

  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
      this.getFavoriteMovies();
    });
  }
}