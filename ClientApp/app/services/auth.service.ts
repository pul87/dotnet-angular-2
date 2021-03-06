import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private roles: string[] = [];

  auth0 = new auth0.WebAuth({
    clientID: 'OJ0OBlYKJ1uqBVYi8KnzPbc7ZLkm7bXw',
    domain: 'pul87.eu.auth0.com',
    responseType: 'token',
    audience: 'https://pul87.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:5000',      
    scope: 'openid token'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

 public handleAuthentication(): void {
    var me = this;
    this.auth0.parseHash((err, authResult) => {
      debugger
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
        debugger
        this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
          debugger
          this.setUserRoles(user);
        });
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });

  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  private setUserRoles(user): void {
    console.log(user);
    localStorage.setItem('roles', user.roles);
    this.roles = user.roles;
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('roles');
    this.roles = [];
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public isInRole(roleName) {
    return this.roles.indexOf(roleName) > -1;
  }
}