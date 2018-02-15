import * as THREE from 'three';
import { scene } from './globals';

class Controller {
  constructor() {
    console.log("creating new instance of controller");
    this.ready = false;
    this.mesh = new THREE.Object3D;

    this.colors = {
      red: 0xDB3236,
      yellow: 0xF4C20D
    };

    this.setConnectedHandler = this.setConnectedHandler.bind(this);
    this.createControllerMesh = this.createControllerMesh.bind(this);
    this.attachRayCaster = this.attachRayCaster.bind(this);
  }

  setConnectedHandler() {
    var self = this;
    window.addEventListener('vr controller connected', event => {
      self.ready = true;
      var controller = event.detail
      // currently there is no mesh, need to create a 
      // controller model for it though createControllerMesh
      self.mesh = controller;
    })
  }

  createControllerMesh() {

    // Create the material for the controller
    var controllerMaterial = new THREE.MeshStandardMaterial({
      color: this.colors.red
    });

    // Create the head mesh of the controller
    this.controllerMesh = new THREE.Mesh(
      new THREE.CylinderGeometry( 0.005, 0.05, 0.1, 6 ),
      controllerMaterial
    );

    // Save the direction of the controller head for use later on
    this.direction = this.controllerMesh.up.normalize();
    this.headOrigin = this.controllerMesh.position;
    var length = 5;
    var hex = 0xffff00;


    // Create an arrow helper to show which way the controller head is facing
    this.arrowHelper = new THREE.ArrowHelper(
      this.direction, 
      this.headOrigin, 
      length, 
      hex 
    );

    // Create a rayCaster to grab objects
    this.rayCaster = new THREE.Raycaster(this.headOrigin, this.direction);

    this.controllerMesh.add( this.arrowHelper );


    // Create the handle mesh of the controller
    var handleMesh = new THREE.Mesh(
      new THREE.BoxGeometry( 0.03, 0.1, 0.03 ),
      controllerMaterial
    );

    // Create the controller handle relative to the controller head
    controllerMaterial.flatShading = true;
    this.controllerMesh.rotation.x = -Math.PI / 2;
    handleMesh.position.y = -0.05;
    this.controllerMesh.add( handleMesh );

    // Add the entire controller model to the main class mesh
    this.mesh.userData.mesh = this.controllerMesh; // So we can change the color later.
    this.mesh.add( this.controllerMesh );
  }

  attachRayCaster() {
    var dir = this.controllerMesh.up;

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    var origin = this.controllerMesh.position;
    var length = 5;
    var hex = 0xffff00;

    this.arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    // Raycaster( origin, direction, near, far )
    var raycaster = new THREE.Raycaster( origin, dir);
    this.controllerMesh.add( this.arrowHelper );
    scene.add(this.controllerMesh);
    console.log(this.controllerMesh);
  }
}

export default Controller;

// window.addEventListener( 'vr controller connected', function( event ) {


//   //Create a shield
//   shield = new Shield;
//   scene.add(shield);
// //  Here it is, your VR controller instance.
//   //  It’s really a THREE.Object3D so you can just add it to your scene:

//   var controller = event.detail
//   scene.add( controller )


//   //  HEY HEY HEY! This is important. You need to make sure you do this.
//   //  For standing experiences (not seated) we need to set the standingMatrix
//   //  otherwise you’ll wonder why your controller appears on the floor
//   //  instead of in your hands! And for seated experiences this will have no
//   //  effect, so safe to do either way:

//   // controller.standingMatrix = renderer.vr.getStandingMatrix()


//   //  And for 3DOF (seated) controllers you need to set the controller.head
//   //  to reference your camera. That way we can make an educated guess where
//   //  your hand ought to appear based on the camera’s rotation.

//   // controller.head = window.camera



//   // controller = event.detail;
//   scene.add( controller );
//   var meshColorOff = 0xDB3236;//  Red.
//   var meshColorOn  = 0xF4C20D;//  Yellow.

//   var controllerMaterial = new THREE.MeshStandardMaterial({
//     color: meshColorOff
//   });

//   var controllerMesh = new THREE.Mesh(
//     new THREE.CylinderGeometry( 0.005, 0.05, 0.1, 6 ),
//     controllerMaterial
//   );



//   var handleMesh = new THREE.Mesh(
//     new THREE.BoxGeometry( 0.03, 0.1, 0.03 ),
//     controllerMaterial
//   );

//   controllerMaterial.flatShading = true;
//   controllerMesh.rotation.x = -Math.PI / 2;
//   handleMesh.position.y = -0.05;
//   controllerMesh.add( handleMesh );
//   controller.userData.mesh = controllerMesh; //  So we can change the color later.
//   controller.add( controllerMesh );
//   // castShadows( controller );
//   // receiveShadows( controller );


//   var dir = controllerMesh.up;

//   //normalize the direction vector (convert to vector of length 1)
//   dir.normalize();

//   var origin = controllerMesh.position;
//   var length = 5;
//   var hex = 0xffff00;

//   arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
//   // Raycaster( origin, direction, near, far )
//   var raycaster = new THREE.Raycaster( origin, dir);
//   controllerMesh.add( arrowHelper );




//   // //  Allow this controller to interact with DAT GUI.
//   // var guiInputHelper = dat.addInputObject( controller )
//   // scene.add( guiInputHelper )

//   controller.addEventListener( 'primary press began', function( event ){
//     event.target.userData.mesh.material.color.setHex( meshColorOn )
//     guiInputHelper.pressed( true )
//   })
//   controller.addEventListener( 'primary press ended', function( event ){
//     event.target.userData.mesh.material.color.setHex( meshColorOff )
//     guiInputHelper.pressed( false )
//   })
//   //  Daddy, what happens when we die?
//   controller.addEventListener( 'disconnected', function( event ){
//     controller.parent.remove( controller )
//   })
// });