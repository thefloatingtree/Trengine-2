import { BoxGeometry, Mesh, MeshLambertMaterial, MeshPhongMaterial } from "three"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"
import { convertHexString } from "./util"

export class ThreeBoxMesh extends Component {
    constructor({ width = 1, height = 1, depth = 1, color = "00FF00", x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0 } = {}) {
        super()
        this.width = width
        this.height = height
        this.depth = depth
        this.color = color
        this.x = x
        this.y = y
        this.z = z
        this.rx = rx
        this.ry = ry
        this.rz = rz
        // Computed
        this.mesh
    }

    serialize() {
        return new ComponentData({ 
            componentType: this.className(), 
            data: { 
                width: this.width,
                height: this.height,
                depth: this.depth,
                color: this.color,
                x: this.x,
                y: this.y,
                z: this.z,
                rx: this.rx,
                ry: this.ry,
                rz: this.rz
            } 
        })
    }

    init() {
        const material = new MeshPhongMaterial({ color: convertHexString(this.color) })
        const geometry = new BoxGeometry(this.width, this.height, this.depth)
        this.mesh = new Mesh(geometry, material)
        this.mesh.position.set(this.x, this.y, this.z)
        this.mesh.rotation.set(this.rx, this.ry, this.rz)

        Trengine.Events.send('ThreeObjectAdded', this.mesh)
    }

    dispose() {
        Trengine.Events.send('ThreeObjectRemoved', this.mesh)
    }
}