import { WebGLRenderer } from 'three/build/three.module';

export class CanvasManager {
    constructor() {
        this.context2D = this._create2DCanvasContext()
        this.context3D = this._create3DCanvasContext()
        this._canvas3D
    }

    reset2DContext() {
        // Hacky, but clears the canvas
        this.context2D.canvas.width = this.context2D.canvas.width
        this.context3D.clear()
    }

    get2DContext() {
        return this.context2D
    }

    reset3DContext() {
        
    }

    get3DContext() {
        return this.context3D
    }

    _create2DCanvasContext() {
        const canvas = document.getElementById('canvas-2d');
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const ctx = canvas.getContext('2d')
    
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }, false);
    
        return ctx;
    }

    _create3DCanvasContext() {
        const canvas = document.getElementById('canvas-3d');
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        this._canvas3D = canvas

        const renderer = new WebGLRenderer({ antialias: true, canvas, alpha: true })

        window.addEventListener('resize', () => {
            renderer.setSize( window.innerWidth, window.innerHeight );
        }, false);

        return renderer
    }
}