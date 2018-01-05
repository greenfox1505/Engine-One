/**
 * //fuck this damn jsdocs. I can't make it identify Engine_One. It's right there...
 * @param {Engine_One} engine 
 */
function basicMeshLoader(engine) {
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

			engine.assetManager.completeList([args.geo,args.mat]).then(function(e){
				var geo = engine.assets[args.geo]
				var mat = engine.assets[args.mat]
				var myObject = new THREE.Mesh(geo.render,mat.render);
				myObject.position.x = args.pos[0]
				myObject.position.y = args.pos[1]
				myObject.position.z = args.pos[2]
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

module.exports = basicMeshLoader;