import { uuidv4 } from "../Util/Util"
import { ComponentData } from "./Persistence/ComponentData"

export class Component {
    constructor(entityId) {
        this.entityId = entityId
    }
    
    init() {}
    
    dispose() {}
    
    className() { return this.constructor.name }
    
    serialize() {
        const data = {}
        for (let propertyName in this) {
            const propertyValue = this[propertyName]
            data[propertyName] = propertyValue
        }
        return new ComponentData({ componentType: this.className(), data })
    }
}