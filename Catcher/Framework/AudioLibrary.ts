class AudioLibrary {

    private static audioCollection: Array<HTMLAudioElement>;

    private static Muted: boolean = false;

    public static Initialize(): void {

        AudioLibrary.audioCollection = new Array<HTMLAudioElement>()
        AudioLibrary.AddAudioFile("explosion.mp3", 0.4, false);
        AudioLibrary.AddAudioFile("laser.mp3", 0.15, false);
        AudioLibrary.AddAudioFile("thrust2.mp3", 0.85, true);
        AudioLibrary.AddAudioFile("missile.mp3", 0.7, false);
        AudioLibrary.AddAudioFile("powerup.mp3", 0.51, false);
        AudioLibrary.AddAudioFile("emptymisile.mp3", 0.3, false);
        AudioLibrary.AddAudioFile("thrust2.mp3", 0.85, true);
        AudioLibrary.AddAudioFile("music.mp3", 0.65, true);
        AudioLibrary.AddAudioFile("levelup.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("gameover.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("win.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("clash.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("shield.mp3", 0.6, true);
        AudioLibrary.AddAudioFile("shield.mp3", 0.6, true);
                
    }

    private static AddAudioFile(fileName: string, volume: number, loop:boolean) {

        let audio = new Audio('Resources\\Audio\\' + fileName);
        audio.volume = System.Volume * volume;
        audio.innerText = volume.toString();
        audio.loop = loop;
        AudioLibrary.audioCollection.push(audio);

    }

    private static Mute() {

        for (var i = 0; i < AudioLibrary.audioCollection.length; i++) {

            AudioLibrary.audioCollection[i].volume = 0;

        }

    }

    private static UnMute() {

        for (var i = 0; i < AudioLibrary.audioCollection.length; i++) {

            AudioLibrary.audioCollection[i].volume = +AudioLibrary.audioCollection[i].innerText;

        }

    }

    public static ToggleMute() {

        AudioLibrary.Muted = !AudioLibrary.Muted;

        if (!AudioLibrary.Muted) {
            AudioLibrary.UnMute();
            AudioLibrary.Play(7);
        }
        else {
            AudioLibrary.Mute();
            AudioLibrary.Stop(7);
        }

    }

    public static Play(index:number) {
        
        this.audioCollection[index].currentTime = 0;

        this.audioCollection[index].play();

    }

    public static Stop(index: number) {

        this.audioCollection[index].pause();

    }

}