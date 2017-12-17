var THREE = require("three")
var CANNON = require("cannon")
var AsyncManager = require("./AsyncManager.js")

/**
 * 
 */
module.exports = class Engine_One {
    constructor()  {
        this.libs = { THREE: THREE, CANNON: CANNON };
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.assetManager = new (require("./AssetLoaders/AssetLoaders.js"))(this);
        this.assets = this.assetManager.assets;
        this.objectManager = new (require("./ObjectManager/ObjectManager.js"))(this);
        this.objects = this.objectManager.objects

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        return this;

    }
    completeAll(){
        return Promise.all([this.assetManager.completeAll(),this.objectManager.completeAll()]);
    }
}

