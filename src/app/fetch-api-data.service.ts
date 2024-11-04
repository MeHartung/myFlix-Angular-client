import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const apiUrl = 'https://movies-flix-hartung-46febebee5c5.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves the authentication token from localStorage.
   * @returns {string} The user's token.
   */
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * Retrieves the username from localStorage.
   * @returns {string} The username or an empty string if not found.
   */
  private getUserName(): string {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.Username || '';
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return '';
    }
  }

  /**
   * Handles HTTP errors.
   * @param error - The error response object.
   * @returns {Observable<never>} Observable that throws an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    console.error(`Error status code ${error.status}, Error body: ${error.error}`);
    return throwError('Something went wrong; please try again later.');
  }

  /**
   * Logs in the user.
   * @param userDetails - The user login details.
   * @returns {Observable<any>} Observable with the login response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map((result: any) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user)); 
        return result;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Registers a new user.
   * @param userData - The user registration details.
   * @returns {Observable<any>} Observable with the registration response.
   */
  public userRegistration(userData: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves the user's profile data.
   * @returns {Observable<any>} Observable with user data.
   */
  public getUser(): Observable<any> {
    const username = this.getUserName();
    if (!username) {
      console.error("Username is missing. Cannot fetch user data.");
      return throwError("Username is missing");
    }

    return this.http.get(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of all movies.
   * @returns {Observable<any>} Observable with the list of movies.
   */
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

  /**
   * Retrieves a list of favorite movies for the user.
   * @returns {Observable<any>} Observable with user's favorite movies.
   */
  public getFavoriteMovies(): Observable<any> {
    const username = this.getUserName();
    if (!username) {
      console.error("Username is missing. Cannot fetch favorite movies.");
      return throwError("Username is missing");
    }

    return this.http.get(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map((data: any) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
   * Updates the user's profile data.
   * @param updatedUser - The updated user data.
   * @returns {Observable<any>} Observable with the updated user data.
   */
  public editUser(updatedUser: any): Observable<any> {
    const username = this.getUserName();
    if (!username) {
      console.error("Username is missing. Cannot update user data.");
      return throwError("Username is missing");
    }

    return this.http.put(`${apiUrl}users/${username}`, updatedUser, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to the user's favorite list.
   * @param movieId - The ID of the movie to add.
   * @returns {Observable<any>} Observable with the updated favorite movies list.
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    const username = this.getUserName();
    if (!username) {
      console.error("Username is missing. Cannot add favorite movie.");
      return throwError("Username is missing");
    }

    return this.http.post(`${apiUrl}users/${username}/movies/${movieId}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map((response: any) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.FavoriteMovies = response.FavoriteMovies;
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Movie added to favorites:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from the user's favorite list.
   * @param movieId - The ID of the movie to remove.
   * @returns {Observable<any>} Observable with the updated favorite movies list.
   */
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    const username = this.getUserName();
    if (!username) {
      console.error("Username is missing. Cannot delete favorite movie.");
      return throwError("Username is missing");
    }

    return this.http.delete(`${apiUrl}users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map((response: any) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.FavoriteMovies = response.FavoriteMovies;
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Movie removed from favorites:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Extracts data from the HTTP response.
   * @param res - The response data.
   * @returns {any} The extracted data.
   */
  private extractResponseData(res: any): any {
    return res || {};
  }
}