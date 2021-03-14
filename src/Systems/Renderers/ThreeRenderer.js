import { PerspectiveCamera, Scene, BoxGeometry, MeshNormalMaterial, Mesh } from 'three'
import { System } from '../../Engine/ECS/System'
import { Trengine } from '../../Engine/Trengine'

export class ThreeRenderer extends System {

    init() {
        this.ctx = Trengine.Canvas.get3DContext()

        this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.z = 1;

        this.threeScene = new Scene();

        const geometry = new BoxGeometry(0.2, 0.2, 0.2);
        const material = new MeshNormalMaterial();

        this.mesh = new Mesh(geometry, material);
        this.threeScene.add(this.mesh);
    }

    update() {
        this.ctx.render(this.threeScene, this.camera)
        this.mesh.rotation.x += 0.02
        this.mesh.rotation.y += 0.02
    }
}