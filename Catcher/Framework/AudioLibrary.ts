﻿class AudioLibrary {

    private audioCollection: Array<HTMLAudioElement>;

    public constructor() {

        this.audioCollection = new Array<HTMLAudioElement>()
        this.AddAudioFile("explosion.mp3", 0.45, false);
        this.AddAudioFile("laser.mp3", 0.2, false);
        this.AddAudioFile("thrust2.mp3", 0.9, true);
        this.AddAudioFile("missile.mp3", 0.7, false);
        this.AddAudioFile("powerup.mp3", 0.51, false);
        this.AddAudioFile("emptymisile.mp3", 0.3, false);
        this.AddAudioFile("thrust2.mp3", 0.9, true);
        this.AddAudioFile("music.mp3", 0.3, true);
        this.AddAudioFile("levelup.mp3", 0.5, false);
        this.AddAudioFile("gameover.mp3", 0.5, false);
        this.AddAudioFile("win.mp3", 0.5, false);
        this.AddAudioFile("clash.mp3", 0.5, false);
        this.AddAudioFile("shield.mp3", 0.65, true);
        this.AddAudioFile("shield.mp3", 0.65, true);
        this.AddAudioFile("thunder.mp3", 0.75, false);

    }

    private AddAudioFile(fileName: string, volume: number, loop:boolean) {

        let audio = new Audio('Resources\\Audio\\' + fileName);
        audio.volume = System.Volume * volume;
        audio.innerText = volume.toString();
        audio.loop = loop;
        this.audioCollection.push(audio);

    }

    public ToggleMute() {

        for (var i = 0; i < this.audioCollection.length; i++) {

            this.audioCollection[i].muted = !this.audioCollection[i].muted;
        }

    }

    public Play(index:number) {

        this.audioCollection[index].currentTime = 0;

        this.audioCollection[index].play();

    }

    public Stop(index: number) {

        this.audioCollection[index].currentTime = 0;

        this.audioCollection[index].pause(); 

    }

    public PauseLoop(index) {

        //this.audioCollection[index].muted = true;

        this.audioCollection[index].pause();

        //this.audioCollection[index].muted = false;

    }

}