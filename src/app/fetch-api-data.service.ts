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

  private getUserId(): string {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user._id;
      if (!userId) {
        console.warn("User ID is missing in the user object:", user);
      }
      return userId || '';
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

  public getUser(): Observable<any> {
    const userId = this.getUserId();
    return this.http.get(apiUrl + `users/${userId}`, {
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
    const userId = this.getUserId();
    return this.http.get(apiUrl + `users/${userId}/movies`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public addFavoriteMovie(movieId: string): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      console.error("User ID is missing. Cannot add favorite movie.");
      return throwError("User ID is missing");
    }

    return this.http.post(apiUrl + `users/${userId}/movies/${movieId}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map((response: any) => {
        console.log('Movie added to favorites:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  public editUser(userDetails: any): Observable<any> {
    const userId = this.getUserId();
    return this.http.put(apiUrl + `users/${userId}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteFavoriteMovie(movieId: string): Observable<any> {
    const userId = this.getUserId();
    return this.http.delete(apiUrl + `users/${userId}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    return res || {};
  }
}