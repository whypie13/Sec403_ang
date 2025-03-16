import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/whois';

  constructor(private http: HttpClient) {}

  getDomainInfo(domain: string): Observable<any> {
    const params = new HttpParams().set('domain', domain);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
