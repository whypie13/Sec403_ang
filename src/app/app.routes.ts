import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { NotesComponent } from './notes.component';
import { noteComponent } from './note.component';
import  {userComponent } from './user.component';
import {rssComponent} from './rss.component';


export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  }
  ,
  {
    path: 'notes/:id',
    component: noteComponent
  }
  ,
  {
    path: 'user',
    component: userComponent
  },
  {
    path: 'rss',
    component: rssComponent
    },
];
