import { WebGLRenderer } from 'three/build/three.module';

export class CanvasManager {
    constructor() {
        this.canvas2D = null
        this.canvas3D = null
        this.context2D = null
        this.context3D = null

        this.aspectRatio = 16 / 9
    }

    reset2DContext() {
        if (!this.context2D) return
        this.context2D.canvas.width = this.context2D.canvas.width
    }

    reset3DContext() {
        if (!this.context3D) return
        this.context3D.clear()
    }

    get2DContext() {
        this.init2DCanvas()
        return this.context2D
    }

    get2dCanvas(webgl = false) {
        this.init2DCanvas(webgl)
        return this.canvas2D
    }

    get3DContext() {
        this.init3DCanvas()
        return this.context3D
    }

    get3DCanvas() {
        this.init3DCanvas()
        return document.getElementById('canvas-3d')
    }

    init2DCanvas(webgl = false) {
        if (this.canvas2D) return

        // remove all elements from body with class of "canvas-2d"
        document.body.querySelectorAll('.canvas-2d').forEach(el => {
            el.parentNode.removeChild(el)
        })

        // create canvas element
        const canvas = document.createElement('canvas')
        canvas.className = 'canvas-2d'
        document.body.appendChild(canvas)

        canvas.width = window.innerHeight * this.aspectRatio
        canvas.height = window.innerHeight

        const ctx = webgl ? canvas.getContext('webgl') : canvas.getContext('2d')

        // window.addEventListener('resize', () => {
        //     console.log(window.innerHeight * this.aspectRatio, window.innerHeight)
        //     canvas.width = window.innerHeight * this.aspectRatio
        //     canvas.height = window.innerHeight
        // }, false);

        this.canvas2D = canvas
        this.context2D = ctx
    }

    init3DCanvas() {
        if (this.canvas3D) return

        // remove all elements from body with class of "canvas-2d"
        document.body.querySelectorAll('.canvas-3d').forEach(el => {
            el.parentNode.removeChild(el)
        })

        const canvas = document.createElement('canvas')
        canvas.className = 'canvas-3d'
        document.body.appendChild(canvas)

        canvas.width = window.innerHeight * this.aspectRatio
        canvas.height = window.innerHeight

        const renderer = new WebGLRenderer({ antialias: true, canvas, alpha: true })

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerHeight * this.aspectRatio, window.innerHeight);
        }, false);

        this.canvas3D = canvas
        this.context3D = renderer
    }

    cleanupCanvases() {
        document.body.querySelectorAll('.canvas-2d').forEach(el => {
            el.parentNode.removeChild(el)
        })
        document.body.querySelectorAll('.canvas-3d').forEach(el => {
            el.parentNode.removeChild(el)
        })
    }
}