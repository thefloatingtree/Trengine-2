import { Position } from '../../Components/Two/Position'
import { Sprite } from '../../Components/Two/Sprite'
import { System } from '../../Engine/ECS/System'
import { Trengine } from '../../Engine/Trengine'

export class SpriteRenderer extends System {

    init() {
        this.scene.addQuery('sprites', [Sprite, Position])

        this.ctx = Trengine.Canvas.get2DContext()
    }

    update() {
        this.queries.sprites.forEach(entity => {
            const position = entity.getComponent(Position)
            const sprite = entity.getComponent(Sprite)

            this.ctx.save()
            this.ctx.translate(sprite.centerX, sprite.centerY)
            this.ctx.rotate(sprite.rotation * (Math.PI / 180))
            this.ctx.translate(-sprite.centerX, -sprite.centerY)
            this.ctx.drawImage(sprite.texture, position.x, position.y, Math.floor(sprite.scaledWidth), Math.floor(sprite.scaledHeight))
            this.ctx.restore()
        })
    }
}