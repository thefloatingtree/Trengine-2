import { OrthographicCamera } from 'three'
import { Component } from '../../Engine/ECS/Component'
import { ComponentData } from '../../Engine/ECS/Persistence/ComponentData'

export class SingletonThreeOrthoCamera extends Component {
    constructor({ scale = 1, near = 0.01, far = 10, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0 } = {}) {
        super()
        this.scale = scale
        this.near = near
        this.far = far
        this.x = x
        this.y = y
        this.z = z
        this.rx = rx
        this.ry = ry
        this.rz = rz
        this.camera
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                scale: this.scale,
                near: this.near,
                far: this.far,
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
        this.camera = new OrthographicCamera((window.innerWidth / -2) * this.scale, (window.innerWidth / 2) * this.scale, (window.innerHeight / -2) * this.scale, (window.innerHeight / 2) * this.scale, this.near, this.far)
        this.camera.position.x = this.x
        this.camera.position.y = this.y
        this.camera.position.z = this.z
        this.camera.rotation.x = this.rx
        this.camera.rotation.y = this.ry
        this.camera.rotation.z = this.rz
    }
}