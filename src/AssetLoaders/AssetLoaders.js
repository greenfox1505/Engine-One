var AsyncManager = require("../AsyncManager.js");

class AssetLoader extends AsyncManager {
    constructor(engine) {
        super({
            texture: require("./TextureLoader.js")(engine),
            geo: require("./GeometryLoader.js")(engine),
            mat: require("./MaterialLoader.js")(engine),
            text: require("./TextLoader.js")(engine),
        });
        this.assets = this.elements;
    }
}

module.exports = AssetLoader;