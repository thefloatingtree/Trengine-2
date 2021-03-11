export class Query {
    constructor(name, ComponentArray) {
        this.name = name
        this.components = ComponentArray
        this.firstOrDefault = null
        this.entities = []
    }

    forEach(callback) {
        this.entities.forEach(entity => {
            callback(entity)
        })
    }

    match(entity) {
        return entity.hasAllComponents(this.components)
    }
}