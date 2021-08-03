import { Sprite } from "three"
import { MatterBody } from "./Matter/MatterBody"
import { SingletonMatterEngine } from "./Matter/SingletonMatterEngine"
import { SingletonThreeCamera } from "./Three/SingletonThreeCamera"
import { SingletonThreeOrthoCamera } from "./Three/SingletonThreeOrthoCamera"
import { SingletonThreeScene } from "./Three/SingletonThreeScene"
import { ThreeAmbientLight } from "./Three/ThreeAmbientLight"
import { ThreeBoxMesh } from "./Three/ThreeBoxMesh"
import { ThreeDirectionalLight } from "./Three/ThreeDirectionalLight"
import { ThreeFog } from "./Three/ThreeFog"
import { ThreePointLight } from "./Three/ThreePointLight"
import { ThreeSpriteMesh } from "./Three/ThreeSpriteMesh"


export function registerDefaultComponents(ECS) {
    // Three
    ECS.registerComponent(Sprite)
    ECS.registerComponent(SingletonThreeCamera)
    ECS.registerComponent(SingletonThreeOrthoCamera)
    ECS.registerComponent(SingletonThreeScene)
    ECS.registerComponent(ThreeSpriteMesh)
    ECS.registerComponent(ThreeBoxMesh)
    ECS.registerComponent(ThreeAmbientLight)
    ECS.registerComponent(ThreeDirectionalLight)
    ECS.registerComponent(ThreePointLight)
    ECS.registerComponent(ThreeFog)
    // Matter
    ECS.registerComponent(SingletonMatterEngine)
    ECS.registerComponent(MatterBody)
}