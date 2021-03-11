import { Position } from '../Components/Position'
import { Sprite } from '../Components/Sprite'
import { System } from '../Engine/ECS/System'

export class SpriteUpdater extends System {

    init() {
        this.scene.addQuery('sprites', [Position, Sprite])
    }

    update() {
        this.queries.sprites.forEach(entity => {
            const position = entity.getComponent(Position)
            const sprite = entity.getComponent(Sprite)

            sprite.scaledWidth = sprite.texture.width * sprite.scale
            sprite.scaledHeight = sprite.texture.height * sprite.scale
            sprite.centerX = position.x + sprite.scaledWidth / 2
            sprite.centerY = position.y + sprite.scaledHeight / 2
        })
        console.log("ran")
    }
}