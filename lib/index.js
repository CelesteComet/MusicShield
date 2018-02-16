import * as THREE from 'three';
import OrbitControls from './controls';
import skybox from './skybox';
import shield from './Shield';
import BeatManager from './BeatManager';
import { scene } from './globals';
import WEBVR from './webVR';
import VRController from './gearVr'; 
// utils 

// options
import options from './opts';

// Game Objects
import camera from './camera';
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





var renderer, controls, controller, camBox, arrowHelper, controllerMesh;
var controllerCube;




window.addEventListener( 'vr controller connected', function( event ) {


  controller = event.detail

  scene.add( controller );
  var meshColorOff = 0xDB3236;//  Red.
  var meshColorOn  = 0xF4C20D;//  Yellow.

  var controllerMaterial = new THREE.MeshStandardMaterial({
    color: meshColorOff
  });

  controllerMesh = new THREE.Mesh(
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
  shield.mesh.position.set(0,0,-5);
  controller.add( shield.mesh );

  // castShadows( controller );
  // receiveShadows( controller );


  var dir = controllerMesh.up;

  //normalize the direction vector (convert to vector of length 1)
  dir.normalize();

  var origin = controllerMesh.position;
  var length = 2;
  var hex = 0xffff00;

  arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
  var raycaster = new THREE.Raycaster( origin, dir);

  controllerMesh.add( arrowHelper );


  controller.addEventListener( 'primary press began', function( event ){
    event.target.userData.mesh.material.color.setHex( meshColorOn )
  })
  controller.addEventListener( 'primary press ended', function( event ){
    event.target.userData.mesh.material.color.setHex( meshColorOff )
  })
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
    // audioElement.play();

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
    // env.add(new Floor);
    // env.add(new ForwardStage);
    // env.add(new LeftSideStage);
    // env.add(new RightSideStage);
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
    if( tick > 1000000) {
      BeatManager.createBeat();
      tick = 0;
    }
    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    // Render the scene.
    renderer.render(scene, camera);
    // camBox.rotation.y = 3.14159 * 2;
    // gearVR.update();
    

    // **** TEST DELETE AFTER *****///
    // controllerMesh.rotation.z += 0.1;
      
    
    // update game entities
    // if (shield !== undefined) {
    //   shield.update();
    // };


    // if (shield !== undefined && controllerMesh !== undefined) {
      
    //   shield.mesh.position.set(controllerMesh.position.x, controllerMesh.position.y, controllerMesh.position.z - 5);
    // }
    if(controllerMesh) {
      BeatManager.update(controllerMesh);
    }
    VRController.update();
    requestAnimationFrame(animate);


 
  }

window.addEventListener('resize', function() {
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
});

