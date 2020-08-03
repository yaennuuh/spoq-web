import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  mode = null;
  searchText = null;
  playlists = null;
  selectedPlaylist = null;
  currentPlaylistIndex = null;
  numberOfRounds = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private settingsService: SettingsService
  ) {
    var settings = this.settingsService.getSettings();
    this.numberOfRounds = settings.numberOfRounds;
  }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.searchPlaylists();
    }
  }

  searchPlaylists() {
    this.spotifyService.searchPlaylists(this.searchText)
      .subscribe((data) => {
        this.playlists = data;
        this.currentPlaylistIndex = 0;
        this.selectedPlaylist = this.playlists[0];
      });
  }

  setPlaylist(counter) {
    if (counter === 1) {
      this.currentPlaylistIndex = this.playlists.length - 1 === this.currentPlaylistIndex ? 0 : this.currentPlaylistIndex + 1;
    } else if (counter === -1) {
      this.currentPlaylistIndex = this.currentPlaylistIndex === 0 ? this.playlists.length - 1 : this.currentPlaylistIndex - 1;
    }
    this.selectedPlaylist = this.playlists[this.currentPlaylistIndex];
  }

}
