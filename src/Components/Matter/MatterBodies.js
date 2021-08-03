import { Bodies, Body } from "matter-js"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"
import { MatterBody } from "./MatterBody"


export class MatterBodies extends Component {
    constructor({ bodies = [
        new MatterBody().serialize().data
    ] } = {}) {
        super()
        this.bodies = bodies
        // computed
        this.body
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                bodies: this.bodies
            }
        })
    }

    init() {
        this.body = Body.create({
            parts: this.bodies.map(body => {
                return new MatterBody(body).makeBody()
            })
        })
        Trengine.Events.send('MatterBodyAdded', this.body)
    }

    dispose() {
        Trengine.Events.send('MatterBodyRemoved', this.body)
    }
}