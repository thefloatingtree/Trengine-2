import { Bodies } from "matter-js"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"


export class MatterBody extends Component {
    constructor({ x = 0, y = 0, w = 10, h = 10, isStatic = false, mass = 200 } = {}) {
        super()
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.isStatic = isStatic
        this.mass = mass
        // computed
        this.body
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h,
                isStatic: this.isStatic,
                mass: this.mass
            }
        })
    }

    init() {
        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, { isStatic: this.isStatic })
        Trengine.Events.send('MatterBodyAdded', this.body)
    }
    
    dispose() {
        Trengine.Events.send('MatterBodyRemoved', this.body)
    }
}