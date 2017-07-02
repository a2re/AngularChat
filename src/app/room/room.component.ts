import { SocketService } from './../_services/socket.service';
import { AuthenticationService } from './../_services/authentication.service';
import { User } from './../_models/user';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  users = [];
  _socket;
  constructor(
    private userService: UserService, 
    private authenticationService: AuthenticationService,
    private _socketService: SocketService
    ) { }

  ngOnInit() {   
  }

}
