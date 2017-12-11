require("../main.js")

module.exports = function (engine) {
    return function (args) {
        return new Promise((res, rej) => {
            var error = ""

            var THREE = engine.libs.THREE;
            args; engine;
            console.log("into the rabbit hole we are")

            if (args.shape == "cube") {
                var geo = {
                    render: new THREE.BoxBufferGeometry(args.size[0],args.size[1],args.size[2])
                }
                res(geo);
            }
            else { error = { msg: "INVALID args.shape", data: args } }
            if (error != "") {
                rej(error)
                throw error;
            }
        });
    }

}