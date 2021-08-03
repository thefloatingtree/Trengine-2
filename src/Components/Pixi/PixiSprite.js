import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"
import { Sprite, BaseTexture, Texture } from 'pixi.js' 


export class PixiSprite extends Component {
    constructor({ x = 0, y = 0, anchorX = 0.5, anchorY = 0.5, roundPixels = false, texture } = {}) {
        super()
        this.x = x
        this.y = y
        this.anchorX = anchorX
        this.anchorY = anchorY
        this.roundPixels = roundPixels
        this.texture = texture
        // computed
        this.sprite
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                x: this.x,
                y: this.y,
                anchorX: this.anchorX,
                anchorY: this.anchorY,
                roundPixels: this.roundPixels,
                texture: this.texture
            }
        })
    }

    init() {
        const texture = new Texture(new BaseTexture(Trengine.Assets.images[this.texture]))
        this.sprite = new Sprite(texture)
        this.sprite.position.set(this.x, this.y)
        this.sprite.anchor.set(this.anchorX, this.anchorY)
        this.sprite.roundPixels = this.roundPixels
        Trengine.Events.send('PixiDrawableAdded', this.sprite)
    }
    
    dispose() {
        Trengine.Events.send('PixiDrawableRemoved', this.sprite)
    }
}

export function pixiSpriteUpdateTexture(sprite, texture) {
    sprite.texture = new Texture(new BaseTexture(texture))
}