
var THREE = require("three")
var CANNON = require("cannon")
var AsyncManager = require("./AsyncManager.js")
var yaml = require("js-yaml")

/**
 * 
 */
class Engine_One {
    constructor() {
        this.libs = { THREE: THREE, CANNON: CANNON };
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.assetManager = new (require("./AssetLoaders/AssetLoaders.js"))(this);
        this.assets = this.assetManager.assets;
        this.objectManager = new (require("./ObjectManager/ObjectManager.js"))(this);
        this.objects = this.objectManager.objects;
        this.loadContent = LoadContent;
        this.loadBundle = LoadBundle;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        return this;

    }
    completeAll() {
        return Promise.all([this.assetManager.completeAll(), this.objectManager.completeAll()]);
    }
}

module.exports = Engine_One;

/**
 * 
 * @param {string} contentName 
 * @param {string} type
 * @returns {Promise} 
 */
function LoadContent(contentName, type) {//TODO: raw content string parsing along with file type? idk...
    var that = this;
    return new Promise((res, rej) => {//TODO: this will force load by extention, maybe allow for override?
        if (/.*\.yaml/.test(contentName) | type == "yaml") {
            that.assetManager.loaders.text(contentName).then((e) => {
                var output = yaml.safeLoad(e);
                if (output.type == "level") {
                    res(that.loadBundle(output));
                }
                else {
                    res(output);
                }
            })
        }
        else {
            var error = "UNINDENTIFIED FILE TYPE"
            rej(error);
            throw error;
        }
    })
}

function LoadBundle(bundleData) {
    for (var i in bundleData.assets) {
        var args = bundleData.assets[i];     
        i = i.split(" ");
        var name = i[0];
        //todo, if type is bundle, load bundle
        var type = i[1];

        this.assetManager.load({name:name,type:type,args:args})

    }
    for(var i in bundleData.objects){
        var args = bundleData.objects[i];     
        i = i.split(" ");
        var name = i[0];
        var type = i[1];

        this.objectManager.load({name:name,type:type,args:args})

    }

    var that = this;
    return new Promise((res, rej) => {
        debugger;
        that.completeAll().then(function(e){
            res(e);
        }).catch(rej);
    })
}