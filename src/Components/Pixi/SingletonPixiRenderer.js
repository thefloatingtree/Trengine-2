import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"
import { Renderer } from 'pixi.js' 


export class SingletonPixiRenderer extends Component {
    constructor({ width, height } = {}) {
        super()
        this.width = width
        this.height = height
        // 
        this.renderer
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                width: this.width,
                height: this.height
            }
        })
    }

    init() {
        this.renderer = new Renderer({
            view: Trengine.Canvas.get2dCanvas(true),
            width: this.width,
            height: this.height
        })
    }
    
    dispose() {

    }
}