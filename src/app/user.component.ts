import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'user-profile',
  templateUrl: 'user.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class userComponent implements OnInit {
  user: any = null;
  errorMessage: string = '';

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded token:', decoded);

        // Check if the user information is inside the 'sub' field
        if (decoded && decoded.sub) {
          this.user = decoded.sub;
        } else {
          this.errorMessage = 'User information not found in token';
        }

        console.log('User object:', this.user); // Debug: Check if user is correctly set
      } catch (err) {
        console.error('Invalid token', err);
        this.errorMessage = 'Failed to decode token';
      }
    } else {
      this.errorMessage = 'No token found in local storage';
    }
  }
}
