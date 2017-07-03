import { CommonService } from './../_services/common.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menu;
  currentUser;
  isToolbarVisible: boolean = true;

  constructor(private authenticationService: AuthenticationService,
   private _router: Router,
   private _commonService: CommonService) { }

  ngOnInit() {
    this.menu = [
      {
        'title': 'Accueil',
        'link': '/'
      },
      {
        'title': 'Room',
        'link': '/room'
      }
    ];
    this.currentUser = this.authenticationService.getCurrentUser();
    console.log(this.currentUser)
  }

  isActive(route) {
    return this._router.url === route;
  }

  disconnect() {
    this.authenticationService.logout();
  }

  toggleSideBar() {
    this.isToolbarVisible = !this.isToolbarVisible;
    this._commonService.setSideBarState(this.isToolbarVisible);
  }

}
