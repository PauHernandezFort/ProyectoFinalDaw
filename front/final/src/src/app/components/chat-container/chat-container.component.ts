import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chat } from '../../services/chat.service';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';

@Component({
  standalone: true,
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css'],
  imports: [
    CommonModule,
    ChatListComponent,
    ChatMessagesComponent
  ]
})
export class ChatContainerComponent {
  usuarioId = 20;
  chatSeleccionado: Chat | null = null;

  onChatSeleccionado(chat: Chat) {
    this.chatSeleccionado = chat;
  }
}
