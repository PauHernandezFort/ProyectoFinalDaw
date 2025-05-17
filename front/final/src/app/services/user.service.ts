import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  public setUser(userData: any): Observable<any> {
    // Establecer las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/ld+json');

    // Realizar la solicitud POST con las cabeceras adecuadas
    return this.http.post<any>('http://127.0.0.1:8000/api/usuarios', userData, { headers });
  }

  public login(userData: any): Observable<any> {
    // Establecer la cabecera según lo que espera tu API.
    const headers = new HttpHeaders().set('Content-Type', 'application/ld+json');
    // Realizar la solicitud POST con las cabeceras adecuadas
    return this.http.post<any>('http://127.0.0.1:8000/api/usuarios/login', userData, { headers });
  }
  public getUser(userID: string): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/usuarios/${userID}`);
  }
}  
