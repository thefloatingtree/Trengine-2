import { Trengine } from "../Engine/Trengine"

export class EngineInstanceManager {
    constructor() {
        this.instance
    }

    getInstance() {
        return this.instance
    }

    async makeInstance(engineParameters) {
        this.instance = await Trengine.start(engineParameters)
    }

    removeInstance() {
        this.instance.stop()
        this.instance = null
    }
}