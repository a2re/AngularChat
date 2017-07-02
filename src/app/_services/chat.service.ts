import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatService {

  private _receiver: Observable<any>;
  private _receiverChangeObserver;
  
  constructor() {
    this._receiver = new Observable(observer => {
      this._receiverChangeObserver = observer;
    })
   }

  setReceiver(receiver) {
    this._receiverChangeObserver.next(receiver);
  }

  getReceiver(): Observable<any> {
    return this._receiver;
  }

}
