import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public user: User = null;

  constructor(
    private socket: Socket
  ) {

    // Cargamos usuario desde localStorage si es que existe
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });

  }


  emit(event: string, payload?: any, callback?: Function) {
    // Emit('event', payload, callback)
    // event: Evento que quiero emitir al servidor
    // payload: Información que quiero enviar (Opcional)
    // callback: Function que quiero ejecutar una vez realizado el emit (Opcional)
    console.log('Emitiendo', event);
    this.socket.emit(event, payload, callback);

  }

  listen(event: string) {
    // event: Evento que emite el servidor, que quiero escuchar
    // retorna un observable
    return this.socket.fromEvent(event);
  }

  loginWS(nombre: string) {

    return new Promise((resolve, reject) => {

      this.emit('configurar-usuario', { nombre: nombre }, resp => {
        // Si todo es correcto usamos resolve
        this.user = new User(nombre);
        this.saveStorage();
        resolve();
      });

    });

  }

  getUser() {
    return this.user;
  }

  saveStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage() {
    const item = localStorage.getItem('user');

    if (item) {
      this.user = JSON.parse(item);
      this.loginWS(this.user.nombre);
    }

  }

}
