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

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getUserName(): string {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.Username || '';
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return '';
    }
  }

  private handleError(error: HttpErrorResponse): any {
    console.error(`Error status code ${error.status}, Error body: ${error.error}`);
    return throwError('Something went wrong; please try again later.');
  }

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

  public userRegistration(userData: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

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
        // Обновление избранного списка в localStorage после добавления
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.FavoriteMovies = response.FavoriteMovies;
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Movie added to favorites:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

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
        // Обновление избранного списка в localStorage после удаления
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.FavoriteMovies = response.FavoriteMovies;
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Movie removed from favorites:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    return res || {};
  }
}