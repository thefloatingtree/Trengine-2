import { Component } from "../Engine/ECS/Component"

export class Test extends Component {
    constructor({ one = { nice: "wow" }, two = [ 1, 2, 3 ] } = {}) {
        super()
        this.one = one
        this.two = two
    }
}