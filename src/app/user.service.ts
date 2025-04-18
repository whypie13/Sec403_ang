import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/register';

  constructor(private http: HttpClient) {}

  registerUser(user: { name: string; username: string; password: string; email: string}): Observable<any> {
    const userData = {
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email
    };

    return this.http.post<any>(this.apiUrl, userData);
  }

}
