import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * defining a set of components for the homepage
 */
@Component({
  selector: 'homepage',
  imports: [RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {}
