/**
 * 
 * @param {AssetManager} AssetManager
 */
module.exports = function (AssetManager) {
    var engine = AssetManager.engine;
    return function (args) {//this does not provide an oputuinty for utilizing JSDocs...
        return new Promise((res, rej) => {
            args; engine;
            var THREE = engine.libs.THREE;
            /**
             * TODO: I'm 3 scopes deep at this point before I've even started implementing this loader.
             * There has to be a flater way to implement this, but I don't have time to explore it now. 
             */


            var myTextureLoader = new THREE.TextureLoader();
            myTextureLoader.load(
                args.fileName,
                function (e) {//loaded callback
                    res(e);
                },
                function (e) {//progress callback
                    //idk what to do here... we need some sort of loader progress bar at some point...
                },
                function (e) {//error callback
                    debugger;
                    rej({
                        msg: "Texture Loader Failed",
                        error: e
                    })
                },
            )
        });
    }

}