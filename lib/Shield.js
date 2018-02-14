import * as THREE from 'three';

import { scene } from './globals';


class Shield {
  constructor() {
    // geometry and material of the shield 
    var geometry = new THREE.BoxGeometry( 1, 1, 1);
    var material = new THREE.MeshBasicMaterial( {color: "rgb(128,128,128)"} );

    // mesh creation
    var shield = new THREE.Mesh(geometry, material);
    this.mesh = shield;
    // set initial position of the shield, 1.8 is the height of the camBox
    this.mesh.position.set(0, 1.8, -5);


    scene.add(this.mesh);
  }

  update() {
     
  }
}

export default Shield;