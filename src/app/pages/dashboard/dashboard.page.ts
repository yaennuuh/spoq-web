import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user;

  constructor(
    private spotifyService: SpotifyService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.loadUser();
    } else {
      this.authenticationService.checkParams(this.route.snapshot.queryParams)
        .then((data) => {
          if (!!data) {
            this.loadUser();
          }
        });
    }
  }

  loadUser() {
    this.authenticationService.getUser()
      .subscribe((user) => {
        this.user = user;
      });
  }

  login() {
    this.spotifyService.login();
  }

  logout() {
    this.authenticationService.logout()
      .then(() => {
        this.user = undefined;
      });
  }

}
