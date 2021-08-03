import { Body, Engine, World } from 'matter-js'
import { MatterBodies } from '../../Components/Matter/MatterBodies'
import { MatterBody } from '../../Components/Matter/MatterBody'
import { SingletonMatterEngine } from '../../Components/Matter/SingletonMatterEngine'
import { PixiSprite } from '../../Components/Pixi/PixiSprite'
import { System } from '../../Engine/ECS/System'
import { Trengine } from '../../Engine/Trengine'

export class MatterPixiUpdater extends System {
    init() {
        this.engine = this.scene.singletonComponents.getComponent(SingletonMatterEngine).engine
        this.scale = this.scene.singletonComponents.getComponent(SingletonMatterEngine).scale

        this.scene.addQuery('MatterBodyAndPixiSprite', [PixiSprite, MatterBody])
        this.scene.addQuery('MatterBodiesAndPixiSprite', [PixiSprite, MatterBodies])

        Trengine.Events.registerMany(['MatterBodyAdded', 'MatterBodyRemoved'])
    }

    update() {
        if (Trengine.Events.any('MatterBodyAdded')) {
            Trengine.Events.receive('MatterBodyAdded').forEach(body => {
                body.id = Trengine.ID.getUniqueInteger()
                Body.setPosition(body, { x: body.position.x * this.scale, y: body.position.y * this.scale })
                Body.scale(body, this.scale, this.scale)
                World.addBody(this.engine.world, body)
            })
        }

        if (Trengine.Events.any('MatterBodyRemoved')) {
            World.remove(this.engine.world, Trengine.Events.receive('MatterBodyRemoved'))
        }

        this.queries.MatterBodyAndPixiSprite.forEach(entity => {
            const { body, isSensor } = entity.getComponent(MatterBody)
            const { sprite } = entity.getComponent(PixiSprite)

            // If the body is a sensor and attatched to a sprite, make it follow the sprite instead of leading the sprite
            if (isSensor) {
                Body.setPosition(body, { x: sprite.x * this.scale, y: sprite.y * this.scale })
            } else {
                sprite.x = body.position.x / this.scale
                sprite.y = body.position.y / this.scale
            }
        })

        this.queries.MatterBodiesAndPixiSprite.forEach(entity => {
            const { body } = entity.getComponent(MatterBodies)
            const { sprite } = entity.getComponent(PixiSprite)
            
            sprite.x = body.position.x / this.scale
            sprite.y = body.position.y / this.scale
        })

        Engine.update(this.engine, Trengine.delta() * (1000 / 60))
    }
}