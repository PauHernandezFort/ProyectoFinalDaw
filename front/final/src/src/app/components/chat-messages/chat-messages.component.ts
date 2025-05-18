import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chat } from '../../services/chat.service';
import { Card } from 'primeng/card';
@Component({
  standalone: true,
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'], // crea este archivo o elimina esta línea
  imports: [CommonModule,Card]
})
export class ChatMessagesComponent {
  @Input() chat!: Chat;

  // Mensajes simulados para mostrar
  mensajes = [
    { texto: 'Hola, ¿cómo estás?', enviadoPorMi: false },
    { texto: 'Bien, gracias. ¿Y tú?', enviadoPorMi: true },
    { texto: 'También bien, ¿qué tal el proyecto?', enviadoPorMi: false }
  ];
}
