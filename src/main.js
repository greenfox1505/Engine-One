var Engine = new (require("./Engine_One.js"))();

Engine.loadContent("./level/test.yaml").then((e)=>{
    debugger
    return Engine.completeAll();
}).then(function (e) {
    console.log(e);
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

