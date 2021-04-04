import { MatterUpdater } from "./Matter/MatterUpdater";
import { Moving } from "./Moving";
import { BaseRenderer } from "./Renderers/BaseRenderer";
import { SpriteRenderer } from "./Renderers/SpriteRenderer";
import { ThreeRenderer } from "./Renderers/ThreeRenderer";
import { SpriteUpdater } from "./SpriteUpdater";
import { TestSystem } from "./TestSystem";

export function registerDefaultSystems(ECS) {
    ECS.registerSystem(TestSystem)
    ECS.registerSystem(BaseRenderer)
    ECS.registerSystem(SpriteRenderer)
    ECS.registerSystem(SpriteUpdater)
    ECS.registerSystem(ThreeRenderer)
    ECS.registerSystem(Moving)
    ECS.registerSystem(MatterUpdater)
}