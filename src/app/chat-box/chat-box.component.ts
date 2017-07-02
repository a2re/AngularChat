import { AuthenticationService } from './../_services/authentication.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SocketService } from './../_services/socket.service';
import { ChatService } from './../_services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  receiver;
  currentUser;
  messageForm;
  private _socket;
  messages = [];

  constructor(private _chatService: ChatService, 
  private _soketService: SocketService,
  private _fb: FormBuilder,
  private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this._socket = this._soketService.getSocket();

    this.currentUser = this._authenticationService.getCurrentUser();

    this._chatService.getReceiver().subscribe(receiver => {
      this.receiver = receiver;
    });

    this.messageForm = this._fb.group({
      content: ['', Validators.required]
    });

    let self = this;
    this._socket.on('message', function(message) {
      console.log(message);
      self.messages.push(message);
    });
  }

  onSubmit() {
    let message = this.messageForm.value;
    message.chatter = this.receiver.login;
    message.date = new Date();
    this._socket.emit('message', message);
    this.messageForm.reset();
  }

}
