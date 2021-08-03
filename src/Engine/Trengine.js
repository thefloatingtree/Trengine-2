import { registerDefaultComponents } from '../Components/registerDefaultComponents';
import { registerDefaultSystems } from '../Systems/registerDefaultSystems';
import { Animator } from './Animator';
import { AssetManager } from "./AssetManager";
import { CanvasManager } from './CanvasManager';
import { ECS } from "./ECS/ECS";
import { EventManager } from "./EventManager";
import { IDManager } from './IDManager';
import { InputManager } from "./InputManager";
import { SoundManager } from "./SoundManager";
import { UIManager } from './UIManager';
import { DeltaTimer } from "./Util/DeltaTimer";

require('./Assets/main.scss')

class Engine {
    constructor() {
        this._deltaTimer
        this.UI
        this.ID
        this.ECS
        this.Canvas
        this.Assets
        this.Sounds
        this.Inputs
        this.Events
        this.Animator

        this.frameCount = 0
        this.shouldStop = false
        this.paused = false
    }

    delta() {
        return this._deltaTimer.get()
    }

    async start({
        manifestPath = "", 
        loadDefaultBundle = true, 
        defaultBundleName = "default", 
        onStart = async () => {}, 
        registerSystems = () => {}, 
        registerComponents = () => {} } = {}) {
    
        this._deltaTimer = new DeltaTimer()

        this.UI = new UIManager()
        this.ID = new IDManager()
        this.ECS = new ECS()
        this.Canvas = new CanvasManager()
        this.Assets = new AssetManager()
        this.Sounds = new SoundManager()
        this.Inputs = new InputManager()
        this.Events = new EventManager()
        this.Animator = new Animator()

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

    onSceneLoad() {
        this.Events = new EventManager()
        this.Animator = new Animator()
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
        this.ECS.scene.dispose()
        this.Canvas.cleanupCanvases()
    }

    _run() {
        this._deltaTimer.step()
        this.frameCount++
        if (!this.paused) this.ECS.update()
        this.Inputs.update()
        this.Animator.update()
        if (!this.shouldStop) return requestAnimationFrame(this._run.bind(this))
        this._onStop()
    }
}

export const Trengine = new Engine() // Export as a singleton