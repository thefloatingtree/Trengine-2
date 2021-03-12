import { uuidv4 } from "../Util/Util";
import { EntityData } from "./Persistence/EntityData";

export class Entity {
    constructor({ id = uuidv4() } = {}) {
        this.id = id
        this.components = new Map()
        this.componentTypes = []
    }

    init() {
        Array.from(this.components.values()).forEach(component => component.init())
    }

    addComponentWithConstructor(Component) {
        this.components.set(Component.name, new Component())
        this.componentTypes.push(Component.name)
        return this
    }

    addComponent(component) {
        this.components.set(component.className(), component)
        this.componentTypes.push(component.className())
        return this
    }

    addComponents(components) {
        components.forEach(component => this.addComponent(component))
        return this
    }

    removeComponent(Component) {
        if (typeof Component.prototype.dispose == "function") this.components.get(Component.name).dispose()
        this.components.delete(Component.name)
        this.componentTypes.splice(this.componentTypes.indexOf(Component.name), 1)

        return this
    }

    removeComponentByInstance(component) {
        this.removeComponent(component.constructor)
    }

    serialize() {
        const components = Array.from(this.components.values()).map(component => component.serialize())
        return new EntityData({ components, id: this.id })
    }

    getComponents() {
        return Array.from(this.components.values())
    }

    getComponent(Component) {
        return this.components.get(Component.name)
    }

    getComponentByInstance(component) {
        return this.components.get(component.className())
    }

    hasComponent(Component) {
        return !!~this.componentTypes.indexOf(Component.name) // !!~ turns result of indexOf into a boolean
    }

    hasAllComponents(componentList) {
        let result = true
        componentList.forEach(Component => {
            result = result && this.hasComponent(Component)
        })
        return result
    }
}