import { System } from '../../Engine/ECS/System'
import { Trengine } from '../../Engine/Trengine'

export class BaseRenderer extends System {

    init() {
        this.ctx = Trengine.Canvas.get2DContext()
    }

    update() {
        // Clear screen
        this.ctx.canvas.width = this.ctx.canvas.width
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = "#303a40"
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
}