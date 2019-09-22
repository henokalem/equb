import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
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
        this.authStatusListener.next(true);
      });
  }

}
