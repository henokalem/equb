import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  errorMessage = '';

  constructor(public authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.username, form.value.password).subscribe(response => {
      const token = response["key"];
      this.authService.setToken(token)
      if (token) {
        this.authService.authStatusListenerNext();
        this.authService.setIsAuthenticated(true);
        localStorage.setItem('token', token);
        this.router.navigate(['dashboard']);
      }
    }, exc => {
      this.errorMessage = Object.values(exc.error)[0][0]
      this.isLoading = false;
    })
  }
}
