import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthorisationComponent } from './authorisation.component';
import { userComponent} from './user.component';


@Component({
  selector: 'navigation',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AuthorisationComponent, userComponent],
  templateUrl: './navigate.component.html'
})

export class NavigateComponent { }
