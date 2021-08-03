import { Component } from '../../Engine/ECS/Component'
import { ComponentData } from '../../Engine/ECS/Persistence/ComponentData'
import { Graphics } from '@pixi/graphics'
import { Trengine } from '../../Engine/Trengine'

export class MatterBodyPixiDebug extends Component {
    constructor({ lineColor = "00FF00" } = {}) {
        super()
        this.lineColor = lineColor
        this.graphics
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                lineColor: this.lineColor
            }
        })
    }

    init() {
        this.graphics = new Graphics()
        Trengine.Events.send('PixiDrawableAdded', this.graphics)
    }

    dispose() {
        Trengine.Events.send('PixiDrawableRemoved', this.graphics)
    }
}