import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage(mensaje: string) {

    const username = this.wsService.getUser().nombre;
    const payload = {
      de: username,
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);

  }

  getMessages() {

    return this.wsService.listen('mensaje-nuevo');

  }

  getPrivateMessage() {
    return this.wsService.listen('mensaje-privado');
  }

  getActiveUsers() {
    return this.wsService.listen('usuarios-activos');
  }

  getActiveUsersEmit() {
    return this.wsService.emit('obtener-usuarios');
  }

}
