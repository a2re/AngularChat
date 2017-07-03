import { CommonService } from './_services/common.service';
import { ChatService } from './_services/chat.service';
import { SocketService } from './_services/socket.service';
import { routing } from './app.routing';
import { MockBackend } from '@angular/http/testing';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from "@angular/http";
import { RoomComponent } from './room/room.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersSideBarComponent } from './users-side-bar/users-side-bar.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MaterialModule, MdSidenavModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomComponent,
    NavbarComponent,
    UsersSideBarComponent,
    ChatBoxComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    MaterialModule,
    MdSidenavModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    SocketService,
    ChatService,
    CommonService
  ],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
