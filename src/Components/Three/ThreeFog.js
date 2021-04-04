import { Fog } from "three"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"
import { convertHexString } from "./util"

export class ThreeFog extends Component {
    constructor({ color = "404040", near = 1, far = 10 } = {}) {
        super()
        this.color = color
        this.near = near
        this.far = far
        // computed
        this.fog
    }

    serialize() {
        return new ComponentData({ 
            componentType: this.className(), 
            data: { 
                color: this.color,
                near: this.near,
                far: this.far
            } 
        })
    }

    init() {
        this.fog = new Fog(convertHexString(this.color), this.near, this.far)
        Trengine.Events.send('ThreeFogAdded', this.fog)
    }

    dispose() {
        Trengine.Events.send('ThreeFogRemoved', this.fog)
    }
}