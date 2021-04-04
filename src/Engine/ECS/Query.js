export class Query {
    constructor(name, ComponentArray, options) {
        this.name = name
        this.components = ComponentArray
        this.firstOrDefault = null
        this.entities = []
        this.options = options
    }

    forEach(callback) {
        this.entities.forEach(entity => {
            callback(entity)
        })
    }

    match(entity) {
        if (this.options.some) {
            return entity.hasSomeComponents(this.components)
        } else {
            return entity.hasAllComponents(this.components)
        }
    }
}