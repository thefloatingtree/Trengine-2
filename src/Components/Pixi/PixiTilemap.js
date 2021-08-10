import { Component } from "../../Engine/ECS/Component"
import { ComponentData } from "../../Engine/ECS/Persistence/ComponentData"
import { Trengine } from "../../Engine/Trengine"
import { Sprite, BaseTexture, Texture } from 'pixi.js'
import { Tilemap } from '@pixi/tilemap'


export class PixiTilemap extends Component {
    constructor({ tileData, texture, x = 0, y = 0 } = {}) {
        super()
        this.x = x
        this.y = y
        this.tileData = tileData
        this.texture = texture
        // computed
        this.tilemap
    }

    serialize() {
        return new ComponentData({
            componentType: this.className(),
            data: {
                x: this.x,
                y: this.y,
                tileData: this.tileData,
                texture: this.texture
            }
        })
    }

    init() {
        const pixiTexture = new Texture(new BaseTexture(Trengine.Assets.images[this.texture]))
        this.tilemap = new Tilemap(pixiTexture)

        this.data = Trengine.Assets.data[this.tileData]

        console.log(this.data)

        const tileWidth = this.data.tilewidth
        const tileHeight = this.data.tileheight
        const tilesetColumns = pixiTexture.width / tileWidth
        const tilesetRows = pixiTexture.height / tileHeight
        const { data, height: chunkHeight, width: chunkWidth, x: chunkX, y: chunkY } = this.data.layers[0]

        data.forEach((tileIndex, index) => {
            tileIndex -= 1

            if (tileIndex < 0) return

            let x = ((index % chunkWidth) + chunkX) * tileWidth
            let y = (Math.floor(index / chunkHeight) + chunkY) * tileHeight
            let u = (tileIndex % tilesetColumns) * tileWidth
            let v = (Math.floor(tileIndex / tilesetRows)) * tileHeight

            this.tilemap.tile(0, x, y, {
                tileWidth,
                tileHeight,
                u,
                v
            })
        })

        this.tilemap.x = this.x
        this.tilemap.y = this.y

        Trengine.Events.send('PixiDrawableAdded', this.tilemap)
    }

    dispose() {
        Trengine.Events.send('PixiDrawableRemoved', this.tilemap)
    }
}