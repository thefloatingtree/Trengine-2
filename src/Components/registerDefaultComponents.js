import { Sprite } from "three"
import { MatterBodies } from "./Matter/MatterBodies"
import { MatterBody } from "./Matter/MatterBody"
import { MatterBodyPixiDebug } from "./Matter/MatterBodyPixiDebug"
import { MatterTilemap } from "./Matter/MatterTilemap"
import { SingletonMatterEngine } from "./Matter/SingletonMatterEngine"
import { PixiSprite } from "./Pixi/PixiSprite"
import { PixiTilemap } from "./Pixi/PixiTilemap"
import { SingletonPixiContainer } from "./Pixi/SingletonPixiContainer"
import { SingletonPixiRenderer } from "./Pixi/SingletonPixiRenderer"
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
    ECS.registerComponent(MatterTilemap)
    ECS.registerComponent(MatterBody)
    ECS.registerComponent(MatterBodies)
    ECS.registerComponent(MatterBodyPixiDebug)
    // Pixi
    ECS.registerComponent(PixiSprite)
    ECS.registerComponent(PixiTilemap)
    ECS.registerComponent(SingletonPixiContainer)
    ECS.registerComponent(SingletonPixiRenderer)
}