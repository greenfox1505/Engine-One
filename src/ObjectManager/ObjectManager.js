"use strict"

/**
 * 
 * @param {AssetManager} ObjectManager
 */
function basicMeshLoader(ObjectManager) {
	var engine = ObjectManager.engine;
	/**
	 * 
	 * @param {object} args 
	 * @param {Promise} args.geo
	 * @param {Promise} args.mat
	 */
	function basicMeshLoader(args) {
		return new Promise((res, rej) => {
			args; engine;
			var error = ""
			var THREE = engine.libs.THREE;
			Promise.all([engine.assets[args.geo], engine.assets[args.mat]]).then(function (e) {
				var myObject = new THREE.Mesh(e[0].render, e[1].render);

				engine.scene.add(myObject)
				res(myObject)
			})

			if (error != "") {
				rej(error)
				throw error;
			}
		});
	}
	return basicMeshLoader;

}
/**
 * 
 * @param {ObjectManager} ObjectManager 
 */
function defaultObjectLoaders(ObjectManager) {
	ObjectManager.newObjectLoader("basicMesh", basicMeshLoader(ObjectManager));
}

class ObjectManager {
	/**
	 * 
	 * @param {Engine_One} engine 
	 */
	constructor(engine) {
		this.engine = engine;
		this.assets = engine.assets
		this.loaders = {};
		this.objects = {};

		defaultObjectLoaders(this);
	}
	loadObject(obj) {
		var that = this
		if (Array.isArray(obj)) {
			throw "Array Object Loading not ready";
		}
		var name = obj.name;
		var type = obj.type;
		var args = obj.args;

		that.objects[name] = that.loaders[type](args);
		that.objects[name].then(function (loadedObj) {
			that.objects[name] = loadedObj;
		})
		return that.objects[name];
	}
	newObjectLoader(name, loader) {
		this.loaders[name] = loader;
	}
	completePending() {
		var that = this
		return (new Promise((res, rej) => {
			var temp = [];
			for (var i in this.objects) {
				temp.push(this.objects[i]);
			}
			Promise.all(temp).then(function (e) {
				res(that.objects)
			});
		}))
	}
}



module.exports = ObjectManager;