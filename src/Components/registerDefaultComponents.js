import { Position } from "./Position";
import { SingletonThreeCamera } from "./SingletonThreeCamera";
import { Sprite } from "./Sprite";
import { Test } from "./Test";
import { Velocity } from "./Velocity";

export function registerDefaultComponents(ECS) {
    ECS.registerComponent(Position)
    ECS.registerComponent(Velocity)
    ECS.registerComponent(Sprite)
    ECS.registerComponent(Test)
    ECS.registerComponent(SingletonThreeCamera)
}