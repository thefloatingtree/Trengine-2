import { Engine } from 'matter-js'
import { Component } from '../../Engine/ECS/Component'
import { ComponentData } from '../../Engine/ECS/Persistence/ComponentData'

export class SingletonMatterEngine extends Component {
    constructor({ gravity = 0.0017, scale = 1 } = {}) {
        super()
        this.gravity = gravity
        this.scale = scale
        // computed
        this.engine
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                gravity: this.gravity,
                scale: this.scale
            }
        })
    }

    init() {
        this.engine = Engine.create()
        // deprecated but it's the only way it works
        this.engine.world.gravity.scale = this.gravity
    }
}