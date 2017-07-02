import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  @Input() message;
  currentUser;
  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this._authenticationService.getCurrentUser();
  }

}
