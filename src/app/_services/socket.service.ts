import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'

@Injectable()
export class SocketService {
  socket;
  constructor() {
    this.socket = io('http://localhost:8080');
  }

  getSocket() {
    return this.socket;
  }

}
