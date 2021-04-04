import { DoubleSide, Mesh, MeshLambertMaterial, PlaneGeometry } from "three"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"

export class ThreeSpriteMesh extends Component {
    constructor({ textureName = "", scale = 1, x = 0, y = 0, z = 0 } = {}) {
        super()
        this.textureName = textureName
        this.scale = scale
        this.x = x
        this.y = y
        this.z = z
        // Computed
        this.texture
        this.mesh
    }

    serialize() {
        return new ComponentData({ 
            componentType: this.className(), 
            data: { 
                textureName: this.textureName,
                scale: this.scale,
                x: this.x,
                y: this.y,
                z: this.z
            } 
        })
    }

    init() {
        this.texture = Trengine.Assets.images[this.textureName]
        const material = new MeshLambertMaterial({ map: this.texture })
        const w = this.texture.image.width * this.scale
        const h = this.texture.image.height * this.scale
        const geometry = new PlaneGeometry(w, h)
        this.mesh = new Mesh(geometry, material)
        this.mesh.material.side = DoubleSide
        this.mesh.position.set(this.x, this.y, this.z)
    
        Trengine.Events.send('ThreeObjectAdded', this.mesh)
    }

    dispose() {
        Trengine.Events.send('ThreeObjectRemoved', this.mesh)
    }
}