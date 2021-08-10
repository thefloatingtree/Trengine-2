import { MatterBodies } from '../../Components/Matter/MatterBodies';
import { MatterBody } from '../../Components/Matter/MatterBody';
import { MatterBodyPixiDebug } from '../../Components/Matter/MatterBodyPixiDebug';
import { MatterTilemap } from '../../Components/Matter/MatterTilemap';
import { SingletonMatterEngine } from '../../Components/Matter/SingletonMatterEngine';
import { SingletonPixiContainer } from '../../Components/Pixi/SingletonPixiContainer';
import { SingletonPixiRenderer } from '../../Components/Pixi/SingletonPixiRenderer';
import { convertHexString } from '../../Components/Three/util';
import { System } from '../../Engine/ECS/System'
import { Trengine } from '../../Engine/Trengine'

export class PixiRenderer extends System {

    init() {
        this.rendererComponent = this.scene.singletonComponents.getComponent(SingletonPixiRenderer)
        this.renderer = this.rendererComponent.renderer

        this.renderTexture = this.rendererComponent.renderTexture
        this.renderScale = this.rendererComponent.renderScale
        this.viewportSprite = this.rendererComponent.viewportSprite
        this.viewportContainer = this.rendererComponent.viewportContainer
        this.camera = this.rendererComponent.camera

        this.container = this.scene.singletonComponents.getComponent(SingletonPixiContainer).container

        try {
            this.matterScale = this.scene.singletonComponents.getComponent(SingletonMatterEngine).scale
        } catch {
            this.matterScale = 1
        }

        this.scene.addQuery('DebugMatterBody', [MatterBodyPixiDebug, MatterBody])
        this.scene.addQuery('DebugMatterBodies', [MatterBodyPixiDebug, MatterBodies])
        this.scene.addQuery('DebugMatterTilemaps', [MatterBodyPixiDebug, MatterTilemap])

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

        // Draw debug graphics
        this.scene.queries.DebugMatterBody.forEach(entity => {
            const { graphics, lineColor } = entity.getComponent(MatterBodyPixiDebug)
            const { body } = entity.getComponent(MatterBody)

            const verts = body.vertices.map(vertex => {
                return {
                    x: vertex.x / this.matterScale,
                    y: vertex.y / this.matterScale
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
                        x: vertex.x / this.matterScale,
                        y: vertex.y / this.matterScale
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

        this.scene.queries.DebugMatterTilemaps.forEach(entity => {
            const { graphics, lineColor } = entity.getComponent(MatterBodyPixiDebug)
            const { bodies } = entity.getComponent(MatterTilemap)

            graphics.clear()

            bodies.forEach(body => {
                const verts = body.vertices.map(vertex => {
                    return {
                        x: vertex.x / this.matterScale,
                        y: vertex.y / this.matterScale
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

        // zoom and anchor
        let beforeScaleWidth = this.viewportSprite.width
        let beforeScaleHeight = this.viewportSprite.height
        this.viewportSprite.scale.x = this.renderScale + this.camera.zoom
        this.viewportSprite.scale.y = this.renderScale + this.camera.zoom
        this.viewportSprite.x += (beforeScaleWidth - this.viewportSprite.width) * this.camera.anchor.x
        this.viewportSprite.y += (beforeScaleHeight - this.viewportSprite.height) * this.camera.anchor.y
        // camera position
        this.container.x = Math.floor(-this.camera.x / this.renderScale)
        this.container.y = Math.floor(-this.camera.y / this.renderScale)
        // render texture
        this.renderer.render(this.container, { renderTexture: this.renderTexture })
        this.viewportSprite.texture = this.renderTexture
        // render
        this.renderer.render(this.viewportContainer)
    }

    dispose() {

    }
}