export class DeltaTimer {
    constructor () {
        this._perfectFrameTime = 1000 / 60
        this._frameTime = this._perfectFrameTime
        this._deltaTime = 0
        this._lastTimestamp = Date.now()
    }

    step() {
        this._frameTime = Date.now() - this._lastTimestamp
        this._deltaTime = this._frameTime / this._perfectFrameTime
        this._lastTimestamp = Date.now()

        // If there is a very large lag spike return perfect dt
        if (this._deltaTime > 10) return 1
        return this._deltaTime
    }

    get() {
        return this._deltaTime
    }

    getFrameTime() {
        return this._frameTime
    }
}