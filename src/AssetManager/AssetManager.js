"use strict"

/**
 * 
 * @param {AssetManager} myAssetManager 
 */
function defaultAssetLoaders(myAssetManager) {//these should probably should be another class...
	myAssetManager.newAssetLoader("geo", require("./GeometryLoader.js")(myAssetManager));
	myAssetManager.newAssetLoader("mat", require("./MaterialLoader.js")(myAssetManager));
	myAssetManager.newAssetLoader("texture", require("./TextureLoader.js")(myAssetManager));
}

class AssetManager {//maybe there is an asset manager concept that doesn't need to check asset type. it just loads all the types that match this asset... this isn't that
	constructor(engine) {
		this.engine = engine;
		this.assets = {};
		this.loaders = {};
		defaultAssetLoaders(this);
	}

    /**
     * @param {string|Array} name
     * @returns {Promise}
     */
	getAsset(name) {
		var that = this;
		if (Array.isArray(name)) {
			throw "Array not ready";
		}
		return new Promis(function (res, rej) {
			if (that.assets[name]) {
				res(that.assets[name]);
			}
			else {
				rej("Asset not here!");
			}
		});
	}

    /**
     * @param {object} asset
     * @param {string} asset.name
     * @param {string} asset.type
     * @param {object} asset.args
     * @returns {Promise.<string>}
     */
	loadAsset(asset) {
		var that = this
		if (Array.isArray(asset)) {
			throw "Array Object Loading not ready";
		}
		var name = asset.name;
		var type = asset.type;
		var args = asset.args;

		this.assets[name] = this.loaders[type](args);
		this.assets[name].then(function (loadedAsset) {
			that.assets[name] = loadedAsset;
		})
		return this.assets[name];
	}

    /**
     * @param {string} name
     * @param {function} loader
     */
	newAssetLoader(name, loader) {
		this.loaders[name] = loader;
	}

	/**
	 * @returns {Promise}
	 */
	completePending() {
		var that = this
		return (new Promise((res, rej) => {
			var temp = [];
			for (var i in this.assets) {
				temp.push(this.assets[i]);
			}
			Promise.all(temp).then(function (e) {
				res(that.assets)
			});
		}))
	}
}

module.exports = AssetManager;


// var a = new AssetManager();
// a.loadAsset({name:"crateGeo", type:"geo",args:{x:1,y:1,z:1}});
// a.loadAsset({name:"crateGeo2", type:"geo",args:{x:10,y:1,z:10}});
// a.complete().then(function(e){console.log(e)});
