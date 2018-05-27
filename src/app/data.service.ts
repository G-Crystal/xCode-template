import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { LoginData } from './data';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  private apiUrl = 'http://13.56.148.150:5000/api/User/Login';

  constructor(private http: HttpClient) { }

  login (data: LoginData): Observable<LoginData> {
    return this.http.post<LoginData>(this.apiUrl, data, httpOptions).pipe(
      tap((data) => {
        this.log(`login success`)
      })
      // tap(_ => this.log(`login success`)),
      // catchError(this.handleError<LoginData>('login'))
    );
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      let log = this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    return message;
  }
}