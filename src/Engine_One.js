var THREE = require("three")
var CANNON = require("cannon")

class Engine_One {
    constructor() {
        this.libs = { THREE: THREE, CANNON: CANNON };
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.assetManager = new (require("./AssetManager/AssetManager.js"))(this);
        this.assets = this.assetManager.assets;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        return this;

    }
}

module.exports = Engine_One