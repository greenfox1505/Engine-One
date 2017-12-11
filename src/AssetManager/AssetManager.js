"use strict"

/**
 * 
 * @param {AssetManager} myAssetManager 
 */
function defaultLoaders(myAssetManager) {//these should probably should be another class...
	myAssetManager.newAssetLoader("geo", require("./GeoAssetLoader.js")(myAssetManager.engine));
	myAssetManager.newAssetLoader("mat", require("./MatAssetLoader.js")(myAssetManager.engine));
}

class AssetManager {//maybe there is an asset manager concept that doesn't need to check asset type. it just loads all the types that match this asset... this isn't that
	constructor(engine) {
		this.engine = engine;
		this.assets = {};
		this.loaders = {};
		defaultLoaders(this);
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
			throw "Array not ready";
		}
		this.assets[asset.name] = this.loaders[asset.type](asset.args);
		this.assets[asset.name].then(function (loadedAsset) {
			that.assets[asset.name] = loadedAsset;
		})
		return this.assets[asset.name];
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
