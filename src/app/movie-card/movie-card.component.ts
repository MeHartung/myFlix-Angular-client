import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        title: genre.Name,
        content: genre.Description
      },
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        title: director.Name,
        content: director.Bio
      },
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        title: 'Synopsis',
        content: description
      },
    });
  }

  addToFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000,
      });
    });
  }
}