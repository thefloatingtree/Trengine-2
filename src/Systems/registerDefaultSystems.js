import { Moving } from "./Moving";
import { BaseRenderer } from "./Renderers/BaseRenderer";
import { SpriteRenderer } from "./Renderers/SpriteRenderer";
import { SpriteUpdater } from "./SpriteUpdater";
import { TestSystem } from "./TestSystem";

export function registerDefaultSystems(ECS) {
    ECS.registerSystem(TestSystem)
    ECS.registerSystem(BaseRenderer)
    ECS.registerSystem(SpriteRenderer)
    ECS.registerSystem(SpriteUpdater)
    ECS.registerSystem(Moving)
}