import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// API URL
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  // Method to register a new user
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Method to get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Extracting response data
  private extractResponseData(res: any): any { // Changed `Response` to `any`
    const body = res;
    return body || {};
  }

  // Handling errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Произошла ошибка:', error.error.message);
    } else {
      console.error(
        `Код ошибки ${error.status}, ` +
        `Тело ошибки: ${error.error}`);
    }
    return throwError(() => new Error('Что-то пошло не так; пожалуйста, попробуйте снова позже.'));
  }
}