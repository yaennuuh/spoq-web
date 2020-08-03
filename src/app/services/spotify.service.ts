import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';
declare var require: any;
var SpotifyWebApi = require('spotify-web-api-node');

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  scopes = ['user-read-private', 'user-read-email'];
  redirectUri = 'https://spoq.yannickannaheim.ch';
  clientId = 'b492ad703e9c48338a92285ddf8597f5';
  state = 'some-state-of-my-choice';
  spotifyBaseUrl = 'https://api.spotify.com/v1';

  spotifyApi;

  constructor(
    private http: HttpClient
  ) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: this.clientId,
      redirectUri: this.redirectUri
    });
  }

  login() {
    window.location.href = 'https://spoq-login.yannickannaheim.ch/spotify-login.php';
  }

  getUser() {
    return this.http.get<any>(this.spotifyBaseUrl + '/me');
  }

  searchPlaylists(searchString) {
    return this.http.get<any>(this.spotifyBaseUrl + '/search',
      {
        params: {
          type: 'playlist',
          q: searchString
        }
      })
      .pipe(map((playlists) => {
        return playlists.playlists.items;
      }));
  }

  getPlaylist(id) {
    return this.http.get<any>(this.spotifyBaseUrl + '/playlists/' + id + '/tracks')
      .pipe(map((playlist) => {
        return playlist.items;
      }));
  }

  refreshTokens(code) {
  }

  search() {
    alert('search');
  }
}
