import { Entity } from "../Entity"
import { ComponentData } from "./ComponentData"

export class EntityData {
    constructor({ components, id }) {
        this.components = components
        this.id = id
    }

    getEntity(componentMap) {
        const components = this.components.map(componentRawData => {
            const componentData = new ComponentData(componentRawData)
            const Component = componentData.getComponent(componentMap)
            return new Component(componentData.data)
        })

        return new Entity({ id: this.id }).addComponents(components)
    }
}