class AudioLibrary {

    private static audioCollection: Array<HTMLAudioElement>;

    public static Initialize(): void {

        AudioLibrary.audioCollection = new Array<HTMLAudioElement>()
        AudioLibrary.AddAudioFile("explosion.mp3", 0.45, false);
        AudioLibrary.AddAudioFile("laser.mp3", 0.2, false);
        AudioLibrary.AddAudioFile("thrust2.mp3", 0.9, true);
        AudioLibrary.AddAudioFile("missile.mp3", 0.7, false);
        AudioLibrary.AddAudioFile("powerup.mp3", 0.51, false);
        AudioLibrary.AddAudioFile("emptymisile.mp3", 0.3, false);
        AudioLibrary.AddAudioFile("thrust2.mp3", 0.9, true);
        AudioLibrary.AddAudioFile("music.mp3", 0.3, true);
        AudioLibrary.AddAudioFile("levelup.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("gameover.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("win.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("clash.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("shield.mp3", 0.65, true);
        AudioLibrary.AddAudioFile("shield.mp3", 0.65, true);
        AudioLibrary.AddAudioFile("thunder.mp3", 0.75, false);

                
    }

    private static AddAudioFile(fileName: string, volume: number, loop:boolean) {

        let audio = new Audio('Resources\\Audio\\' + fileName);
        audio.volume = System.Volume * volume;
        audio.innerText = volume.toString();
        audio.loop = loop;
        AudioLibrary.audioCollection.push(audio);

    }

    public static ToggleMute() {

        for (var i = 0; i < AudioLibrary.audioCollection.length; i++) {

            AudioLibrary.audioCollection[i].muted = !AudioLibrary.audioCollection[i].muted;
        }

    }

    public static Play(index:number) {

        this.audioCollection[index].currentTime = 0;

        this.audioCollection[index].play();

    }

    public static Stop(index: number) {

        this.audioCollection[index].currentTime = 0;

        this.audioCollection[index].pause(); 

    }

    private static prevVol = 0;

    public static PauseLoop(index) {

        this.prevVol = this.audioCollection[index].volume; 

        this.audioCollection[index].volume = 0;

        this.audioCollection[index].pause();

        this.audioCollection[index].volume = this.prevVol;

    }

}