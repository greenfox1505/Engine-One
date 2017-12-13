var maps = ["map", "normalMap"];
/**
 * 
 * @param {AssetManager} AssetManager
 */
module.exports = function (AssetManager) {
    var engine = AssetManager.engine;
    return function (args) {
        return new Promise((res, rej) => {
            //TODO: this loader could referance a texture. that promise needs to be resolved before continuing this loader.
            var error = ""
            var THREE = engine.libs.THREE;

            var dependancies = []
            //search for assets dependancies
            for (var i in maps) {
                if (args[maps[i]]) {//for every arguement type that is a type of map
                    var mapType = maps[i];
                    dependancies.push(AssetManager.assets[args[mapType]])//add it to the dependency type.
                    AssetManager.assets[args[mapType]].then(function (e) {//the when that map (texture) is finished loading,
                        args[mapType] = e;//replace the arguement with a fully loaded texture object
                    })
                }

            }
            Promise.all(dependancies).then(function (e) {

                if (args.shader == "basic") {
                    var mat = {
                        render: new THREE.MeshBasicMaterial(args)
                    }
                    res(mat);
                }
                if (args.shader == "normal") {
                    var mat = {
                        render: new THREE.MeshNormalMaterial(args)
                    }
                    res(mat);
                }
                else { error = { msg: "INVALID args.shader", data: args } }
                if (error != "") {
                    rej(error)
                    throw error;
                }
            })
        });
    }

}

