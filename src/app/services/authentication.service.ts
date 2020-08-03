import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private spotifyService: SpotifyService
  ) { }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  setAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setRefreshToken(token) {
    localStorage.setItem('refreshToken', token);
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return this.spotifyService.getUser().pipe(map(
        (user) => {
          this.setUser(user);
          return user;
        }
      ));
    }
    return new Observable((observer) => {
      observer.next(user);
      observer.complete();
    });
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isLoggedIn() {
    return !!this.getAccessToken();
  }

  checkParams(params) {
    return new Promise((resolve, reject) => {
      var accessToken = params.accessToken;
      var refreshToken = params.refreshToken;
      if (accessToken) {
        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
        window.history.pushState('', 'SpoQ', '/dashboard');
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      localStorage.clear();
      resolve();
    });
  }
}
