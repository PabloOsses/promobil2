import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundMusicService {
  private audio: HTMLAudioElement;
  private isPlaying: boolean = false;

  constructor() {
    this.audio = new Audio('assets/music/background1.mp3');
    this.audio.loop = true; // Hace que el audio se repita automáticamente
    this.audio.volume = 0.5; // Controla el volumen
  }

  startBackgroundMusic() {
    if (!this.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  stopBackgroundMusic() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }
}