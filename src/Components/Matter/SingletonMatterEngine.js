import { Engine } from 'matter-js'
import { Component } from '../../Engine/ECS/Component'
import { ComponentData } from '../../Engine/ECS/Persistence/ComponentData'

export class SingletonMatterEngine extends Component {
    constructor({ } = {}) {
        super()
        this.engine
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {}
        })
    }

    init() {
        this.engine = Engine.create()
    }
}