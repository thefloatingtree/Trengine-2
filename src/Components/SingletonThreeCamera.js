import { PerspectiveCamera } from 'three'
import { Component } from "../Engine/ECS/Component"

export class SingletonThreeCamera extends Component {
    constructor({ fov = 70, near = 0.01, far = 10 } = {}) {
        super()
        this.fov = fov
        this.near = near
        this.far = far
        this.camera
    }

    serialize() {
        return {
            fov: this.fov,
            near: this.near,
            far: this.far
        }
    }

    init() {
        this.camera = new PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, this.near, this.far)
    }
}