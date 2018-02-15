import * as THREE from 'three';
import OrbitControls from './controls';
import skybox from './skybox';
import BeatManager from './BeatManager';
import { scene } from './globals';
import WEBVR from './webVR';
import VRController from './gearVr'; 
import Controller from './Controller';
import * as dat from './datGUI';
// utils 

console.log(dat);
// options
import options from './opts';

// Game Objects
import camera from './camera';
import Shield from './Shield';
import {
  Floor, 
  ForwardStage,
  LeftSideStage,
  RightSideStage
} from './Floor';

// loaders
import MTLLoader from './loaders/MTLLoader';
import OBJLoader from './loaders/OBJLoader';

// experiments

// create the particle variables
var particleCount = 10,
    particles = new THREE.Geometry();
// create the particle variables

var pMaterial = new THREE.ParticleBasicMaterial({
  color: 0xFFFFFF,
  size: 1,
  map: THREE.ImageUtils.loadTexture(
    "assets/particle.png"
  ),
  blending: THREE.AdditiveBlending,
  transparent: true
});

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = 1,
      pY = 1,
      pZ = 1,
      particle = new THREE.Vector3(pX, pY, pZ);

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.Points(
    particles,
    pMaterial);

// add it to the scene
scene.add(particleSystem);


var renderer, controls, controller, camBox, shield, arrowHelper, controllerMesh;
var controllerCube;

// do not delete above

//   shield = new Shield;
//   scene.add(shield);

//   var meshColorOff = 0xDB3236;//  Red.
//   var meshColorOn  = 0xF4C20D;//  Yellow.


//   var controllerMaterial = new THREE.MeshStandardMaterial({
//     color: meshColorOff
//   });

// var controllerMesh = new THREE.Mesh(
//   new THREE.CylinderGeometry( 0.005, 0.05, 0.1, 6 ),
//   controllerMaterial
// );

// var handleMesh = new THREE.Mesh(
//   new THREE.BoxGeometry( 0.03, 0.1, 0.03 ),
//   controllerMaterial
// );


// var dir = controllerMesh.up;

// //normalize the direction vector (convert to vector of length 1)
// dir.normalize();

// var origin = controllerMesh.position;
// var length = 5;
// var hex = 0xffff00;

// var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
// // Raycaster( origin, direction, near, far )
// var raycaster = new THREE.Raycaster( origin, dir);
// controllerMesh.add( arrowHelper );

  shield = new Shield;
  scene.add(shield);




window.addEventListener( 'vr controller connected', function( event ) {



  //Create a shield
  shield = new Shield;
  scene.add(shield);
//  Here it is, your VR controller instance.
  //  It’s really a THREE.Object3D so you can just add it to your scene:

  var controller = event.detail
  scene.add( controller )


  //  HEY HEY HEY! This is important. You need to make sure you do this.
  //  For standing experiences (not seated) we need to set the standingMatrix
  //  otherwise you’ll wonder why your controller appears on the floor
  //  instead of in your hands! And for seated experiences this will have no
  //  effect, so safe to do either way:

  // controller.standingMatrix = renderer.vr.getStandingMatrix()


  //  And for 3DOF (seated) controllers you need to set the controller.head
  //  to reference your camera. That way we can make an educated guess where
  //  your hand ought to appear based on the camera’s rotation.

  // controller.head = window.camera



  // controller = event.detail;
  scene.add( controller );
  var meshColorOff = 0xDB3236;//  Red.
  var meshColorOn  = 0xF4C20D;//  Yellow.

  var controllerMaterial = new THREE.MeshStandardMaterial({
    color: meshColorOff
  });

  var controllerMesh = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.005, 0.05, 0.1, 6 ),
    controllerMaterial
  );



  var handleMesh = new THREE.Mesh(
    new THREE.BoxGeometry( 0.03, 0.1, 0.03 ),
    controllerMaterial
  );

  controllerMaterial.flatShading = true;
  controllerMesh.rotation.x = -Math.PI / 2;
  handleMesh.position.y = -0.05;
  controllerMesh.add( handleMesh );
  controller.userData.mesh = controllerMesh; //  So we can change the color later.
  controller.add( controllerMesh );
  // castShadows( controller );
  // receiveShadows( controller );


  var dir = controllerMesh.up;

  //normalize the direction vector (convert to vector of length 1)
  dir.normalize();

  var origin = controllerMesh.position;
  var length = 5;
  var hex = 0xffff00;

  arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
  // Raycaster( origin, direction, near, far )
  var raycaster = new THREE.Raycaster( origin, dir);
  controllerMesh.add( arrowHelper );




  //  Allow this controller to interact with DAT GUI.
  var guiInputHelper = dat.addInputObject( controller )
  scene.add( guiInputHelper )

  controller.addEventListener( 'primary press began', function( event ){
    event.target.userData.mesh.material.color.setHex( meshColorOn )
    guiInputHelper.pressed( true )
  })
  controller.addEventListener( 'primary press ended', function( event ){
    event.target.userData.mesh.material.color.setHex( meshColorOff )
    guiInputHelper.pressed( false )
  })
  //  Daddy, what happens when we die?
  controller.addEventListener( 'disconnected', function( event ){
    controller.parent.remove( controller )
  })
});



window.onload = function() {

// Set up the scene, camera, and renderer as global variables.
init();
animate();

}



  // Sets up the scene.
  function init() {

    // AUDIO STUFF ******************************************************
    var audioElement = document.getElementById("myAudio");
    audioElement.play();

    // Particle Experiments ******************************************************


    //*********************************************************************************

     // Create the scene and set the scene size.
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    // Code from previous steps goes here...
 
    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.vr.enabled = options.vr;
    renderer.setSize(WIDTH, HEIGHT);

    document.body.appendChild(renderer.domElement);
    document.body.appendChild( WEBVR.createButton( renderer ) );
 
    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    var geometry = new THREE.BoxGeometry( 1, 1, 1);
    var material = new THREE.MeshBasicMaterial( {color: "rgb(128,128,128)"} );


    // var controller = new Controller;

    scene.add( skybox );
    camBox = new THREE.Object3D();
    camBox.position.y = 0;
    camBox.add( camera );
    scene.add( camBox );
    const env = new THREE.Object3D();
    env.add(new Floor);
    env.add(new ForwardStage);
    env.add(new LeftSideStage);
    env.add(new RightSideStage);
    env.position.y -= 2;
    scene.add(env);


    // // Create VR controller
    // controller = new gearVR();
    // console.log(controller);
    // controller.rotation.onChangeCallback = (e) => {
    //   shield.mesh.position.x += 0.111; 
    // };
    // controller.setHand( 'right' );
    // scene.add(controller);

    // var MTL = new THREE.MTLLoader();
    // MTL.setPath( 'assets/models/gear_vr_controller/' );
    // MTL.load( 'gear_vr_controller.mtl', function ( materials ) {
    //   materials.preload();
    //   var OBJ = new THREE.OBJLoader();
    //   OBJ.setMaterials( materials );
    //   OBJ.setPath( 'assets/models/gear_vr_controller/' );
    //   OBJ.load( 'gear_vr_controller.obj', function ( obj ) {
    //     // obj.translateZ( 0 );
    //     controller.add( obj );
    //     // x is red, y is green, z is blue?
    //     controller.position.set(0.4, 1.3, -1);
    //   } );
    // } );



 
    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

    controls = new OrbitControls( camera );
    // camera.position.set(0, 0, 0);
    // camera.position.z = 20;
    controls.update();

 
  }

  var beat = BeatManager.createBeat();
  // Renders the scene and updates the render as needed.
  var tick = 0;
  function animate() {
    tick += 1;
    if( tick > 100) {
      BeatManager.createBeat();
      tick = 0;
    }
    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    // Render the scene.
    renderer.render(scene, camera);
    // camBox.rotation.y = 3.14159 * 2;
    // gearVR.update();
    VRController.update();

    // **** TEST DELETE AFTER *****///
    // controllerMesh.rotation.z += 0.1;
    // if( arrowHelper !== undefined) {
    //   shield.mesh.position.x = controllerMesh.position.x;
    // }
      
      
    // update game entities
    if (shield !== undefined) {
      shield.update();
    };
    BeatManager.update();
    requestAnimationFrame(animate);

 
  }

window.addEventListener('resize', function() {
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
});

