import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"
import { autoDetectRenderer, Sprite, Container, RenderTexture, settings, SCALE_MODES } from 'pixi.js' 


export class SingletonPixiRenderer extends Component {
    constructor({ viewportWidth = 320, viewportHeight = 180, renderScale = 6, camera = { x: 0, y: 0, zoom: 0, anchor: { x: 0.5, y: 0.5 } }, backgroundColor = "000000", resolution = 2 } = {}) {
        super()
        this.viewportWidth = viewportWidth
        this.viewportHeight = viewportHeight
        this.renderScale = renderScale
        this.camera = camera
        this.backgroundColor = backgroundColor
        this.resolution = resolution
        // computed
        this.renderer
        this.renderTexture
        this.viewportSprite
        this.viewportContainer
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                viewportWidth: this.viewportWidth,
                viewportHeight: this.viewportHeight,
                renderScale: this.renderScale,
                camera: this.camera,
                backgroundColor: this.backgroundColor,
                resolution: this.resolution,
            }
        })
    }

    init() {
        settings.SCALE_MODE = SCALE_MODES.NEAREST

        this.viewportSprite = new Sprite()
        this.viewportSprite.scale.x = this.renderScale
        this.viewportSprite.scale.y = this.renderScale

        this.viewportContainer = new Container()
        this.viewportContainer.addChild(this.viewportSprite)

        this.renderTexture = new RenderTexture.create({ width: this.viewportWidth, height: this.viewportHeight })

        this.renderer = new autoDetectRenderer({
            view: Trengine.Canvas.get2dCanvas(true),
            width: this.viewportWidth * this.renderScale,
            height: this.viewportHeight * this.renderScale,
            backgroundColor: this.backgroundColor,
            resolution: this.resolution
        })
    }
    
    dispose() {

    }
}