import { Component } from "../../Engine/ECS/Component"

export class Velocity extends Component {
    constructor({ vx = 0, vy = 0 } = {}) {
        super()
        this.vx = vx
        this.vy = vy
    }
}