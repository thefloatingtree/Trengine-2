import { AmbientLight } from "three"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"
import { convertHexString } from "./util"

export class ThreeAmbientLight extends Component {
    constructor({ color = "404040", intensity = 1 } = {}) {
        super()
        this.color = color
        this.intensity = intensity
        // computed
        this.light
    }

    serialize() {
        return new ComponentData({ 
            componentType: this.className(), 
            data: { 
                color: this.color,
                intensity: this.intensity
            } 
        })
    }

    init() {
        this.light = new AmbientLight(convertHexString(this.color), this.intensity)
        Trengine.Events.send('ThreeObjectAdded', this.light)
    }

    dispose() {
        Trengine.Events.send('ThreeObjectRemoved', this.light)
    }
}