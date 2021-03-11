export class ComponentData {
    constructor({ componentType, data }) {
        this.componentType = componentType
        this.data = data
    }

    getData() {
        return this.data
    }

    getComponent(componentMap) {
        return componentMap.get(this.componentType)
    }
}