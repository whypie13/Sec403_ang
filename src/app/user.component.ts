import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'user-profile',
  templateUrl: 'user.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class userComponent implements OnInit {
  user: any = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded token:', decoded);

        this.user = {
          username: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          admin: decoded.admin
        };

        console.log('User object:', this.user);

      } catch (err) {
        console.error('Invalid token', err);
        this.errorMessage = 'Failed to decode token';
      }
    } else {
      this.errorMessage = 'No token found in local storage';
    }
  }
  deleteAccount(): void {
    const userId = this.user.username;
    const confirmation = confirm('DO you want to delete your account? This action cannot be undone.');

    if (confirmation) {
      this.userService.deleteAccount(userId).subscribe(
        (response) => {
          this.successMessage = 'Account Deletion successful.';

          this.userService.logout();
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting account:', error);
          this.errorMessage = 'There was an error, please try again later.';
        }
      );
    }
  }
}
