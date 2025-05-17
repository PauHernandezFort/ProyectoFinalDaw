import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  apiUrl='http://127.0.0.1:8000'
  constructor(public http: HttpClient) { }

  public setAnuncio(userData: any): Observable<any> {
    // Establecer las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/ld+json');

    // Realizar la solicitud POST con las cabeceras adecuadas
    return this.http.post<any>('http://127.0.0.1:8000/api/anuncios', userData, { headers });
  }
  public getAnuncios(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/anuncios', {
      headers: new HttpHeaders({
        'Accept': 'application/ld+json'
      })
    });
  }
  getAnuncioPorUrl(url: string): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000${url}`);
  }
  eliminarAnuncio(id: number) {
    return this.http.delete(`${this.apiUrl}/api/anuncios/${id}`);
  }
  editarAnuncio(id: number, datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/merge-patch+json');
    return this.http.patch<any>(`http://127.0.0.1:8000/api/anuncios/${id}`, datos, { headers });
}


  // public login(userData: any): Observable<any> {
  //   // Establecer la cabecera según lo que espera tu API.
  //   const headers = new HttpHeaders().set('Content-Type', 'application/ld+json');
  //   // Realizar la solicitud POST con las cabeceras adecuadas
  //   return this.http.post<any>('http://127.0.0.1:8000/api/usuarios/login', userData, { headers });
  // }
}
