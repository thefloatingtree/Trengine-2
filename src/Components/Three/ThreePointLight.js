
import { PointLight } from "three"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"
import { convertHexString } from "./util"

export class ThreePointLight extends Component {
    constructor({ color = "404040", intensity = 1, distance = 100, decay = 1, x = 0, y = 0, z = 0 } = {}) {
        super()
        this.color = color
        this.intensity = intensity
        this.distance = distance
        this.decay = decay
        this.x = x
        this.y = y
        this.z = z
        // computed
        this.light
    }

    serialize() {
        return new ComponentData({ 
            componentType: this.className(), 
            data: { 
                color: this.color,
                intensity: this.intensity,
                distance: this.distance,
                decay: this.decay,
                x: this.x,
                y: this.y,
                z: this.z
            } 
        })
    }

    init() {
        this.light = new PointLight(convertHexString(this.color), this.intensity, this.distance, this.decay)
        this.light.position.set(this.x, this.y, this.z)
    
        Trengine.Events.send('ThreeObjectAdded', this.light)
    }

    dispose() {
        Trengine.Events.send('ThreeObjectRemoved', this.light)
    }
}