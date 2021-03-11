import { SystemData } from "./Persistence/SystemData";

export class System {
    constructor(scene, queries) {
        this.queries = queries;
        this.scene = scene;
    }

    className() { return this.constructor.name }

    init() {}

    update() {}

    serialize() { return new SystemData({ systemType: this.className() }) }
}