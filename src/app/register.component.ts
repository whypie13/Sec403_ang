import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  name: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService) {}


  onRegister(): void {
    if (!this.name || !this.username || !this.password || !this.email) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const userData = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.userService.registerUser(userData).subscribe(
      (response) => {
        this.successMessage = 'User registered successfully!';
        this.errorMessage = '';
      },
      (error) => {
        this.successMessage = '';
        this.errorMessage = error.error?.message || 'An error occurred during registration. Please try again.';
      }
    );
  }
  }
