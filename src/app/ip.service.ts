import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1.0/iplookup';

  constructor(private http: HttpClient) {}

  getIpInfo(ipAddress: string): Observable<any> {
    const params = new HttpParams().set('ip', ipAddress);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
