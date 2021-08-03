import { System } from '../../Engine/ECS/System'
import { Renderer, Container, Sprite, BaseTexture, Texture } from 'pixi.js'
import { Trengine } from '../../Engine/Trengine'
import { DOWN, PRESSED } from '../../Engine/InputManager'

export class PixiTest extends System {

    init() {
        Trengine.Inputs.registerBinding('up', ['w', 'ARROWUP'], DOWN)
        Trengine.Inputs.registerBinding('left', ['a', 'ARROWLEFT'], DOWN)
        Trengine.Inputs.registerBinding('down', ['s', 'ARROWDOWN'], DOWN)
        Trengine.Inputs.registerBinding('right', ['d', 'ARROWRIGHT'], DOWN)
        Trengine.Inputs.registerBinding('space', ['SPACEBAR'], PRESSED)

        this.renderer = new Renderer({
            view: Trengine.Canvas.get2dCanvas(true),
            width: 320,
            height: 180,
        })
        this.stage = new Container()
        this.rd = new Sprite(new Texture(new BaseTexture(Trengine.Assets.images["RDLeft.png"])))

        this.rd.x = 0
        this.rd.y = 0

        this.stage.addChild(this.rd)
    }

    update() {
    
        if (Trengine.Inputs.getInput("right")) {
            this.rd.texture = new Texture(new BaseTexture(Trengine.Assets.images["RDRight.png"]))
            this.rd.x += 1
        } else if (Trengine.Inputs.getInput("left")) {
            this.rd.texture = new Texture(new BaseTexture(Trengine.Assets.images["RDLeft.png"]))
            this.rd.x -= 1
        }

        if (Trengine.Inputs.getInput("down")) {
            this.rd.y += 1
        } else if (Trengine.Inputs.getInput("up")) {
            this.rd.y -= 1
        }
        
        if (Trengine.Inputs.getInput("space")) {
            this.stage.removeChild(this.rd)
        }
        
        this.renderer.render(this.stage)
    }

    dispose() {
        this.renderer.clear()
    }
}