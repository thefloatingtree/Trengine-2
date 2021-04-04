import { Engine, World } from 'matter-js'
import { MatterBody } from '../../Components/Matter/MatterBody'
import { SingletonMatterEngine } from '../../Components/Matter/SingletonMatterEngine'
import { ThreeSpriteMesh } from '../../Components/Three/ThreeSpriteMesh'
import { System } from '../../Engine/ECS/System'
import { Trengine } from '../../Engine/Trengine'

export class MatterUpdater extends System {
    init() {
        this.scene.addQuery('matterBodyAndMesh', [ThreeSpriteMesh, MatterBody])
        Trengine.Events.registerMany(['MatterBodyAdded', 'MatterBodyRemoved'])
        this.matterEngine = this.scene.singletonComponents.getComponent(SingletonMatterEngine).engine
    }

    update() {
        if (Trengine.Events.any('MatterBodyAdded')) {
            Trengine.Events.receive('MatterBodyAdded').forEach(body => {
                body.id = Trengine.ID.getUniqueInteger()
                World.addBody(this.matterEngine.world, body)
            })
        }

        if (Trengine.Events.any('MatterBodyRemoved')) {
            World.remove(this.matterEngine.world, Trengine.Events.receive('MatterBodyRemoved'))
        }

        this.queries.matterBodyAndMesh.forEach(entity => {
            const { body } = entity.getComponent(MatterBody)
            const { mesh } = entity.getComponent(ThreeSpriteMesh)

            // Actually just make these two components one component, they need to know about each other during init

            mesh.rotation.z = body.angle
            mesh.position.x = body.position.x
            mesh.position.y = -body.position.y
        })

        Engine.update(this.matterEngine, Trengine.delta() * (1000 / 60))
    }
}