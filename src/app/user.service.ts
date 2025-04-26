import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/register';

  LoggedIn = false

  constructor(private http: HttpClient) {
    const savedLogin = localStorage.getItem('token');
    if (savedLogin) {
      this.LoggedIn = true;
    }
  }

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
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.LoggedIn = false;
  }
  deleteAccount(userId: string): Observable<any> {

    const token = localStorage.getItem('token');

    if (!token) {
      return new Observable(observer => {
        observer.error('User is not logged in');
      });
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers });
  }

}
