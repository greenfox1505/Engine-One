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

            throw "TEXT LOADER NOT READY! (should be easy to implement";
            
        });
    }

}