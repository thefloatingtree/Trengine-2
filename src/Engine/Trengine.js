import { registerDefaultComponents } from '../Components/registerDefaultComponents';
import { registerDefaultSystems } from '../Systems/registerDefaultSystems';
import { AssetManager } from "./AssetManager";
import { CanvasManager } from './CanvasManager';
import { ECS } from "./ECS/ECS";
import { EventManager } from "./EventManager";
import { InputManager } from "./InputManager";
import { SoundManager } from "./SoundManager";
import { UIManager } from './UIManager';
import { DeltaTimer } from "./Util/DeltaTimer";

class Engine {
    constructor() {
        this._deltaTimer
        this.UI
        this.ECS
        this.Canvas
        this.Assets
        this.Sounds
        this.Inputs
        this.Events

        this.shouldStop = false
        this.paused = false
    }

    delta() {
        return this._deltaTimer.get()
    }

    async start({ manifestPath = "", loadDefaultBundle = true, defaultBundleName = "default", onStart = async () => { }, registerSystems = () => {}, registerComponents = () => {} } = {}) {
    
        this._deltaTimer = new DeltaTimer()

        this.UI = new UIManager()
        this.ECS = new ECS()
        this.Canvas = new CanvasManager()
        this.Assets = new AssetManager()
        this.Sounds = new SoundManager()
        this.Inputs = new InputManager()
        this.Events = new EventManager()

        this.shouldStop = false
        this.paused = false

        registerDefaultComponents(this.ECS)
        registerDefaultSystems(this.ECS)

        registerSystems(this.ECS)
        registerComponents(this.ECS)

        await this.Assets.loadManifest(manifestPath)
        if (loadDefaultBundle) await this.Assets.loadBundle(defaultBundleName)

        await onStart()

        this._run()

        return this
    }

    pause() {
        this.paused = true
    }

    play() {
        this.paused = false
    }

    stop() {
        this.shouldStop = true
    }

    _onStop() {
        this.Canvas.reset2DContext()
    }

    _run() {
        this._deltaTimer.step()
        if (!this.paused) this.ECS.update()
        if (!this.shouldStop) return requestAnimationFrame(this._run.bind(this))
        this._onStop()
    }
}

export const Trengine = new Engine() // Export as a singleton