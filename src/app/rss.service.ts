import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/rss';

  constructor(private http: HttpClient) {}


  getFilteredRss(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
