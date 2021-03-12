import { Entity } from './Entity'
import { Query } from './Query'
import { uuidv4 } from '../Util/Util'
import { Trengine } from '../Trengine'

export class Scene {
    constructor({ id = uuidv4(), singletonId = uuidv4() } = {}) {
        this.id = id
        this.systems = []
        this.entities = []
        this.bundles = []
        this.queries = {}
        this.singletonComponents = new Entity({ id: singletonId })
    }

    update() {
        this.systems.forEach(system => {
            system.update()
        })
    }

    async init() {
        const tasks = this.bundles.map(bundleName => Trengine.Assets.loadBundle(bundleName))
        await Promise.all(tasks)
        this.systems.forEach(system => {
            if (system.init) system.init(this)
        })
        this.entities.forEach(entity => {
            entity.init()
        })
        this._updateQueries()
    }

    addSystem(System) {
        const system = new System(this, this.queries)
        this.systems.push(system)
        return this
    }

    removeSystem(System) {
        this.systems = this.systems.filter(system => {
            if (system instanceof System) {
                if (system.dispose) system.dispose()
                return false
            }
            return true
        })
    }

    addQuery(name, ComponentArray) {
        if (name === "singleton") throw new Error("singleton is a reserved query")
        this.queries[name] = new Query(name, ComponentArray)

        this._updateQueries()

        return this
    }

    addEntity(entity) {
        this.entities.push(entity)

        this._updateQueries()
    }

    removeEntity(entity) {
        entity.getComponents().forEach(component => {
            if (typeof component.dispose == "function") component.dispose()
        })
        this.entities = this.entities.filter(item => {
            return item.id !== entity.id
        })

        this._updateQueries()

        return this
    }

    getEntityById(id) {
        return this.entities.find(entity => entity.id === id)
    }

    addSingletonComponent(Component, initialState = {}) {
        // Only one instance can exist in the singleton entity
        if (this.singletonComponents.hasComponent(Component)) return
        this.singletonComponents.addComponent(Component, initialState)

        return this
    }

    _updateQueries() {
        // Iterate over properties in the queries object
        for (const queryName in this.queries) {
            // Clear entities in each query
            const query = this.queries[queryName]
            query.entities = []
            query.firstOrDefault = null

            this.entities.forEach(entity => {
                if (query.match(entity)) {
                    query.entities.push(entity)
                    if (query.firstOrDefault === null) {
                        query.firstOrDefault = entity
                    }
                }
            })
        }
    }
}