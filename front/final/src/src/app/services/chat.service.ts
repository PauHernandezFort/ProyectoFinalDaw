// src/app/services/chat.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Chat {
  chat_id: number;
  otro_usuario_nombre: string;
  otro_usuario_id: number;
}

export interface Mensaje {
  mensaje_id: number;
  contenido: string;
  fecha: string;
  usuario_id: number;
  usuario_nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://100.25.128.174:8000/api'; // Cambia si hace falta

  constructor(private http: HttpClient) { }

  obtenerChats(usuarioId: number) {
    return this.http.get<Chat[]>(`${this.apiUrl}/chats/getChats/${usuarioId}`);
  }
  obtenerMensajes(chatId: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.apiUrl}/chats/{id}/mensajes`);
  }

  enviarMensaje(chatId: number, usuarioId: number, contenido: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chats/mensajes/enviar`, {
      chat_id: chatId,
      usuario_id: usuarioId,
      contenido
    });
  }
}
