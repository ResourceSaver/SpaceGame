class AudioLibrary {
    static Initialize() {
        AudioLibrary.audioCollection = new Array();
        AudioLibrary.AddAudioFile("explosion.mp3", 0, false);
        AudioLibrary.AddAudioFile("laser.mp3", -0.3, false);
        AudioLibrary.AddAudioFile("thrust.wav", -0.3, true);
        AudioLibrary.AddAudioFile("missile.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("powerup.mp3", -0.2, false);
        AudioLibrary.AddAudioFile("emptymisile.mp3", 0, false);
        AudioLibrary.AddAudioFile("thrust.wav", -0.3, true);
        AudioLibrary.AddAudioFile("music.mp3", 0.5, true);
        AudioLibrary.AddAudioFile("levelup.wav", 0.5, false);
        AudioLibrary.AddAudioFile("gameover.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("win.wav", 0, false);
        AudioLibrary.AddAudioFile("clash.wav", -0.1, false);
        AudioLibrary.AddAudioFile("shield.mp3", 0.3, true);
        AudioLibrary.AddAudioFile("shield.mp3", 0.3, true);
    }
    static AddAudioFile(fileName, volume, loop) {
        let audio = new Audio('\\Resources\\Audio\\' + fileName);
        audio.volume = System.Volume + volume;
        audio.loop = loop;
        AudioLibrary.audioCollection.push(audio);
    }
    static Pause(index) {
        this.audioCollection[index].currentTime = 0;
        this.audioCollection[index].pause();
    }
    static Play(index) {
        if (System.Muted)
            return;
        if (index > this.audioCollection.length) {
            alert("Audio not found");
            return;
        }
        this.audioCollection[index].currentTime = 0;
        this.audioCollection[index].play();
    }
    static Stop(index) {
        this.audioCollection[index].pause();
    }
}
