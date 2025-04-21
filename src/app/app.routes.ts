import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { NotesComponent } from './notes.component';
import { noteComponent } from './note.component';
import  {userComponent } from './user.component';
import {rssComponent} from './rss.component';
import {rss2Component} from './rss2.component';
import {rss3Component} from './rss3.component';
import { IpComponent } from './ip.component';
import { DomainComponent } from './domain.component';
import { SecComponent } from './sec.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';



export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  },
  {
    path: 'notes/:id',
    component: noteComponent
  },
  {
    path: 'user',
    component: userComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'rss',
    component: rssComponent
  },
  {
    path: 'rss2',
    component: rss2Component
  },
  {
    path: 'rss3',
    component: rss3Component
  },
  {
    path: 'iplookup',
    component: IpComponent
  },
  {
    path: 'whois',
    component: DomainComponent
  },
  {
    path: 'sec',
    component: SecComponent
  },
];
