import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  private _sideBarState: Observable<any>;
  private _sideBarStateChangeObserver;

  constructor() {
    this._sideBarState = new Observable(observer => {
      this._sideBarStateChangeObserver = observer;
    }).share();
  }

  setSideBarState(receiver) {
    console.log(receiver)
    this._sideBarStateChangeObserver.next(receiver);
  }

  getSideBarState(): Observable<any> {
    return this._sideBarState;
  }

}
