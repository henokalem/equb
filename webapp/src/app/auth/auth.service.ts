import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const ENVIRONMENT = 'dev';

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

  setToken(token: string) {
    this.token = token;
  }

  setIsAuthenticated(status: boolean) {
    this.isAuthenticated = status
  }

  authStatusListenerNext() {
    this.authStatusListener.next(true);
  }

  createUser(username: string, password1: string, password2: string) : Observable<object>{
    const authData: AuthData = {
      username: username,
      password1: password1,
      password2: password2
    };
    var url = '';
    if (ENVIRONMENT === 'dev') {
      url = 'http://127.0.0.1:8000'
    }
    return this.http.post(url + '/api/v1/rest-auth/registration/', authData);
  }

  login(username: string, password: string) : Observable<object> {
    const authData: AuthData = {
      username: username,
      password: password
    };
    var url = '';
    if (ENVIRONMENT === 'dev') {
      url = 'http://127.0.0.1:8000'
    }
    return this.http.post<{key: string}>(url + '/api/v1/rest-auth/login/', authData);
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
