/*posiblente no utilizado porque el ruido era molesto */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundMusicService {
  private audio: HTMLAudioElement;
  private isPlaying: boolean = false;

  constructor() {
    this.audio = new Audio('assets/music/background1.mp3');
    this.audio.loop = true; 
    this.audio.volume = 0.5; 
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