import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  msgSubscription: Subscription;
  mensajes: any[] = [];
  chatContainer: HTMLElement;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {

    this.chatContainer = document.getElementById('chat-mensajes');
    this.msgSubscription = this.chatService.getMessages().subscribe(msg => {

      this.mensajes.push(msg);

      // Scrolear contenedor cuando recibe nuevos mensajes
      setTimeout(() => {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
      }, 50);

    });

  }

  ngOnDestroy() {

    // Nos desubscribimos del observable cuando el componente muere
    this.msgSubscription.unsubscribe();
  }

  enviar() {

    if (this.texto.trim().length === 0) {
      return;
    }

    this.chatService.sendMessage(this.texto);
    this.texto = '';

  }

}
