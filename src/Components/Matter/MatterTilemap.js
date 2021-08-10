import { Bodies } from "matter-js"
import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"


export class MatterTilemap extends Component {
    constructor({ tileData, x = 0, y = 0, noColisionTileIds = [] } = {}) {
        super()
        this.x = x
        this.y = y
        this.tileData = tileData
        this.noColisionTileIds = noColisionTileIds
        // computed
        this.bodies
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                x: this.x,
                y: this.y,
                tileData: this.tileData,
                noColisionTileIds: this.noColisionTileIds 
            }
        })
    }

    init() {
        this.data = Trengine.Assets.data[this.tileData]

        const tileWidth = this.data.tilewidth
        const tileHeight = this.data.tileheight
        let { data, height: chunkHeight, width: chunkWidth } = this.data.layers[0]

        this.bodies = []

        data = data.map(tileId => {
            return this.noColisionTileIds.includes(tileId) ? 0 : tileId
        })

        console.log(data)
        
        buildRectangles(data, chunkWidth, chunkHeight).map(rectangle => {
            let [rectangleX, rectangleY, rectangleWidth, rectangleHeight] = rectangle

            const x = (rectangleX * tileWidth) + this.x
            const y = (rectangleY * tileHeight) + this.y
            const width = rectangleWidth * tileWidth
            const height = rectangleHeight * tileHeight

            this.bodies.push(Bodies.rectangle(x + width / 2, y + height / 2, width, height, { isStatic: true }))
        })


        this.bodies.forEach(body => {
            Trengine.Events.send('MatterBodyAdded', body)
        })
    }

    dispose() {
        this.bodies.forEach(body => {
            Trengine.Events.send('MatterBodyRemoved', body)
        })
    }
}

function get1DIndex(x, y, cols) {
    return y * cols + x
}

function makeArray(howMany, value) {
    let arr = []
    while (howMany--) {
        arr.push(value)
    }
    return arr
}

function allZeros(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            return false
        }
    }
    return true
}

function maxHistogram(histogram) {
    let stack = []
    let maxArea = 0
    let maxHeight = 0
    let maxWidth = 0
    let maxIndex = 0
    for (let i = 0; i <= histogram.length; i++) {
        while (stack.length && (i === histogram.length || histogram[i] <= histogram[stack[stack.length - 1]])) {
            let tempIndex = stack[stack.length - 1] - 1
            let height = histogram[stack.pop()]
            let width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1
            let area = width * height
            if (area > maxArea) {
                maxArea = area
                maxHeight = height
                maxWidth = width
                maxIndex = tempIndex
            }
        }
        stack.push(i)
    }
    return [maxArea, maxWidth, maxHeight, maxIndex]
}

function findMaximumRectangleIn1DBinaryMatrix(matrix, rows, columns) {
    let histogram = makeArray(columns, 0)
    let maxArea = 0
    let maxX = 0
    let maxY = 0
    let maxWidth = 0
    let maxHeight = 0
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            if (matrix[get1DIndex(x, y, columns)] == 0) {
                histogram[x] = 0
            } else {
                histogram[x] += matrix[get1DIndex(x, y, columns)]
            }
        }
        let [area, width, height, rectangleX] = maxHistogram(histogram)
        if (area >= maxArea) {
            maxArea = area
            maxX = rectangleX - (width - 2)
            maxY = y - (height - 1)
            maxWidth = width
            maxHeight = height
        }
    }
    return [maxX, maxY, maxWidth, maxHeight]
}

function buildRectangles(matrix, rows, columns) {
    let rectangles = []
    let binaryMatrix = matrix.map(number => number != 0 ? 1 : 0)
    // while there are still rectangles to be built
    while (!allZeros(binaryMatrix)) {
        // find next largest rectangle
        let rectangle = findMaximumRectangleIn1DBinaryMatrix(binaryMatrix, rows, columns)
        rectangles.push(rectangle)
        // clear the rectangle from the matrix
        for (let y = rectangle[1]; y < rectangle[1] + rectangle[3]; y++) {
            for (let x = rectangle[0]; x < rectangle[0] + rectangle[2]; x++) {
                binaryMatrix[get1DIndex(x, y, columns)] = 0
            }
        }
    }
    return rectangles
}
