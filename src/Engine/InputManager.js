import { Pinput } from "./Util/Pinput";

export const RELEASED = "released"
export const PRESSED = "pressed"
export const DOWN = "down"

class InputBinding {
    constructor(keys, type) {
        this.active = true
        this.clearImmediately = false
        this.keys = keys
        this.type = type
    }

    disable() { this.active = false }

    enable() { this.active = true }
}

export class InputManager {
    constructor() {
        this.pinput = new Pinput()
        this.bindingGroups = new Map()
        this.sources
    }

    getPinput() {
        return this.pinput
    }

    // ClearImmediately if you have issues where two systems are
    // trying to access the same input and causing undesireable behavior
    getInput(name, clearImmediately = false) {
        let output = false
        const bindingGroup = this.bindingGroups.get(name)
        for (const binding of bindingGroup) {
            if (binding.clearImmediately) return false
            if (binding.active) {
                binding.clearImmediately = clearImmediately
                switch (binding.type) {
                    case RELEASED:
                        output |= this.pinput.isReleased(binding.keys)
                    case PRESSED:
                        output |= this.pinput.isPressed(binding.keys)
                    case DOWN:
                        output |= this.pinput.isDown(binding.keys)
                }
            }
        }
        return output
    }

    registerBinding(name, keys, type) {
        if (Array.isArray(keys)) {
            this.bindingGroups.set(name, keys.map(element => new InputBinding(element, type)))
        } else {
            this.bindingGroups.set(name, [new InputBinding(keys, type)])
        }
        return this
    }

    removeBinding(name) {
        this.bindingGroups.delete(name)
        return this
    }

    disableBinding(name) {
        this.bindingGroups.get(name).forEach(binding => binding.disable())
        return this
    }

    enableBinding(name) {
        this.bindingGroups.get(name).forEach(binding => binding.enable())
        return this
    }

    update() {
        this.bindingGroups.forEach(bindingGroup =>
            bindingGroup.forEach(binding => {
                binding.clearImmediately = false
            })
        )
        this.pinput.update()
    }
}