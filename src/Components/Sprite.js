import { Component } from "../Engine/ECS/Component"
import { ComponentData } from "../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../Engine/Trengine"

export class Sprite extends Component {
    constructor({ textureName, scale = 1, rotation = 0 } = {}) {
        super()
        this.textureName = textureName
        this.scale = scale
        this.rotation = rotation
        // Computed
        this.texture
        this.scaledWidth
        this.scaledHeight
        this.centerX
        this.centerY
    }

    serialize() {
        return new ComponentData({ 
            componentType: this.className(), 
            data: { 
                textureName: this.textureName,
                scale: this.scale,
                rotation: this.rotation
            } 
        })
    }

    init() {
        this.texture = Trengine.Assets.images[this.textureName]
    }
}