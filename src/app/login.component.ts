import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService) {}

  onLogin() {
    this.userService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Login successful!';
        this.errorMessage = '';
        localStorage.setItem('token', response.token);
        // Optional: redirect or emit event
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}
