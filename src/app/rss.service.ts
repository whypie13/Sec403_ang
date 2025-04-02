import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/rss';
  private apiUrl2 = 'http://127.0.0.1:5000/api/v1.0/rss2';
  private apiUrl3 = 'http://127.0.0.1:5000/api/v1.0/rss3';

  constructor(private http: HttpClient) {}


  getFilteredRss(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getFilteredRss2(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }
  getFilteredRss3(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl3);
  }
}
