import { Position } from '../Components/Position'
import { Velocity } from '../Components/Velocity'
import { System } from '../Engine/ECS/System'

export class Moving extends System {

    init() {
        this.scene.addQuery('moving', [Position, Velocity])
    }

    update() {
        this.queries.moving.forEach(entity => {
            const position = entity.getComponent(Position)
            const velocity = entity.getComponent(Velocity)
            
            position.x += velocity.vx
            position.y += velocity.vy
        })
    }
}