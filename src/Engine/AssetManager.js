import { Howl } from 'howler'

import { promises as fs } from 'fs'
import path from 'path'

const AssetType = Object.freeze({
    Image: 0,
    Sound: 1,
    Data: 2
})

export function loadImage(src) {
    return new Promise(resolve => {
        let img = document.createElement('img')
        img.addEventListener('load', () => { resolve(img) }, false)
        img.src = src
    })
}

export class AssetManager {
    constructor() {
        this._manifest = null
        this._imagePath = ''
        this._soundPath = ''
        this._dataPath = ''
        this._loadedBundles = []

        this.images = {}
        this.sounds = {}
        this.data = {}
    }

    loadManifest(manifestPath) {
        return fetch(manifestPath).then((res) => res.json())
            .then((manifest) => {
                const rootPath = this._removeLastDir(manifestPath)
                this._imagePath = rootPath + manifest.imagePath
                this._soundPath = rootPath + manifest.soundPath
                this._dataPath = rootPath + manifest.dataPath
                this._manifest = manifest
            })
    }

    loadBundle(bundle) {
        if (this._manifest == null) throw "Asset manifest has not been loaded"

        if (this._loadedBundles.includes(bundle)) return Promise.resolve()
        this._loadedBundles.push(bundle)

        const assetList = this._manifest.bundles[bundle]
        const typesAndAssets = assetList.map(asset => {
            return { type: this._getAssetType(asset), asset }
        })
        const promises = typesAndAssets.map(({ type, asset }) => {
            switch (type) {
                case AssetType.Image:
                    return loadImage(this._imagePath + asset).then((resource) => { return { resource, asset, type } })
                case AssetType.Sound:
                    return new Promise((resolve) => {
                        resolve({ resource: new Howl({ src: this._soundPath + asset }), asset, type })
                    })
                case AssetType.Data:
                    return fetch(this._dataPath + asset).then((res) => res.json()).then((resource) => { return { resource, asset, type } })
                default:
                    throw `File extension for asset ${asset} not supported`
            }
        })
        return Promise.all(promises).then((responses) => {
            responses.forEach((response) => {
                switch (response.type) {
                    case AssetType.Image:
                        this.images[response.asset] = response.resource
                        break
                    case AssetType.Sound:
                        this.sounds[response.asset] = response.resource
                        break
                    case AssetType.Data:
                        this.data[response.asset] = response.resource
                        break
                }
            })
        })
    }

    getBundleNames() {
        return Object.keys(this._manifest.bundles)
    }

    async saveJSONFile(fileName, data) {
        await fs.writeFile(path.join(__dirname, this._dataPath, fileName), JSON.stringify(data))
    }

    async renameJSONFile(oldFileName, newFileName) {
        await fs.rename(
            path.join(__dirname, this._dataPath, oldFileName),
            path.join(__dirname, this._dataPath, newFileName)
        )
    }

    _getAssetType(asset) {
        const extension = this._getAssetExtension(asset)
        switch (extension) {
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
                return AssetType.Image
            case "wav":
            case "mp3":
            case "ogg":
            case "aac":
            case "m4a":
                return AssetType.Sound
            case "json":
                return AssetType.Data
        }
    }

    _removeLastDir(path) {
        let temp = path.split('/')
        temp.pop()
        return temp.join('/') + '/'
    }

    _getAssetExtension(path) {
        return path.split('.').pop()
    }
}