import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobileaudio',
  templateUrl: './mobileaudio.page.html',
  styleUrls: ['./mobileaudio.page.scss'],
})
export class MobileaudioPage implements OnInit {

  mode;
  playlist;
  allowingAudio;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.playlist = this.activatedRoute.snapshot.paramMap.get('playlist');
    this.allowingAudio = false;
  }

  allowPlayingAudio(){
    this.settingsService.getAudio().play();
    this.allowingAudio = true;
  }

}
