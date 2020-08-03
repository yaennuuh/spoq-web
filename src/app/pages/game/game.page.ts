import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.setPlayersAnswer(event.key);
  }

  mode = null;
  playlist = null;
  unknownMode = false;
  winner = null;
  draw = null;
  possiblePoints = null;
  gameIsRunning = null;
  previousSelectedSongs = null;
  notEnoughSongsError = false;

  // Settings
  settings = null;
  players = null;

  // Rounds
  roundCounter = null;
  numberOfRounds = null;
  startTime = null;
  hasFinished = false;

  // Time
  secondsPerRound = null;
  secondsPerRoundForPoints = null;
  private countdownInterval = null;
  private initialCountInterval = null;
  initialCounter = null;

  // Answers
  answers = null;
  correctAnswer = null;

  // Songs
  songs = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {

    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.playlist = this.activatedRoute.snapshot.paramMap.get('playlist');
    if (this.mode != 'singleplayer' && this.mode != 'multiplayer') {
      this.unknownMode = true;
    } else {
      this.settings = this.settingsService.getSettings();
      this.initGame();
    }
  }

  ngOnDestroy() {
    this.stopAudio();
  }

  stopAudio() {
    if (this.correctAnswer && this.correctAnswer.audio) {
      this.correctAnswer.audio.pause();
      this.correctAnswer.audio.src = '';
    }
  }

  setupAnswers() {
    this.answers = [];
    this.correctAnswer = null;
  }

  loadSongs() {
    this.answers = [];
    return new Promise((resolve, reject) => {
      this.spotifyService.getPlaylist(this.playlist)
        .subscribe((songs) => {
          if (songs.length < (3 + this.numberOfRounds)) {
            reject();
          } else {
            var selectedSongs = [];
            for (let index = 0; selectedSongs.length < 4; index++) {
              let song = _.sample(songs);
              if (_.indexOf(selectedSongs, song.track.id) === -1 && _.indexOf(this.previousSelectedSongs, song.track.id) === -1 && song.track.preview_url) {
                selectedSongs.push(song.track.id);
                var artists = '';
                _.each(song.track.artists, (artist) => {
                  artists = artists + artist.name + ", ";
                });
                artists = artists.substr(0, artists.length - 2);
                this.answers.push({
                  id: song.track.id,
                  artist: artists,
                  title: song.track.name,
                  preview: song.track.preview_url,
                  correct: false
                });
              }
            }
            this.correctAnswer = _.sample(this.answers);
            this.previousSelectedSongs.push(this.correctAnswer.id);
            this.correctAnswer.audio = this.settingsService.getAudio();
            this.correctAnswer.audio.src = this.correctAnswer.preview;
            this.correctAnswer.audio.load();
            resolve();
          }
        });
    });
  }

  setPlayersAnswer(answer: string) {
    _.each(this.players, (player) => {
      if (!player.answer && (this.mode === 'multiplayer' || (this.mode === 'singleplayer' && player.id === 1))) {
        _.each(player.keys, (value, key) => {
          if (_.lowerCase(value) === _.lowerCase(answer)) {
            player.answer = key;
            player.answerTime = moment();
          }
        });
      }
    });
  }

  setupConfig() {
    this.possiblePoints = this.settings.possiblePoints;
    this.players = this.settings.players;
    _.each(this.players, (player) => {
      player.points = 0;
    });
  }

  initGame() {
    this.previousSelectedSongs = [];
    this.initialCounter = 3;
    this.winner = null;
    this.draw = false;
    this.setupConfig();
    this.setupRounds();
    this.setupAnswers();
    this.initialCountInterval = setInterval(() => {
      if (this.initialCounter === 0) {
        clearInterval(this.initialCountInterval);
        this.startNextRound();
      } else {
        this.initialCounter--;
      }
    }, 1000);
  }

  startNextRound() {
    this.gameIsRunning = true;
    this.resetPlayersAnswer();
    this.loadSongs().then(() => {
      this.roundCounter++;
      this.secondsPerRound = this.settings.secondsPerRound;
      this.secondsPerRoundForPoints = this.settings.secondsPerRound;
      this.startTimer();
    }).catch(() => {
      clearInterval(this.initialCountInterval);
      this.notEnoughSongsError = true;
    });
  }

  resetPlayersAnswer() {
    _.each(this.players, (player) => {
      player.answer = undefined;
      player.answerTime = undefined;

      player.correctAnswer = false;
      player.wrongAnswer = false;
      player.answered = false;
    });
  }

  setupRounds() {
    this.numberOfRounds = this.settings.numberOfRounds;
    this.roundCounter = 0;
  }

  startTimer() {
    this.startTime = moment();
    this.correctAnswer.audio.play();
    this.countdownInterval = setInterval(() => {
      if (this.secondsPerRound === 0) {
        this.finishRound();
      } else {
        this.secondsPerRound--;
      }
    }, 1000);
  }

  checkPlayerAnswers() {
    _.each(this.players, (player) => {
      if (player.answer && this.answers[player.answer - 1].id === this.correctAnswer.id) {
        player.correctAnswer = true;
        player.wrongAnswer = false;
        player.answered = false;
        this.calculatePoints(player);
      } else {
        player.correctAnswer = false;
        player.wrongAnswer = true;
        player.answered = false;
      }
    });
  }

  calculatePoints(player) {
    let pointsPerSecond = (this.possiblePoints / this.secondsPerRoundForPoints);

    let roundStartetAt = moment(this.startTime, 'DD-MM-YYYY HH:mm:ss').valueOf();
    let playerAnsweredAt = moment(player.answerTime, 'DD-MM-YYYY HH:mm:ss').valueOf();

    let secondsAfterRoundStart = ((playerAnsweredAt - roundStartetAt) / 1000).toFixed(1);

    let points = Math.round((this.secondsPerRoundForPoints - parseFloat(secondsAfterRoundStart)) * pointsPerSecond);

    if (points < 0) {
      points = 0;
    } else if (points > this.possiblePoints) {
      points = this.possiblePoints;
    }

    player.points += points;
  }

  checkWinner() {
    _.each(this.players, (player) => {
      if (!this.winner || this.winner.points < player.points) {
        this.winner = player;
      } else if (this.winner && this.winner.points === player.points) {
        this.draw = true;
      }
    });
  }

  finishRound() {
    this.gameIsRunning = false;
    _.each(this.answers, (answer) => {
      if (this.correctAnswer.id === answer.id) {
        answer.correct = true;
      }
    });
    this.correctAnswer.audio.pause();
    this.correctAnswer.audio.src = "";
    clearInterval(this.countdownInterval);
    this.checkPlayerAnswers();
    setTimeout(() => {
      if (this.roundCounter < this.numberOfRounds) {
        this.startNextRound();
      } else {
        this.checkWinner();
        this.hasFinished = true;
      }
    }, 2000);
  }

}
