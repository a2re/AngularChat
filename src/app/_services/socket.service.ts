import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  socket;
  constructor() {
    this.socket = io(environment.SOCKET_IO_URL);
  }

  getSocket() {
    return this.socket;
  }

}
