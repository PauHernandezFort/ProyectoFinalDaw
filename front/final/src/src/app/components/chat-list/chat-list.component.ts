import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chat, ChatService } from '../../services/chat.service';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
  imports: [CommonModule, CardModule],
})
export class ChatListComponent implements OnInit {
  @Input() usuarioId!: number;
  @Output() chatSeleccionado = new EventEmitter<Chat>();

  chats: Chat[] = [];
  cargando = false;
  error = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.cargarChats();
  }

  cargarChats() {
    this.cargando = true;
    this.chatService.obtenerChats(this.usuarioId).subscribe({
      next: (chats) => {
        this.chats = chats;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error cargando chats';
        this.cargando = false;
      },
    });
  }

  seleccionarChat(chat: Chat) {
    this.chatSeleccionado.emit(chat);
  }
}
