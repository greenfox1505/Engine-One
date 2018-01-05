/**
 * 
 * @param {Engine_One} engine
 */
module.exports = function (engine) {
    return function (args) {//this does not provide an oputuinty for utilizing JSDocs...
        return new Promise((res, rej) => {
            args; engine;
            var THREE = engine.libs.THREE;

            var loader = new THREE.FileLoader();

            loader.load(
                args,
                (data) => {//onload
                    res(data)
                },
                (data) => {//onprogress
                    console.log(data);
                },
                (data) => {//onerr
                    var error = { message: "Faild to load", data: data }
                    rej(error);
                    throw error;
                })



        });
    }

}