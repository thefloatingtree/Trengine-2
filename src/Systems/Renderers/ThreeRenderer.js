import { SingletonThreeCamera } from '../../Components/Three/SingletonThreeCamera';
import { SingletonThreeOrthoCamera } from '../../Components/Three/SingletonThreeOrthoCamera';
import { SingletonThreeScene } from '../../Components/Three/SingletonThreeScene';
import { ThreeAmbientLight } from '../../Components/Three/ThreeAmbientLight';
import { ThreeBoxMesh } from '../../Components/Three/ThreeBoxMesh';
import { ThreeDirectionalLight } from '../../Components/Three/ThreeDirectionalLight';
import { ThreePointLight } from '../../Components/Three/ThreePointLight';
import { ThreeSpriteMesh } from '../../Components/Three/ThreeSpriteMesh';
import { System } from '../../Engine/ECS/System'
import { Trengine } from '../../Engine/Trengine'

export class ThreeRenderer extends System {

    init() {
        this.ctx = Trengine.Canvas.get3DContext()

        this.perspectiveCamera = this.scene.singletonComponents.getComponent(SingletonThreeCamera)
        this.orthoCamera = this.scene.singletonComponents.getComponent(SingletonThreeOrthoCamera)
        this.threeScene = this.scene.singletonComponents.getComponent(SingletonThreeScene)

        this.scene.addQuery('threeMeshes', [ThreeSpriteMesh, ThreeBoxMesh], true)
        this.scene.addQuery('threeLights', [ThreeAmbientLight, ThreeDirectionalLight, ThreePointLight], true)

        Trengine.Events.registerMany(['ThreeObjectAdded', 'ThreeObjectRemoved', 'ThreeFogAdded', 'ThreeFogRemoved'])
    }

    update() {

        if (Trengine.Events.any('ThreeObjectAdded')) {
            Trengine.Events.receive('ThreeObjectAdded').forEach(obj => {
                this.threeScene.scene.add(obj)
            })
        }

        if (Trengine.Events.any('ThreeObjectRemoved')) {
            Trengine.Events.receive('ThreeObjectRemoved').forEach(obj => {
                this.threeScene.scene.remove(obj)
            })
        }

        if (Trengine.Events.any('ThreeFogAdded')) {
            Trengine.Events.receive('ThreeFogAdded').forEach(fog => {
                this.threeScene.scene.fog = fog
            })
        }

        if (Trengine.Events.any('ThreeFogRemoved')) {
            Trengine.Events.receive('ThreeFogRemoved').forEach(() => {
                this.threeScene.scene.fog = null
            })
        }

        // Update camera aspect ratio
        if (this.perspectiveCamera) {
            this.perspectiveCamera.camera.aspect = window.innerWidth / window.innerHeight
            this.perspectiveCamera.camera.updateProjectionMatrix()
            // Render
            this.ctx.render(this.threeScene.scene, this.perspectiveCamera.camera)
        }

        if (this.orthoCamera) {
            this.orthoCamera.camera.left = (window.innerWidth / 2) * this.orthoCamera.scale
            this.orthoCamera.camera.right = (window.innerWidth / -2) * this.orthoCamera.scale
            this.orthoCamera.camera.top = (window.innerHeight / 2) * this.orthoCamera.scale
            this.orthoCamera.camera.bottom = (window.innerHeight / -2) * this.orthoCamera.scale
            this.orthoCamera.camera.updateProjectionMatrix()

            this.ctx.render(this.threeScene.scene, this.orthoCamera.camera)
        }
    }

    dispose() {
        const cleanMaterial = material => {
            material.dispose()
            for (const key of Object.keys(material)) {
                const value = material[key]
                if (value && typeof value === 'object' && 'minFilter' in value) {
                    value.dispose()
                }
            }
        }
        this.threeScene.scene.traverse(object => {
            if (!object.isMesh) return
            object.geometry.dispose()
            if (object.material.isMaterial) {
                cleanMaterial(object.material)
            } else {
                for (const material of object.material) cleanMaterial(material)
            }
        })
        delete this.threeScene.scene
    }
}