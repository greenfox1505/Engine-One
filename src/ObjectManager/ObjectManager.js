var AsyncManager = require("../AsyncManager.js");

class ObjectManager extends AsyncManager {
    constructor(engine) {
        super({
            basicMesh:require("./BasicMeshLoader.js")(engine)
        });
        this.objects = this.elements;
    }
}

module.exports = ObjectManager;

