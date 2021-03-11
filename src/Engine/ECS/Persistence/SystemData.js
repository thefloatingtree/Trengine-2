export class SystemData {
    constructor({ systemType }) {
        this.systemType = systemType
    }

    getSystem(systemMap) {
        return systemMap.get(this.systemType)
    }
}