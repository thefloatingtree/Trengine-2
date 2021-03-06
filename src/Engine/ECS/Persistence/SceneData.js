import { Scene } from "../Scene"
import { EntityData } from "./EntityData"
import { SystemData } from "./SystemData"

export class SceneData {
    constructor({ id, bundles, singletonComponents, entities, systems }) {
        this.id = id
        this.bundles = bundles
        this.singletonComponents = singletonComponents
        this.entities = entities
        this.systems = systems
    }

    getScene(systemMap, componentMap, ecs) {
        const scene = new Scene({ ecs, id: this.id, singletonId: this.singletonComponents.id })
        scene.bundles = this.bundles

        scene.singletonComponents = new EntityData(this.singletonComponents).getEntity(componentMap)

        this.systems.forEach(systemData => {
            const System = new SystemData(systemData).getSystem(systemMap)
            scene.addSystem(System)
        })

        this.entities.forEach(entityData => {
            const entity = new EntityData(entityData).getEntity(componentMap)
            scene.addEntity(entity)
        })

        return scene
    }
}