import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5240/api/Authentication';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(emailaddress: string, password: string): Observable<any> {
    const body = { emailaddress, password };
    return this.http.post<any>(`${this.baseUrl}/login`, body, this.httpOptions).pipe(
      map(response => {
        if (response && response.token) {
          // Save the user's authentication token in local storage
          localStorage.setItem('loggedIn', response.token);
          return { success: true };
        } else {
          return { success: false, message: 'Invalid credentials' };
        }
      }),
      catchError(error => {
        return throwError('Login failed');
      })
    );
  }

  register(emailaddress: string, password: string): Observable<any> {
    const body = { emailaddress, password };
    return this.http.post<any>(`${this.baseUrl}/register`, body, this.httpOptions).pipe(
      map(response => {
        if (response && response.token) {
          // Save the user's authentication token in local storage
          localStorage.setItem('loggedIn', response.token);
          return { success: true };
        } else {
          return { success: false, message: 'Invalid credentials' };
        }
      }),
      catchError(error => {
        return throwError('Registration failed');
      })
    );
  }


  logout(): void {
    // Remove the user's authentication token from local storage
    localStorage.removeItem('loggedIn');
  }

  isAuthenticated(): boolean {
    // Check if the user is logged in
    return !!localStorage.getItem('loggedIn');
  }


}
