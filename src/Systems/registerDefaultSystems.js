import { MatterUpdater } from "./Matter/MatterUpdater";
import { ThreeRenderer } from "./Renderers/ThreeRenderer";
import { TestSystem } from "./TestSystem";

export function registerDefaultSystems(ECS) {
    ECS.registerSystem(TestSystem)
    ECS.registerSystem(ThreeRenderer)
    ECS.registerSystem(MatterUpdater)
}