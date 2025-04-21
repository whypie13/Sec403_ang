import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/register';
  private apiUrl1 = 'http://127.0.0.1:5000/api/v1.0/login';

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

  login(username: string, password: string) {
    return this.http.post<any>(
      'http://127.0.0.1:5000/api/v1.0/login',
      { username, password },  // this is the request body
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }


}
