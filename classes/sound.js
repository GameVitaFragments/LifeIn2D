function err(e) {
    console.log(e);
}

class Sound {
	constructor(path, volume, isMusic) {
		console.log(path);
		this.sound = loadSound(path, err);
		this.sound.setVolume(volume * 0.01);
		this.isMusic = isMusic;
		this.isPlaying = false;
	}
	load() {
		if(this.isMusic) {
			this.isPlaying = true;
			this.sound.loop();
		}
	}
	play() {
		if(!this.isPlaying) {
			if(this.isMusic) {
				this.sound.loop();
			}
			else {
				this.sound.play();
			}
		}
	}
	pause() {
		if(this.isPlaying) {
			this.sound.stop();
		}
	}
	changeVolume(volume) {
		this.sound.setVolume(volume * 0.01)
	}
}