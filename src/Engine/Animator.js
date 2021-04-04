import { Trengine } from "./Trengine"

export const Easing = {
    linear: x => x,
    easeInQuad: x => x * x,
    easeOutQuad: x => 1 - (1 - x) * (1 - x),
    easeInOutQuad: x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2,
    easeInCubic: x => x * x * x,
    easeOutCubic: x => 1 - Math.pow(1 - x, 3),
    easeInOutCubic: x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    easeInQuart: x => x * x * x * x,
    easeOutQuart: x => 1 - Math.pow(1 - x, 4),
    easeInOutQuart: x => x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2,
    easeInBack: x => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: x => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    },
    easeInOutBack: x => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return x < 0.5
            ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }
}

function lerp(start, end, progress) {
    return start + progress * (end - start)
}

class Animation {
    constructor(target, selector, start, stop, duration, easing, complete) {
        this.target = target
        this.selector = selector
        this.start = start
        this.stop = stop
        this.duration = duration
        this.easing = easing
        this.complete = complete

        this.frames = 0
        this.shouldRemove = false
    }

    update() {
        const progress = this.frames / this.duration

        if (!this.target) {
            this.shouldRemove = true
            return
        }

        this.target[this.selector] = lerp(this.start, this.stop, this.easing(progress))
        this.frames++

        if (progress >= 1) {
            if (typeof this.complete === 'string') {
                Trengine.Events.send(this.complete)
            } else {
                this.complete()
            }
            this.shouldRemove = true
        }
    }
}

export class Animator {
    constructor() {
        this._animations = []
    }

    lerp(start, end, progress) {
        return lerp(start, end, progress)
    }

    clamp(value, min, max) {
        if (value < min) return min
        if (value > max) return max
        return value
    }

    animate({ target, selector, start, stop, duration, easing, complete } = {}) {
        this._animations.push(new Animation(target, selector, start, stop, duration, easing, complete))
    }

    update() {
        this._animations.forEach(animation => animation.update())
        this._animations = this._animations.filter(animation => !animation.shouldRemove)
    }
}