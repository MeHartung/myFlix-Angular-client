import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// API base URL
const apiUrl = 'https://movies-flix-hartung-46febebee5c5.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // Retrieve the token from localStorage
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): any {
    console.error(`Error status code ${error.status}, Error body: ${error.error}`);
    return throwError('Something went wrong; please try again later.');
  }

  // Register a new user
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User login
  public userLogin(credentials: any): Observable<any> {
    return this.http.post(apiUrl + 'login', credentials)
      .pipe(catchError(this.handleError));
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get a specific movie by title
  public getMovieWithTitle(title: string): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director details by director name
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + `directors/${directorName}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre details by genre name
  public getGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + `genres/${genreName}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get user details
  public getUser(): Observable<any> {
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get favorite movies of a user
  public getFavoriteMovies(): Observable<any> {
    return this.http.get(apiUrl + 'users/movies', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to the user's favorites
  public addFavoriteMovie(movieId: string): Observable<any> {
    return this.http.post(apiUrl + `users/movies/${movieId}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Edit user details
  public editUser(userDetails: any): Observable<any> {
    return this.http.put(apiUrl + 'users', userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user account
  public deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + 'users', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Remove a movie from the user's favorites
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    return this.http.delete(apiUrl + `users/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Extract response data
  private extractResponseData(res: any): any {
    return res || {};
  }
}