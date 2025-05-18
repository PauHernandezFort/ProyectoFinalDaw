import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://100.25.128.174/api';

  constructor(public http: HttpClient) { }

  public setUser(userData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/ld+json');
    return this.http.post<any>(`${this.apiUrl}/usuarios`, userData, { headers });
  }

  public login(userData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/ld+json');
    return this.http.post<any>(`${this.apiUrl}/usuarios/login`, userData, { headers });
  }

  public getUser(userID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${userID}`);
  }
}
