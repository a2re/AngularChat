import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.authenticationService.loggedIn) return true;

    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['/login']/*, { queryParams: { returnUrl: state.url } }*/);
    return false;
  }
}
