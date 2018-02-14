import * as THREE from 'three';
import { scene } from './globals';

class Beat {
  constructor() {
    var geometry = new THREE.SphereGeometry( 0.4, 16, 16);
    var material = new THREE.MeshBasicMaterial( {color: "rgb(100%, 0%, 0%)"} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add(sphere);
    this.mesh = sphere;
    this.mesh.position.set(0,0,0);
    return this;
  }

  update() {
    this.mesh.translateOnAxis(new THREE.Vector3( 1, 1, 1 ), 0.1);
  }
}

export default Beat;