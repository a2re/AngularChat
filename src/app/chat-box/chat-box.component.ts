import { CommonService } from './../_services/common.service';
import { AuthenticationService } from './../_services/authentication.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SocketService } from './../_services/socket.service';
import { ChatService } from './../_services/chat.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  private _allMessages = [];
  messages = [];
  isVisible = true;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private _chatService: ChatService,
    private _soketService: SocketService,
    private _fb: FormBuilder,
    private _commonService: CommonService,
    private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this._socket = this._soketService.getSocket();

    this.currentUser = this._authenticationService.getCurrentUser();

    this._chatService.getReceiver().subscribe(receiver => {
      this.receiver = receiver;
      this.getMessage();
    });

    this.messageForm = this._fb.group({
      content: ['']
    });

    this._socket.on('logged', (data) => {
      console.log(data)
      this._allMessages = data.messages;
    });

    this._socket.on('message', (message) => {
      this._allMessages.push(message);
      if (!this.receiver) return;
      this.getMessage();
      this.scrollToBottom()
    });

    this._commonService.getSideBarState().subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  getMessage() {
    this.messages = this._allMessages.filter(m =>
      (m.receiver === this.receiver.username && m.sender === this.currentUser.username) ||
      (m.sender === this.receiver.username && m.receiver === this.currentUser.username)
    );
  }

  onSubmit() {
    let message = this.messageForm.value;
    if (message.content.length === 0) return;
    message.receiver = this.receiver.username;
    message.date = new Date();
    this._socket.emit('message', message);
    this.messageForm.reset();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
    })
  }

}
