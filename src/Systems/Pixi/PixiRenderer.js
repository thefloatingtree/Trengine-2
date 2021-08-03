import { Body } from 'matter-js';
import { MatterBodies } from '../../Components/Matter/MatterBodies';
import { MatterBody } from '../../Components/Matter/MatterBody';
import { MatterBodyPixiDebug } from '../../Components/Matter/MatterBodyPixiDebug';
import { SingletonMatterEngine } from '../../Components/Matter/SingletonMatterEngine';
import { PixiSprite } from '../../Components/Pixi/PixiSprite';
import { SingletonPixiContainer } from '../../Components/Pixi/SingletonPixiContainer';
import { SingletonPixiRenderer } from '../../Components/Pixi/SingletonPixiRenderer';
import { convertHexString } from '../../Components/Three/util';
import { System } from '../../Engine/ECS/System'
import { Trengine } from '../../Engine/Trengine'

export class PixiRenderer extends System {

    init() {
        this.renderer = this.scene.singletonComponents.getComponent(SingletonPixiRenderer).renderer
        this.container = this.scene.singletonComponents.getComponent(SingletonPixiContainer).container

        try {
            this.scale = this.scene.singletonComponents.getComponent(SingletonMatterEngine).scale
        } catch {
            this.scale = 1
        }

        this.scene.addQuery('DebugMatterBody', [MatterBodyPixiDebug, MatterBody])
        this.scene.addQuery('DebugMatterBodies', [MatterBodyPixiDebug, MatterBodies])

        Trengine.Events.registerMany(['PixiDrawableAdded', 'PixiDrawableRemoved'])
    }

    update() {

        if (Trengine.Events.any('PixiDrawableAdded')) {
            Trengine.Events.receive('PixiDrawableAdded').forEach(obj => {
                this.container.addChild(obj)
            })
        }

        if (Trengine.Events.any('PixiDrawableRemoved')) {
            Trengine.Events.receive('PixiDrawableRemoved').forEach(obj => {
                this.container.removeChild(obj)
            })
        }

        this.scene.queries.DebugMatterBody.forEach(entity => {
            const { graphics, lineColor } = entity.getComponent(MatterBodyPixiDebug)
            const { body } = entity.getComponent(MatterBody)

            const verts = body.vertices.map(vertex => {
                return {
                    x: vertex.x / this.scale,
                    y: vertex.y / this.scale
                }
            })

            graphics.clear()
            graphics.lineStyle(1, convertHexString(lineColor), 1, 0)
            graphics.moveTo(verts[0].x, verts[0].y)
            for (let i = 1; i < verts.length; i++) {
                graphics.lineTo(verts[i].x, verts[i].y)
            }
            graphics.lineTo(verts[0].x, verts[0].y)
            graphics.closePath()
        })

        this.scene.queries.DebugMatterBodies.forEach(entity => {
            const { graphics, lineColor } = entity.getComponent(MatterBodyPixiDebug)
            const { body } = entity.getComponent(MatterBodies)

            graphics.clear()

            body.parts.forEach(part => {
                const verts = part.vertices.map(vertex => {
                    return {
                        x: vertex.x / this.scale,
                        y: vertex.y / this.scale
                    }
                })

                graphics.lineStyle(1, convertHexString(lineColor), 1, 0)
                graphics.moveTo(verts[0].x, verts[0].y)
                for (let i = 1; i < verts.length; i++) {
                    graphics.lineTo(verts[i].x, verts[i].y)
                }
                graphics.lineTo(verts[0].x, verts[0].y)
                graphics.closePath()
            })
        })

        this.renderer.render(this.container)
    }

    dispose() {

    }
}