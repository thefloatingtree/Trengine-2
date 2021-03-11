import { ECS } from "../Engine/ECS/ECS"
import { UIManager } from "../Engine/UIManager"
import { registerDefaultComponents } from "../Components/registerDefaultComponents"
import { registerDefaultSystems } from "../Systems/registerDefaultSystems"
import { registerSystems } from '../../../Game/Systems/registerSystems'
import { registerComponents } from '../../../Game/Components/registerComponents'
import { buildEditorVue } from "./buildEditorVue"
import { EngineInstanceManager } from "./EngineInstanceManager"
import { Trengine } from "../Engine/Trengine"

class Editor {
    constructor() {
        this.ECS = new ECS({ frozen: true })
        this.UI = new UIManager()
        this.EngineInstanceManager = new EngineInstanceManager()
        // editor data manager
    }

    startEngine() {
        this.EngineInstanceManager.makeInstance({ 
            manifestPath: "../Game/Assets/manifest.json",
            onStart: async () => {
                const sceneData = this.ECS.serializeScene()
                await Trengine.ECS.loadScene(sceneData)
            }
        })
    }

    play() {
        this.EngineInstanceManager.getInstance().play()
    }

    pause() {
        this.EngineInstanceManager.getInstance().pause()
    }

    stop() {
        this.EngineInstanceManager.removeInstance()
    }

    start() {

        registerDefaultComponents(this.ECS)
        registerDefaultSystems(this.ECS)

        registerSystems(this.ECS)
        registerComponents(this.ECS)

        this.ECS.loadEmptyScene()
        this.UI.addVue(buildEditorVue, 'editor')
    }
}

export const Treditor = Object.freeze(new Editor())