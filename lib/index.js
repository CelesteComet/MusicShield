import * as THREE from 'three';
import OrbitControls from './controls';
import skybox from './skybox';
import BeatManager from './BeatManager';
import { scene } from './globals';
import gearVR from './gearVR';
import WEBVR from './webVR';

// Game Objects
import Shield from './Shield';

// loaders
import MTLLoader from './loaders/MTLLoader';
import OBJLoader from './loaders/OBJLoader';


var camera, renderer, controls, controller, camBox;
var controllerCube;
window.onload = function() {

// Set up the scene, camera, and renderer as global variables.


init();
animate();

}

  // Sets up the scene.
  function init() {
     // Create the scene and set the scene size.
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    // Code from previous steps goes here...
 
    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.vr.enabled = true;
    renderer.setSize(WIDTH, HEIGHT);

    document.body.appendChild(renderer.domElement);
    document.body.appendChild( WEBVR.createButton( renderer ) );
 
    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(15,15,15);
    // scene.add(camera);

    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    var geometry = new THREE.BoxGeometry( 1, 1, 1);
    var material = new THREE.MeshBasicMaterial( {color: "rgb(128,128,128)"} );


    scene.add( skybox );
    camBox = new THREE.Object3D();
    camBox.position.y = 1.8;
    camBox.add( camera );
    scene.add( camBox );

    // Create a shield
    var shield = new Shield;

    // Create VR controller
    controller = new THREE.GearVRController();
    console.log(controller);
    controller.rotation.onChangeCallback = (e) => {
      shield.mesh.position.x += 0.111; 
    };
    controller.setHand( 'right' );
    scene.add(controller);

    var MTL = new THREE.MTLLoader();
    MTL.setPath( 'assets/models/gear_vr_controller/' );
    MTL.load( 'gear_vr_controller.mtl', function ( materials ) {
      materials.preload();
      var OBJ = new THREE.OBJLoader();
      OBJ.setMaterials( materials );
      OBJ.setPath( 'assets/models/gear_vr_controller/' );
      OBJ.load( 'gear_vr_controller.obj', function ( obj ) {
        // obj.translateZ( 0 );
        controller.add( obj );
        // x is red, y is green, z is blue?
        controller.position.set(0.4, 1.3, -1);
      } );
    } );



 
    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
 
  }
  BeatManager.createBeat();
  // Renders the scene and updates the render as needed.
  var tick = 0;

  function animate() {
    tick += 1;
    if( tick > 100) {
      BeatManager.createBeat();
      tick = 0;
    }
    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);
 
    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
    camBox.rotation.y = 3.14159 * 2;
    controller.update();
    BeatManager.update();
    // let newX = controller.rotation.x += 1;
    // controller.rotation.set(newX)

 
  }

window.addEventListener('resize', function() {
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
});