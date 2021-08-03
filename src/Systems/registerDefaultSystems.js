import { MatterUpdater } from "./Matter/MatterUpdater";
import { ThreeRenderer } from "./Three/ThreeRenderer";
import { TestSystem } from "./TestSystem";
import { PixiTest } from "./Pixi/PixiTest";
import { PixiRenderer } from "./Pixi/PixiRenderer";
import { MatterPixiUpdater } from "./Matter/MatterPixiUpdater";

export function registerDefaultSystems(ECS) {
    ECS.registerSystem(TestSystem)
    ECS.registerSystem(ThreeRenderer)
    ECS.registerSystem(MatterUpdater)
    ECS.registerSystem(MatterPixiUpdater)
    ECS.registerSystem(PixiTest)
    ECS.registerSystem(PixiRenderer)
}