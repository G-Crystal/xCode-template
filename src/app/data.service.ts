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

  private apiUrl = 'http://13.56.148.150:5000/api/User/Login';

  constructor(private http: HttpClient) { }

  login (data: LoginData): Observable<LoginData> {
    return this.http.post<LoginData>(this.apiUrl, data, httpOptions).pipe(
      tap((data) => {})
    );
  }
}