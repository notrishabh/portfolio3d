//Variable Declaration Section
let physicsWorld, camera, scene, renderer;
let rigidBodies = [], tmpTrans = null;
let ballObject = null;
let moveDirection = {left: 0, right: 0, forward: 0, back: 0};
var arroww;
var namer;
var imagePlane;
var subnamer;
let cloudParticles = [], flash;


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


var boxFunc = {
    box1 : {
        pos : {x:-16, y:6, z:-10},
        scale : {x:10, y:10, z:10},
        mass : 0,
        quat : {x:0, y:0, z:0, w:1}
    },
    box2 : {
        pos : {x:16, y:8.5, z:-10},
        scale : {x:15, y:15, z:15},
        mass : 0,
        quat : {x:0, y:0, z:0, w:1}
    },
    box3 : {
        pos : {x:-30, y:2, z:-10},
        scale : {x:4, y:2, z:2},
        mass : 1,
        quat : {x:0, y:0, z:0, w:1}
    },
    box4 : {
        pos : {x:-30, y:4, z:-10},
        scale : {x:4, y:2, z:2},
        mass : 1,
        quat : {x:0, y:0, z:0, w:1}
    }
}

var modelsFunc = {
    greenBottle: {
        mtl: "models/greenBottle4.mtl",
        obj: "models/greenBottle4.obj",
        pos : {x:30, y:5, z:30},
        scale : {x:50, y:50, z:50},
        rotation : {x:0, y:0, z:0},
        quat : {x:0, y:0, z:0, w:1},
        mass : 0,
        phyScale : {x:1.5, y:7, z:1.5}
    },
    plane: {
        mtl: "models/plane/plane.mtl",
        obj: "models/plane/plane.obj",
        pos : {x:0, y:1, z:0},
        scale : {x:1, y:1, z:1},
        rotation : {x:0, y:0, z:0},
        quat : {x:0, y:0, z:0, w:1},
        mass : 0,
        phyScale : {x:65, y:0, z:65}
    },
    codedocs: {
        mesh : {},
        mtl: "models/codedocs.mtl",
        obj: "models/codedocs.obj",
        pos : {x:-60, y:10, z:-55},
        scale : {x:6, y:6, z:6},
        rotation : {x:0, y:5.6, z:0},
        quat : {x:0, y:2, z:0, w:1},
        mass : 0,
        phyScale : {x:1, y:7, z:3.5},
        callback : codedocsHandler
    },
    ccn: {
        mesh : {},
        mtl: "models/ccn.mtl",
        obj: "models/ccn.obj",
        pos : {x:0, y:10, z:-55},
        scale : {x:6, y:6, z:6},
        rotation : {x:0, y:5.3, z:0},
        quat : {x:0, y:2, z:0, w:1},
        mass : 0,
        phyScale : {x:1, y:7, z:3.5},
        callback : ccnHandler

    },
    propkar: {
        mesh : {},
        mtl: "models/newpc.mtl",
        obj: "models/newpc.obj",
        pos : {x:-15, y:12, z:-55},
        scale : {x:16, y:16, z:16},
        rotation : {x:0, y:5.3, z:0},
        quat : {x:0, y:0, z:0, w:1},
        mass : 0,
        phyScale : {x:1, y:10, z:1},
        callback : propkarHandler
    },
    stb: {
        mesh : {},
        mtl: "models/newpc.mtl",
        obj: "models/newpc.obj",
        pos : {x:-40, y:12, z:-55},
        scale : {x:16, y:16, z:16},
        rotation : {x:0, y:5.3, z:0},
        quat : {x:0, y:0, z:0, w:1},
        mass : 0,
        phyScale : {x:1, y:10, z:1},
        callback : stbHandler

    },
    github: {
        mesh : {},
        mtl: "models/github.mtl",
        obj: "models/github.obj",
        pos : {x:45, y:3, z:10},
        scale : {x:5, y:5, z:5},
        rotation : {x:0, y:-2, z:0},
        quat : {x:0, y:0, z:0, w:1},
        mass : 0,
        phyScale : {x:1, y:10, z:1},
        callback : githubHandler
    },
    linkedin: {
        mesh : {},
        mtl: "models/linkedin.mtl",
        obj: "models/linkedin.obj",
        pos : {x:45, y:3, z:20},
        scale : {x:5, y:5, z:5},
        rotation : {x:0, y:-2, z:0},
        quat : {x:0, y:0, z:0, w:1},
        mass : 0,
        phyScale : {x:1, y:10, z:1},
        callback : linkedinHandler
    },
    gmail: {
        mesh : {},
        mtl: "models/gmail.mtl",
        obj: "models/gmail.obj",
        pos : {x:45, y:3, z:30},
        scale : {x:5, y:5, z:5},
        rotation : {x:0, y:-2, z:0},
        quat : {x:0, y:0, z:0, w:1},
        mass : 0,
        phyScale : {x:1, y:10, z:1},
        callback : gmailHandler
    },

};

var imageFunc = {
    js : {
        img: "models/plane/js.png",
        pos: {x:-53, y:1.001, z:29},
        scale: {x:5, y:5, z:5},
        rotation: {x:-1.5708, y:0, z:0},
    },
    flutter : {
        img: "models/plane/flutter2.png",
        pos: {x:-43, y:1.001, z:29},
        scale: {x:5, y:5, z:5},
        rotation: {x:-1.5708, y:0, z:0}
    },
    c : {
        img: "models/plane/c++.png",
        pos: {x:-33, y:1.001, z:29},
        scale: {x:5, y:5, z:5},
        rotation: {x:-1.5708, y:0, z:0}
    },
    node : {
        img: "models/plane/node.png",
        pos: {x:-53, y:1.001, z:38},
        scale: {x:5, y:5, z:5},
        rotation: {x:-1.5708, y:0, z:0}
    },
    mysql : {
        img: "models/plane/mysql.png",
        pos: {x:-43, y:1.001, z:38},
        scale: {x:5, y:5, z:5},
        rotation: {x:-1.5708, y:0, z:0}
    },
    react : {
        img: "models/plane/react.png",
        pos: {x:-33, y:1.001, z:38},
        scale: {x:5, y:5, z:5},
        rotation: {x:-1.5708, y:0, z:0}
    },
    boot : {
        img: "models/plane/bootstrap.png",
        pos: {x:-53, y:1.001, z:48},
        scale: {x:5, y:5, z:5},
        rotation: {x:-1.5708, y:0, z:0}
    },
    html : {
        img: "models/plane/html.png",
        pos: {x:-43, y:1.001, z:48},
        scale: {x:5, y:5, z:5},
        rotation: {x:-1.5708, y:0, z:0}
    },
    blender : {
        img: "models/plane/blender.png",
        pos: {x:-33, y:1.001, z:48},
        scale: {x:5, y:5, z:5},
        rotation: {x:-1.5708, y:0, z:0}
    },
    stb : {
        img: "models/images/stb2.png",
        pos: {x:-40, y:14, z:-54.5},
        scale: {x:21, y:13, z:15},
        rotation: {x:0, y:-5.7, z:0}
    },
    propkar : {
        img: "models/images/propkar.png",
        pos: {x:-15, y:14, z:-54.5},
        scale: {x:21, y:13, z:15},
        rotation: {x:0, y:-5.7, z:0}
    },
};

const STATE = {DISABLE_DEACTIVATION : 4};

//Ammojs Initialization

Ammo().then(start)

function start(){

    tmpTrans = new Ammo.btTransform();
    
    setupPhysicsWorld();
    setupGraphics();
    backG();
    // createPlane();
    createBall();
    // createBox(boxFunc.box1);
    // createBox(boxFunc.box2);
    // createBox(boxFunc.box3);
    // createBox(boxFunc.box4);
    // models(modelsFunc.police);
    // models(modelsFunc.tree);
    // models(modelsFunc.race);
    models(modelsFunc.plane);
    models(modelsFunc.codedocs);
    models(modelsFunc.ccn);
    models(modelsFunc.propkar);
    models(modelsFunc.stb);
    models(modelsFunc.github);
    models(modelsFunc.linkedin);
    models(modelsFunc.gmail);
    namePlate();
    subNamePlate();
    // projects();
    // arrow();
    // models(modelsFunc.greenBottle);
    image(imageFunc.js);
    image(imageFunc.flutter);
    image(imageFunc.c);
    image(imageFunc.node);
    image(imageFunc.mysql);
    image(imageFunc.react);
    image(imageFunc.boot);
    image(imageFunc.html);
    image(imageFunc.blender);
    image(imageFunc.stb);
    image(imageFunc.propkar);
    // models(modelsFunc.dice);
    setupEventHandlers();

    renderFrame();
    


}

function setupPhysicsWorld(){

    let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
        dispatcher = new Ammo. btCollisionDispatcher(collisionConfiguration),
        overlappingPairCache = new Ammo.btDbvtBroadphase(),
        solver = new Ammo.btSequentialImpulseConstraintSolver();

    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0,-15,0));

}

function setupGraphics(){

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x404040);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.2,5000);
    camera.position.set(0,30,50);
    // camera.lookAt(new THREE.Vector3(0,10,0));

    // let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5);
    // hemiLight.color.setHSL( 0.6, 0.6, 0.6 );
    // hemiLight.groundColor.setHSL( 0.1, 1, 0.4 );
    // hemiLight.position.set( 0, 50, 0 );
    // scene.add( hemiLight );


    // let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    // dirLight.color.setHSL( 0.1, 1, 0.95 );
    // dirLight.position.set( 50, 200, 150 );
    // scene.add(dirLight);


    // dirLight.castShadow = true;

    // dirLight.shadow.mapSize.width = 2048;
    // dirLight.shadow.mapSize.height = 2048;

    // let d = 50;

    // dirLight.shadow.camera.left = -d;
    // dirLight.shadow.camera.right = d;
    // dirLight.shadow.camera.top = d;
    // dirLight.shadow.camera.bottom = -d;

    // dirLight.shadow.camera.far = 13500;

    ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);
    

    flash = new THREE.PointLight(0x062d89, 30, 500 ,1.7);
    flash.position.set(50,100,-600);
    scene.add(flash);

    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
    hemiLight.color.setHSL(0.6, 0.6, 0.6);
    hemiLight.groundColor.setHSL(0.1, 1, 0.4);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    //Add directional light
    let dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(10, 100, 50);
    dirLight.position.multiplyScalar(100);
    scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;

    let d = 200;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 15000;

    renderer = new THREE.WebGLRenderer({antialias: true});
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // renderer.gammaInput = true;
    // renderer.gammaOutput = true;
    
    renderer.shadowMap.enabled = true;

}

function renderFrame(){
    let deltaTime = clock.getDelta();

    moveBall();

    if(ballObject.position.x > -65 && ballObject.position.x < 13 && ballObject.position.z > -55 && ballObject.position.z < -15){
        camera.position.set(ballObject.position.x,40,ballObject.position.z +20);
    }else if(ballObject.position.x > -58 && ballObject.position.x < -29 && ballObject.position.z > 21 && ballObject.position.z < 54) {
        camera.position.set(ballObject.position.x,40,ballObject.position.z +10);
    }else{
        camera.position.set(ballObject.position.x,25,ballObject.position.z +35);

    }
    camera.lookAt(ballObject.position);

    cloudParticles.forEach(p => {
        p.rotation.z -=0.002;
      });
    if(Math.random() > 0.93 || flash.power > 100) {
    if(flash.power < 100) 
        flash.position.set(
        Math.random()*1000,
        300 + Math.random() *200,
        // 200,
        -400
        // 100
        );
    flash.power = 50 + Math.random() * 500;
    }



    updatePhysics(deltaTime);

    renderer.render(scene,camera);
    requestAnimationFrame(renderFrame);

    // setTimeout(function() {arroww.rotation.y += 0.01;},1000)
    



}

function setupEventHandlers() {
    window.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('keyup', handleKeyUp, false);
    window.addEventListener('click', onMouseDown, false );
    window.addEventListener("resize", onWindowResize);
}

function handleKeyDown(event) {
    let keyCode = event.keyCode;

    switch(keyCode){
        case 37: moveDirection.left = 1;
        break;

        case 38: moveDirection.forward = 1;
        break;

        case 39: moveDirection.right = 1;
        break;

        case 40: moveDirection.back = 1;
        break;

    }
}

function handleKeyUp(event) {
    let keyCode = event.keyCode;

    switch(keyCode){
        case 37: moveDirection.left = 0;
        break;

        case 38: moveDirection.forward = 0;
        break;

        case 39: moveDirection.right = 0;
        break;

        case 40: moveDirection.back = 0;
        break;

    }
}

function objectClickHandler(){
    window.open('http://www.google.com/','_blank');
}

function objectClickHandler2(){
    window.open('http://www.youtube.com/','_blank');
}
function codedocsHandler(){
    window.open('https://github.com/notrishabh/CodeDocs','_blank');
}
function ccnHandler(){
    window.open('https://github.com/notrishabh/ccnnewspaper','_blank');
}
function propkarHandler(){
    window.open('https://github.com/notrishabh/propkarcharitable','_blank');
}
function stbHandler(){
    window.open('https://github.com/notrishabh/ccn','_blank');
}
function githubHandler(){
    window.open('https://github.com/notrishabh/','_blank');
}
function linkedinHandler(){
    window.open('https://www.linkedin.com/in/rishabh-chauhan-5528b11b4/','_blank');
}
function gmailHandler(){
    window.open('mailto:rishabh107107@gmail.com','_blank');
}

function onMouseDown(event) {
    event.preventDefault();

     
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    meshObjects = [modelsFunc.codedocs.mesh, modelsFunc.ccn.mesh, modelsFunc.propkar.mesh, modelsFunc.stb.mesh, modelsFunc.github.mesh, modelsFunc.linkedin.mesh, modelsFunc.gmail.mesh ];

    var intersects = raycaster.intersectObjects(meshObjects, true);

    for ( var i=0; i<intersects.length; i++) {
        // intersects[0].object.callback();
        if(intersects[i].object.name.includes("Material.002")){
            // console.log("material02");
            // console.log(intersects[i]);
            intersects[0].object.callback();

        }else if(intersects[i].object.name.includes("Material")) {
            // console.log("nice");
            // console.log(intersects[i]);
        }else if(intersects[i].object.name.includes("None")) {
            // console.log("none");
            // console.log(intersects[i]);
        }else{
            // console.log(intersects[i]);
            intersects[0].object.callback();
        }
    }
}

function backG() {
    let loader = new THREE.TextureLoader();
        loader.load("textures/smoke.png", function(texture){
        cloudGeo = new THREE.PlaneBufferGeometry(500,500);
        cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        // let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
        // scene.add(cloud);
        for(let p=0; p<25; p++) {
            let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
            // cloud.position.set(
            // Math.random()*800 -400,
            // 500,
            // Math.random()*500 - 450
            // );
            cloud.position.set(
            Math.random()*1000 - 500,
            // Math.random()*1000 - 450,
            100,
            // -500
            Math.random()*-800 - 400
            );
            
            // cloud.rotation.x = 1.16;
            // cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*360;
            cloud.material.opacity = 0.6;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
    });
}


function createPlane(){

    let pos = {x:0, y:0, z:0};
    let scale = {x:100, y:2, z:100};
    let quat = {x:0, y:0, z:0, w:1};
    let mass = 0;

    let plane = new THREE.Mesh(
        new THREE.BoxBufferGeometry(),
        new THREE.MeshPhongMaterial({
            color: 0xa0afa4,
            opacity: 0.1,
            transparent: true
        })
    );

    plane.position.set(pos.x, pos.y, pos.z);
    plane.scale.set(scale.x, scale.y, scale.z);

    plane.castShadow = true;
    plane.receiveShadow = true;

    scene.add(plane);

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(4);
    body.setRollingFriction(10);

    physicsWorld.addRigidBody(body);
}

function createBall(){
    let pos = {x:0, y:2, z:5};
    let radius = 2;
    let quat = {x:0, y:0, z:0, w:1};
    let mass = 1;

    let textureLoader = new THREE.TextureLoader();
    ballTexture = textureLoader.load("textures/rock0_color.jpg");
    normalTexture = textureLoader.load("textures/rock0_normal.jpg");
    displacementTexture= textureLoader.load("textures/Rock0_Displacement.jpg");
    roughnessTexture= textureLoader.load("textures/Rock0_Roughness.jpg");
    aoTexture= textureLoader.load("textures/Rock0_AmbientOcclusion.jpg");


    let ball = ballObject = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 32, 32),
        new THREE.MeshStandardMaterial({
            map: ballTexture,
            normalMap : normalTexture,
            // displacementMap : displacementTexture,
            roughnessMap: roughnessTexture,
            aoMap : aoTexture

        }),
    );
    ball.position.set(pos.x, pos.y, pos.z);
    
    ball.castShadow = true;
    ball.receiveShadow = true;

    scene.add(ball);

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    let motionState = new Ammo.btDefaultMotionState(transform);

    let colShape = new Ammo.btSphereShape(radius);
    colShape.setMargin(0.05);

    let localInertia = new Ammo.btVector3(0,0,0);
    colShape.calculateLocalInertia(mass, localInertia);

    let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
    let body = new Ammo.btRigidBody(rbInfo);

    body.setFriction(4);
    body.setRollingFriction(10);
    body.setActivationState(STATE.DISABLE_DEACTIVATION);

    physicsWorld.addRigidBody(body);

    ball.userData.physicsBody = body;
    rigidBodies.push(ball);

}

function createBox(boxFunc) {

    let textureLoader = new THREE.TextureLoader();
    boxTexture = textureLoader.load("textures/crate0/crate0_diffuse.png");
    boxNormalMap = textureLoader.load("textures/crate0/crate0_normal.png");
    boxBumpMap = textureLoader.load("textures/crate0/crate0_bump.png");

    let box = new THREE.Mesh(
        new THREE.BoxBufferGeometry(),
        new THREE.MeshPhongMaterial({
            map: boxTexture,
            normalMap: boxNormalMap,
            bumpMap: boxBumpMap
        })
    );
    box.position.set(boxFunc.pos.x, boxFunc.pos.y, boxFunc.pos.z);
    box.scale.set(boxFunc.scale.x, boxFunc.scale.y, boxFunc.scale.z);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box);

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( boxFunc.pos.x, boxFunc.pos.y, boxFunc.pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( boxFunc.quat.x, boxFunc.quat.y, boxFunc.quat.z, boxFunc.quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( boxFunc.scale.x * 0.5, boxFunc.scale.y * 0.5, boxFunc.scale.z * 0.5 ) );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( boxFunc.mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( boxFunc.mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(4);
    body.setRollingFriction(10);
    body.setActivationState(STATE.DISABLE_DEACTIVATION);

    physicsWorld.addRigidBody(body);
    box.userData.physicsBody = body;
    rigidBodies.push(box);

}

function models(modelsFunc) {

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(modelsFunc.mtl, function(materials) {
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(modelsFunc.obj, function(mesh) {
            mesh.traverse(function(node) {
                if(node instanceof THREE.Mesh){
                    node.castShadow=true;
                    node.receiveShadow=true;
                    node.callback = modelsFunc.callback;
                    }
                });
                mesh.position.set(modelsFunc.pos.x, modelsFunc.pos.y, modelsFunc.pos.z);
                mesh.scale.set(modelsFunc.scale.x, modelsFunc.scale.y, modelsFunc.scale.z);
                mesh.rotation.set(modelsFunc.rotation.x, modelsFunc.rotation.y, modelsFunc.rotation.z);
                scene.add(mesh);
                modelsFunc.mesh = mesh;
        });
    });

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( modelsFunc.pos.x, modelsFunc.pos.y, modelsFunc.pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( modelsFunc.quat.x, modelsFunc.quat.y, modelsFunc.quat.z, modelsFunc.quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( modelsFunc.phyScale.x , modelsFunc.phyScale.y , modelsFunc.phyScale.z) );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( modelsFunc.mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( modelsFunc.mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(4);
    body.setRollingFriction(10);

    physicsWorld.addRigidBody(body);

}


function namePlate() {
    let pos = {x:-10, y:1.2, z:0};
    let scale = {x:5, y:5, z:5};
    let rotation = {x:0, y:-1.57, z:0};
    let quat = {x:0, y:0, z:0, w:1};
    let mass = 0;
    let phyScale = {x:11, y:2, z:0};

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("models/plane/name.mtl", function(materials) {
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load("models/plane/name.obj", function(mesh) {
            mesh.traverse(function(node) {
                if(node instanceof THREE.Mesh){
                    node.castShadow=true;
                    node.receiveShadow=true;
                    node.callback = objectClickHandler;
                    }
                });
                mesh.position.set(pos.x, pos.y, pos.z);
                mesh.scale.set(scale.x, scale.y, scale.z);
                mesh.rotation.set(rotation.x, rotation.y, rotation.z);
                scene.add(mesh);
                namer = mesh;
        });
    });

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( phyScale.x , phyScale.y , phyScale.z) );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(4);
    body.setRollingFriction(10);

    physicsWorld.addRigidBody(body);
}


function subNamePlate() {
    let pos = {x:9, y:1.5, z:0};
    let scale = {x:5, y:5, z:8};
    let rotation = {x:0, y:-1.57, z:0};
    let quat = {x:0, y:0, z:0, w:1};
    let mass = 0;
    let phyScale = {x:10, y:2, z:0};

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("models/plane/subName2.mtl", function(materials) {
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load("models/plane/subName2.obj", function(mesh) {
            mesh.traverse(function(node) {
                if(node instanceof THREE.Mesh){
                    node.castShadow=true;
                    node.receiveShadow=true;
                    node.callback = objectClickHandler2;
                    }
                });
                mesh.position.set(pos.x, pos.y, pos.z);
                mesh.scale.set(scale.x, scale.y, scale.z);
                mesh.rotation.set(rotation.x, rotation.y, rotation.z);
                scene.add(mesh);
                subnamer = mesh;
        });
    });

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( phyScale.x , phyScale.y , phyScale.z) );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(4);
    body.setRollingFriction(10);

    physicsWorld.addRigidBody(body);
}

function projects() {
    let pos = {x:-60, y:1, z:-60};
    let scale = {x:5, y:2, z:3};
    let rotation = {x:0, y:-0.78, z:0};
    let quat = {x:0, y:0, z:0, w:1};
    let mass = 0;
    let phyScale = {x:1, y:2, z:1};

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("models/plane/projects1.mtl", function(materials) {
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load("models/plane/projects1.obj", function(mesh) {
            mesh.traverse(function(node) {
                if(node instanceof THREE.Mesh){
                    node.castShadow=true;
                    node.receiveShadow=true;
                    }
                });
                mesh.position.set(pos.x, pos.y, pos.z);
                mesh.scale.set(scale.x, scale.y, scale.z);
                mesh.rotation.set(rotation.x, rotation.y, rotation.z);
                scene.add(mesh);
        });
    });

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( phyScale.x , phyScale.y , phyScale.z) );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(4);
    body.setRollingFriction(10);

    physicsWorld.addRigidBody(body);
}

function arrow() {

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("models/plane/arrow.mtl", function(materials) {
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load("models/plane/arrow.obj", function(mesh) {
            mesh.traverse(function(node) {
                if(node instanceof THREE.Mesh){
                    node.castShadow=true;
                    node.receiveShadow=true;
                    }
                });
                mesh.position.set(-50, 9, -67);
                mesh.scale.set(5, 4, 5);
                mesh.rotation.set(0, -0.78, 0);
                scene.add(mesh);
                arroww = mesh;
        });
    });

}

function image(imageFunc){
    imagePlane = new THREE.Mesh(
        new THREE.PlaneGeometry(),
        new THREE.MeshBasicMaterial({
            map:THREE.ImageUtils.loadTexture(imageFunc.img),
            transparent:true
        })
    );
    imagePlane.position.set(imageFunc.pos.x, imageFunc.pos.y, imageFunc.pos.z);
    imagePlane.scale.set(imageFunc.scale.x, imageFunc.scale.y, imageFunc.scale.z);
    imagePlane.rotation.set(imageFunc.rotation.x, imageFunc.rotation.y, imageFunc.rotation.z);

    imagePlane.castShadow = true;
    imagePlane.receiveShadow = true;

    scene.add(imagePlane);
}


function moveBall(){
    let scalingFactor = 20;

    let moveX = moveDirection.right - moveDirection.left;
    let moveZ = moveDirection.back - moveDirection.forward;
    let moveY = 0;

    if(moveX == 0 && moveY == 0 && moveZ == 0) return;

    let resultantImpulse = new Ammo.btVector3(moveX, moveY, moveZ)
    resultantImpulse.op_mul(scalingFactor);


    let physicsBody = ballObject.userData.physicsBody;
    physicsBody.setLinearVelocity(resultantImpulse);
}


function updatePhysics( deltaTime ){

    // Step world
    physicsWorld.stepSimulation( deltaTime, 10 );

    // Update rigid bodies
    for ( let i = 0; i < rigidBodies.length; i++ ) {
        let objThree = rigidBodies[ i ];
        let objAmmo = objThree.userData.physicsBody;
        let ms = objAmmo.getMotionState();
        if ( ms ) {

            ms.getWorldTransform( tmpTrans );
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            objThree.position.set( p.x(), p.y(), p.z() );
            objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

        }
    }

}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}