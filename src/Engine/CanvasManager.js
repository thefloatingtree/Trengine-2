export class CanvasManager {
    constructor() {
        this.context2D = this._create2DCanvasContext()
    }

    reset2DContext() {
        // Hacky, but clears the canvas
        this.context2D.canvas.width = this.context2D.canvas.width
    }

    get2DContext() {
        return this.context2D
    }

    get3DContext() {

    }

    _create2DCanvasContext() {
        const canvas = document.getElementById('canvas-2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
    
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight;
        }, false);
    
        return ctx;
    }
}