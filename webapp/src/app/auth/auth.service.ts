import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    };
    this.http.post('http://127.0.0.1:8000/api/v1/users/', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    };

    this.http.post<{key: string}>('http://127.0.0.1:8000/api/v1/rest-auth/login/', authData)
      .subscribe(response => {
        const token = response.key;
        this.token = token;
        if (token) {
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.saveAuthData(token);
          this.router.navigate(['dashboard']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }

    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return {
      token: token
    }
  }
}
