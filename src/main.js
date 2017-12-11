var Engine = new (require("./Engine_One.js"))();

//todo loop though level object
Engine.assetManager.loadAsset({ name: "textureTest", type: "texture", args: { fileName: ".X/Xtexture.jpg" } })
Engine.assetManager.loadAsset({ name: "myBox", type: "geo", args: { shape: "cube", size: [1, 1, 1] } })
Engine.assetManager.loadAsset({ name: "blue", type: "mat", args: { shader: "basic", color: 0x00000ff } })

//after load
Engine.assetManager.completePending().then(function (e) {
    var THREE = Engine.libs.THREE;



    var geometry = Engine.assets.myBox.render;
    var material = Engine.assets.blue.render;

    var cube = new THREE.Mesh(geometry, material);


    Engine.scene.add(cube);

    Engine.camera.position.z = 5;

    var animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        Engine.renderer.render(Engine.scene, Engine.camera);
    };

    animate();
})

