var Engine = new (require("./Engine_One.js"))();

//todo loop though level object
Engine.assetManager.loadAsset({ name: "textureTest", type: "texture", args: { fileName: "./Assets/X/XTexture.jpg" } })
Engine.assetManager.loadAsset({ name: "myBox", type: "geo", args: { shape: "cube", size: [1, 1, 1] } })
Engine.assetManager.loadAsset({ name: "blue", type: "mat", args: { shader: "basic", color: 0x00000ff } })
Engine.assetManager.loadAsset({ name: "normal", type: "mat", args: { shader: "normal"} })
Engine.assetManager.loadAsset({ name: "BasicX", type: "mat", args: { shader: "basic", map: "textureTest" } })


Engine.objectManager.loadObject({name:"floatingBox",type:"basicMesh",args:{geo:"myBox",mat:"BasicX"}})

//after load
Engine.completePending().then(function (e) {
    var THREE = Engine.libs.THREE;

    var cube = Engine.objectManager.objects.floatingBox;

    (new THREE.OBJLoader()).load("./Assets/monkey.obj",function(obj){
        Engine.scene.add(obj);
        obj.children[0].material = Engine.assets.normal.render;
   })

    Engine.camera.position.z = 5;

    var animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        Engine.renderer.render(Engine.scene, Engine.camera);
    };

    animate();
})

