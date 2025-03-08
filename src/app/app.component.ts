import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NavigateComponent } from './navigate.component';
import { Dataservice } from './data.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotesComponent, NavigateComponent],
  providers: [Dataservice],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = 'Sec403FE';


  constructor(private dataService: Dataservice) {}

}
