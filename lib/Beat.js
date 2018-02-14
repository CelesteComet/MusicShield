import * as THREE from 'three';
import { scene } from './globals';
import { 
  getDirectionBetweenTwoVectors,
  
} from './utils';

class Beat {
  constructor() {
    var geometry = new THREE.SphereGeometry( 0.4, 16, 16);
    var material = new THREE.MeshBasicMaterial( {color: "rgb(100%, 0%, 0%)"} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add(sphere);
    this.mesh = sphere;
    this.speed = 0.7;
    this.startingPosition = new THREE.Vector3(0, 15, -100);
    const {x, y, z} = this.startingPosition;
    this.mesh.position.set(x, y, z);
    this.velocity = getDirectionBetweenTwoVectors(this.startingPosition, new THREE.Vector3(0,0,0));
    return this;
  }

  update() {
    const { velocity, speed, mesh } = this;
    mesh.translateOnAxis(velocity, speed);
  }
}

export default Beat;