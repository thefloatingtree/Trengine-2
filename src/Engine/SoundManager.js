import { Howl } from 'howler';

export class SoundManager {
    constructor() {
        this.sounds = new Map()
    }

    loadSound(name, sources) {
        this.sounds.set(name, new Howl({ src: sources }))
    }

    playSound(name) {
        this.sounds.get(name).play()
    }
}