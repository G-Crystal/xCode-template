import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { LoginData } from './data';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  private login_apiUrl = 'http://13.56.148.150:5000/api/User/Login';
  private signup_apiUrl = 'http://13.56.148.150:5000/api/User/Signup';
  private forgot_apiUrl = 'http://13.56.148.150:5000/api/User/Forgot';

  constructor(private http: HttpClient) { }

  login (data: LoginData): Observable<LoginData> {
    return this.http.post<LoginData>(this.login_apiUrl, data, httpOptions).pipe(
      tap((data) => {})
    );
  }

  signup (data: LoginData): Observable<LoginData> {
    return this.http.post<LoginData>(this.signup_apiUrl, data, httpOptions).pipe(
      tap((data) => {})
    );
  }
  
  forgot (data: LoginData): Observable<LoginData> {
    return this.http.post<LoginData>(this.forgot_apiUrl, data, httpOptions).pipe(
      tap((data) => {})
    );
  }
}