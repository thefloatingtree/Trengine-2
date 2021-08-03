import { Bodies } from "matter-js"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"


export class MatterBody extends Component {
    constructor({ x = 0, y = 0, w = 10, h = 10, isStatic = false, isSensor = false, label = "", type = "rectangle", mass = 200 } = {}) {
        super()
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.isStatic = isStatic
        this.isSensor = isSensor
        this.label = label
        this.type = type
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
                isSensor: this.isSensor,
                label: this.label,
                type: this.type,
                mass: this.mass
            }
        })
    }

    init() {
        this.body = this.makeBody()
        Trengine.Events.send('MatterBodyAdded', this.body)
    }
    
    dispose() {
        Trengine.Events.send('MatterBodyRemoved', this.body)
    }

    makeBody() {
        if (this.type === "rectangle") {
            return Bodies.rectangle(this.x, this.y, this.w, this.h, { isStatic: this.isStatic, isSensor: this.isSensor, label: this.label })
        } else {
            return Bodies.circle(this.x, this.y, this.w, { isStatic: this.isStatic, isSensor: this.isSensor, label: this.label })
        }
    }
}