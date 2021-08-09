import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Container } from 'pixi.js' 


export class SingletonPixiContainer extends Component {
    constructor() {
        super()
        this.container
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {}
        })
    }

    init() {
        this.container = new Container()
    }
    
    dispose() {

    }
}