import { uuidv4 } from "../Util/Util";
import { EntityData } from "./Persistence/EntityData";

export class Entity {
    constructor({ id = uuidv4() } = {}) {
        this.id = id
        this.components = new Map()
        this.componentTypes = []
        this.didInit = false
    }

    init() {
        if (this.didInit) return
        Array.from(this.components.values()).forEach(component => component.init())
        this.didInit = true
    }

    dispose() {
        this.getComponents().forEach(component => {
            component.dispose()
        })
    }

    addComponentWithConstructor(Component, props = {}) {
        const component = new Component(props)
        component.entityId = this.id
        this.components.set(Component.name, component)
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
        try {
            if (typeof Component.prototype.dispose == "function") this.components.get(Component.name).dispose()
        } catch (e) {
            console.warn("Error calling dispose on " + Component.name + " from entity " + this.id)
        }
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

    getComponentsFromComponentList(ComponentList) {
        const result = []
        ComponentList.forEach(Component => {
            const component = this.components.get(Component.name)
            if (component) {
                result.push(component)
            }
        })
        return result
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

    hasSomeComponents(componentList) {
        let result = false
        componentList.forEach(Component => {
            result = result || this.hasComponent(Component)
        })
        return result
    }

    hasAllComponents(componentList) {
        let result = true
        componentList.forEach(Component => {
            result = result && this.hasComponent(Component)
        })
        return result
    }
}