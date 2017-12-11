var engine = require("../main.js")

module.exports = function (engine) {
    return function (args) {
        return new Promise((res, rej) => {
            var error = ""
            var THREE = engine.libs.THREE;

            if (args.shader == "basic") {
                var mat = {
                    render: new THREE.MeshBasicMaterial({ color: args.color })
                }
                res(mat);
            }
            else { error = { msg: "INVALID args.shader", data: args } }
            if (error != "") {
                rej(error)
                throw error;
            }
        });
    }

}