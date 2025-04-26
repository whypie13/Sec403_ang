import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthorisationComponent } from './authorisation.component';
import { CommonModule } from '@angular/common';

import { UserService } from './user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'navigation',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AuthorisationComponent, CommonModule],
  templateUrl: './navigate.component.html'
})

export class NavigateComponent {
  constructor(public userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
