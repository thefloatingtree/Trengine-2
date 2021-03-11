import { Position } from "./Position";
import { Sprite } from "./Sprite";

export function registerDefaultComponents(ECS) {
    ECS.registerComponent(Position)
    ECS.registerComponent(Sprite)
}