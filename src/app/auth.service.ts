import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscribable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/register';

  private apiUrl2 = 'http://127.0.0.1:5000/api/v1.0/delete';
isAuthenticated$: Observable<unknown> | Promise<unknown> | undefined;

  constructor(private http: HttpClient) {}


  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  deleteuser(user: any): Observable<any> {
    return this.http.post(this.apiUrl2, user);
  }
}
