import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  audio;

  constructor() {
    this.audio = new Audio();
    var settings = localStorage.getItem('settings');
    if (!!settings) {
      this.settings = JSON.parse(settings);
    }
  }

  settings = {
    numberOfRounds: 5,
    secondsPerRound: 10,
    possiblePoints: 100,
    players: [
      {
        id: 1,
        name: 'Player 1',
        points: 0,
        keys: {
          1: 'a',
          2: 's',
          3: 'd',
          4: 'f'
        }
      },
      {
        id: 2,
        name: 'Player 2',
        points: 0,
        keys: {
          1: 'h',
          2: 'j',
          3: 'k',
          4: 'l'
        }
      }
    ]
  }

  getSettings() {
    return this.settings;
  }

  getAudio() {
    return this.audio;
  }

  stopAudio() {
    this.audio.src = '';
    this.audio.pause();
  }

  setSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
    this.settings = settings;
  }
}
