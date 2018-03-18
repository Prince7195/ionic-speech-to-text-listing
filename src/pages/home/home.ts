import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  matches: String[];
  isRecording = false;

  constructor(
    private navCtrl: NavController,
    private speech: SpeechRecognition,
    private plt: Platform,
    private cd: ChangeDetectorRef
  ) {

  }

  isIos() {
    return this.plt.is('ios');
  }

  getPermission() {
    this.speech.hasPermission()
      .then((has: boolean) => {
        if(!has) {
          this.speech.requestPermission();
        }
      })
  }

  startListening() {
    let options = {
      language: 'en-US'
    };
    this.speech.startListening(options).subscribe(matches => {
      this.matches  = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  stopListening() {
    this.speech.stopListening().then(() => {
      this.isRecording = false;
    });
  }

}
