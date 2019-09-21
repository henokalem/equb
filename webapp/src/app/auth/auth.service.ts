import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      username: email,
      password: password
    };
    this.http.post('http://127.0.0.1:8000/users/', authData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
