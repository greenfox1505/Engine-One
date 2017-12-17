/**
 * Ansyc Manger is used manage various async resources as well as their dependancies.
 * @constructor
 */
class AsyncManager {
    constructor(defaultLoaders) {
        this.elements = {};
        this.loaders = {};
        for (var i in defaultLoaders) {
            this.newLoader(i, defaultLoaders[i]);
        }
    }

    /**
     * Load used to run a regeistered Async function. //TODO fix args here to match element thingy
     * @param {string} name 
     * @param {string} type 
     * @param {*} args
     * @returns {Promise} 
     */
    load(element) {
        var name = element.name;
        var type = element.type;
        var args = element.args
        const loader = this.loaders[type];
        this.elements[name] = loader(args);
        this.elements[name].then((e) => { this.elements[name] = e })
        return this.elements[name];
    }

    /**
     * Complete all pending promises.
     * @returns {Promise}
     */
    completeAll() {
        const that = this;
        return (new Promise((res, rej) => {
            const temp = [];
            for (const i in this.elements) {
                temp.push(this.elements[i]);
            }
            Promise.all(temp).then(e => {
                res(that.elements)
            });
        }))
    }

    /**
     * Promise of list, probaby should return an object... eh, if needed
     * @param {Array<String>} list 
     * @returns {Promise}
     */
    completeList(list) {
        const that = this;
        return (new Promise((res, rej) => {
            const temp = [];
            for (var i in list) {
                temp.push(this.elements[list[i]])
            }
            Promise.all(temp).then(e => {
                const ObjectStruct = {};
                for (i in list) {
                    ObjectStruct[list[i]] = e[i]
                }
                res(ObjectStruct)
            })

        }))
        return Promise.all(temp)
    }

    /**
     * 
     * @param {string} name 
     * @param {function} callback 
     */
    newLoader(name, callback) { //do I need to sort prerequisites?
        this.loaders[name] = callback;
    }
}

// var a = new AsyncManager({
//     text: function (args) {
//         return new Promise((res, rej) => {
//             var client = new XMLHttpRequest();
//             client.open('GET', args);
//             client.onload = function (e) {
//                 res(e.target.responseText);
//             }
//             client.onerror = function (e) {
//                 rej(e);
//             }
//             client.send();

//         })
//     },
//     json: function (args) {
//         return new Promise((res, rej) => {
//             a.loaders.text(args).then(function (e) {
//                 res(JSON.parse(e))
//             });
//         })
//     }
// });

// a.load({ name: "helloWorld", type: "text", args: "./package.json" }).then(function (e) {
//     console.log(e)
// })
// a.load({ name: "testTwo", type: "json", args: "./package.json" }).then((e)=>{
//     console.log(e);
//     debugger;    
// });

// a.completeAll().then((e) => console.log(e))


module.exports = AsyncManager;