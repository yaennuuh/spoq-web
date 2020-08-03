import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  view = 'game';

  settings = {
    numberOfRounds: 0,
    secondsPerRound: 0,
    possiblePoints: 0,
    players: [
      {
        id: 1,
        name: 'Player 1',
        points: 0,
        keys: {
          1: '',
          2: '',
          3: '',
          4: ''
        }
      },
      {
        id: 2,
        name: 'Player 2',
        points: 0,
        keys: {
          1: '',
          2: '',
          3: '',
          4: ''
        }
      }
    ]
  }

  constructor(
    private settingsService: SettingsService,
    private toastController: ToastController
  ) {
    this.settings = settingsService.getSettings();
  }

  ngOnInit() {
  }

  async presentSaveToast() {
    const toast = await this.toastController.create({
      message: 'Die Einstellungen wurden gespeichert!',
      duration: 2000,
      color: 'primary',
      position: 'top'
    });
    toast.present();
  }

  save() {
    this.settingsService.setSettings(this.settings);
    this.presentSaveToast();
  }

}
