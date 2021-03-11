import { Entity } from "./Entity"
import { SceneData } from "./Persistence/SceneData"
import { Scene } from "./Scene"

export class ECS {
    constructor({ frozen = false } = {}) {
        this.components = new Map()
        this.systems = new Map()

        this.frozen = frozen
 
        this.scene = null
    }

    addEmptyEntity() {
        this.scene.addEntity(new Entity())
    }

    registerComponent(Component) {
        this.components.set(Component.name, Component)
        return Component
    }

    registerSystem(System) {
        this.systems.set(System.name, System)
        return System
    }

    async loadScene(sceneData) {
        this.scene = new SceneData(sceneData).getScene(this.systems, this.components)
        if (!this.frozen) await this.scene.init()
        
        return this.scene
    }

    loadEmptyScene() {
        this.scene = new Scene()
        return this.scene
    }

    serializeScene() {
        return new SceneData({
            id: this.scene.id,
            bundles: this.scene.bundles,
            singletonComponents: this.scene.singletonComponents.serialize(),
            entities: this.scene.entities.map(entity => entity.serialize()),
            systems: this.scene.systems.map(system => system.serialize())
        })
    }

    update() {
        if (this.scene || !this.frozen) this.scene.update()
    }
}