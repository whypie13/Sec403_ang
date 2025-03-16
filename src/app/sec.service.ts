import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/sec';

  constructor(private http: HttpClient) {}

  getSecInfo(sec_filings: string): Observable<any> {
    const params = new HttpParams().set('ip', sec_filings);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
