import { ChatService } from './../_services/chat.service';
import { AuthenticationService } from './../_services/authentication.service';
import { SocketService } from './../_services/socket.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-side-bar',
  templateUrl: './users-side-bar.component.html',
  styleUrls: ['./users-side-bar.component.scss'],
})
export class UsersSideBarComponent implements OnInit {

  users = [];
  _socket;

  constructor(private _userService: UserService, 
  private _socketService: SocketService, 
  private _authenticationService: AuthenticationService,
  private _chatService: ChatService) { }

  ngOnInit() {
    this._userService.getAll().subscribe(data => {
      this.users = data.filter(u => this._authenticationService.getCurrentUser().login !== u.login);

      let self = this;

      this._socket = this._socketService.getSocket();

      this._socket.emit('login', this._authenticationService.getCurrentUser().login);

      this._socket.on('logged', function (usersOnline) {
        usersOnline.forEach(function (u) {
          let user = self.users.find(us => us.login === u);
          if (!user) return;
          user.isOnline = true;
        });
      });

      this._socket.on('disconnect', function (login) {
        let user = self.users.find(u => u.login === login);
        if (user) delete user.isOnline;
      });

    });
  }

  chatWith(receiver) {
    this._chatService.setReceiver(receiver);
  }

}
