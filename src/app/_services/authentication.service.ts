import { User } from './../_models/user';
import { Injectable } from '@angular/core';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
    loggedIn = false;
    private currentUser: User = { id: 0, email: '', username: '', password: '' };

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = this.decodeUserFromToken(token);
            this.setCurrentUser(decodedUser);
        }
    }

    login(creditials) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/api/authenticate', creditials, options)
            .map((response: Response) => response.json())
            .map(response => {
                // login successful if there's a jwt token in the response
                localStorage.setItem('token', response.token);
                const decodedUser = this.decodeUserFromToken(response.token);
                this.setCurrentUser(decodedUser);
                return this.loggedIn;
            });
    }

    logout() {
        // remove token from local storage to log user out
        localStorage.removeItem('token');
    }
    decodeUserFromToken(token) {
        return this.jwtHelper.decodeToken(token).user;
    }

    setCurrentUser(decodedUser) {
        this.loggedIn = true;
        this.currentUser.username = decodedUser.username;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}
