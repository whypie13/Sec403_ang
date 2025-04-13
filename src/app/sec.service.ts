// sec.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecFiling } from './sec-filing.model';  // Import the SecFiling interface

@Injectable({
  providedIn: 'root',
})
export class SecService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/sec';

  constructor(private http: HttpClient) {}

  getSecInfo(ticker: string, sec_filings: string): Observable<SecFiling | SecFiling[]> {
    const params = new HttpParams()
      .set('ticker', ticker)
      .set('filing', sec_filings);

    return this.http.get<SecFiling | SecFiling[]>(this.apiUrl, { params });
  }
}
