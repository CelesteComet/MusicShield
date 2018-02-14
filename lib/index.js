import * as THREE from 'three';
import OrbitControls from './controls';
import skybox from './skybox';
import BeatManager from './BeatManager';
import { scene } from './globals';
import gearVR from './gearVR';
import WEBVR from './webVR';

// Game Objects
import camera from './camera';
import Shield from './Shield';

// loaders
import MTLLoader from './loaders/MTLLoader';
import OBJLoader from './loaders/OBJLoader';


var renderer, controls, controller, camBox;
var controllerCube;
window.onload = function() {

// Set up the scene, camera, and renderer as global variables.
init();
animate();

}



  // Sets up the scene.
  function init() {

window.addEventListener( 'vr controller connected', function( event ) {
  controllerCube.position.x = 100.01;
  // controller = event.detail;
  // scene.add( controller );
  // var
  // meshColorOff = 0xDB3236,//  Red.
  // meshColorOn  = 0xF4C20D,//  Yellow.
  // controllerMaterial = new THREE.MeshStandardMaterial({
  //   color: meshColorOff
  // }),
  // controllerMesh = new THREE.Mesh(
  //   new THREE.CylinderGeometry( 0.005, 0.05, 0.1, 6 ),
  //   controllerMaterial
  // ),
  // handleMesh = new THREE.Mesh(
  //   new THREE.BoxGeometry( 0.03, 0.1, 0.03 ),
  //   controllerMaterial
  // )
  // controllerMaterial.flatShading = true
  // controllerMesh.rotation.x = -Math.PI / 2
  // handleMesh.position.y = -0.05
  // controllerMesh.add( handleMesh )
  // controller.userData.mesh = controllerMesh//  So we can change the color later.
  // controller.add( controllerMesh )
  // castShadows( controller )
  // receiveShadows( controller )
});
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
    gearVR.update();
    if (controller !== undefined) {
      controller.update();
      camBox.rotation.y += 1;
    }
    BeatManager.update();


 
  }

window.addEventListener('resize', function() {
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
});

