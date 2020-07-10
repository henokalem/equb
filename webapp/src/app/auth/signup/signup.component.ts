import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;
  errorMessage = '';

  constructor(public authService: AuthService, private router: Router) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.username, form.value.password1, form.value.password2).subscribe(response => {
      this.isLoading = false;
      const token = response["key"];
      this.authService.setToken(token);
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
