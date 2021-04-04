import { Component } from "../../Engine/ECS/Component"

export class Position extends Component {
    constructor({ x = 0, y = 0 } = {}) {
        super()
        this.x = x
        this.y = y
    }
}