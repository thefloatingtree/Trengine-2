import { Scene } from "three"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"

export class SingletonThreeScene extends Component {
    constructor({ } = {}) {
        super()
        this.scene
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {}
        })
    }

    init() {
        this.scene = new Scene()
    }
}