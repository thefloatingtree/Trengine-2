export class IDManager {
    constructor() {
        this.idCounter = 0
    }

    getUniqueInteger() {
        const id = this.idCounter
        this.idCounter += 1
        return id
    }
}