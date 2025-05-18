import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  private apiUrl = 'http://100.25.128.174:8000/api';


  constructor(public http: HttpClient) { }

  public setAnuncio(userData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/ld+json');
    return this.http.post<any>(`${this.apiUrl}/anuncios`, userData, { headers });
  }

  public getAnuncios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/anuncios`, {
      headers: new HttpHeaders({
        'Accept': 'application/ld+json'
      })
    });
  }

  getAnuncioPorUrl(url: string): Observable<any> {
    // Si 'url' es la ruta relativa que devuelve la API, aseguramos que esté completa
    return this.http.get<any>(`http://100.25.128.174${url}`);
  }

  eliminarAnuncio(id: number) {
    return this.http.delete(`${this.apiUrl}/anuncios/${id}`);
  }

  editarAnuncio(id: number, datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/merge-patch+json');
    return this.http.patch<any>(`${this.apiUrl}/anuncios/${id}`, datos, { headers });
  }
}
