var Engine = new (require("./Engine_One.js"))();


//todo loop though level object
Engine.assetManager.load({ name: "textureTest", type: "texture", args: { fileName: "./Assets/X/XTexture.jpg" } })
Engine.assetManager.load({ name: "myBox", type: "geo", args: { shape: "cube", size: [1, 1, 1] } })
Engine.assetManager.load({ name: "blue", type: "mat", args: { shader: "basic", color: 0x00000ff } })
Engine.assetManager.load({ name: "normal", type: "mat", args: { shader: "normal"} })
Engine.assetManager.load({ name: "BasicX", type: "mat", args: { shader: "basic", map: "textureTest" } })


Engine.assetManager.completeAll().then((e)=>{
    console.log(Engine);
})

Engine.objectManager.load({name:"floatingBox",type:"basicMesh",args:{geo:"myBox",mat:"BasicX"}})

//after load
Engine.completeAll().then(function (e) {
    var THREE = Engine.libs.THREE;

    var cube = Engine.objectManager.objects.floatingBox;

    Engine.camera.position.z = 5;

    var animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        Engine.renderer.render(Engine.scene, Engine.camera);
    };

    animate();
})

