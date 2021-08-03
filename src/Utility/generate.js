const fs = require('fs');

console.log("Generating project structure...")

// Make folders
fs.mkdirSync('../Game');

fs.mkdirSync('../Game/Assets')
fs.mkdirSync('../Game/Assets/data')
fs.mkdirSync('../Game/Assets/font')
fs.mkdirSync('../Game/Assets/image')
fs.mkdirSync('../Game/Assets/sound')

fs.mkdirSync('../Game/Components')
fs.mkdirSync('../Game/Entities')
fs.mkdirSync('../Game/Systems')

fs.mkdirSync('../Game/UI')
fs.mkdirSync('../Game/UI/Assets')
fs.mkdirSync('../Game/UI/Scenes')

// Make files

fs.writeFileSync('../Game/main.js', `import { Trengine } from '../Trengine-2/src/Engine/Trengine'
import { registerSystems } from './Systems/registerSystems'
import { registerComponents } from './Components/registerComponents'
 
Trengine.start({
    manifestPath: "../Game/Assets/manifest.json",
    onStart: async () => {
        const startSceneData = Trengine.Assets.data["scene.level.json"]
        await Trengine.ECS.loadScene(startSceneData)
    },
    registerSystems,
    registerComponents
})`)

fs.writeFileSync('../Game/Components/registerComponents.js', `export function registerComponents(ECS) {

}`)

fs.writeFileSync('../Game/Systems/registerSystems.js', `export function registerSystems(ECS) {

}`)

fs.writeFileSync('../Game/Assets/manifest.json', `{
    "imagePath": "image/",
    "soundPath": "sound/",
    "dataPath": "data/",
    "fontPath": "font/",
    "bundles": {
        "default": [

        ]
    }
}`)

fs.writeFileSync('../package.json', `{
    "name": "computer-graphics-final",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "cd Trengine-2/ && npm start"
    },
    "author": "",
    "license": "ISC"
}`)

fs.writeFileSync('../Game/Assets/data/scene.level.json', `{"id":"f2f8da24-f3ce-4b7e-9e16-dfe13c69434c","bundles":[],"singletonComponents":{"components":[],"id":"e93bfc00-9c3d-41b0-bb62-faf71c4f5ed4"},"entities":[],"systems":[]}`)

fs.writeFileSync('./.env', `PRODUCTION=false`)

console.log("Installing dependencies...")