/**
* 
* @param {AssetManager} ObjectManager
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

module.exports = basicMeshLoader;