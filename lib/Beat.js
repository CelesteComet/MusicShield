import * as THREE from 'three';
import { scene } from './globals';
import { 
  getDirectionBetweenTwoVectors,
  getRandomNumberBetween
} from './utils';

class Beat {
  constructor() {
    var geometry = new THREE.SphereGeometry( 0.4, 16, 16);
    var material = new THREE.MeshBasicMaterial( {color: "rgb(100%, 0%, 0%)"} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add(sphere);
    this.willRemove = false;
    this.mesh = sphere;
    this.speed = 0.4;
    let xPos = getRandomNumberBetween(-10, 10);
    this.startingPosition = new THREE.Vector3(xPos, 30, -100);
    const {x, y, z} = this.startingPosition;
    this.mesh.position.set(x, y, z);
    this.velocity = getDirectionBetweenTwoVectors(this.startingPosition, new THREE.Vector3(0,0,0));

    // lets add some collisions, origin, direction, near, far
    this.ray = new THREE.Raycaster( this.mesh.position, this.velocity, 0, 1 );
    return this;
  }

  update() {
    if (this.ray.intersectObjects( scene.children ).length > 0) {
      if (this.ray.intersectObjects( scene.children )[0].object.name == 'shield') {
        this.willRemove = true;
      };
    };
    const { velocity, speed, mesh } = this;
    mesh.translateOnAxis(velocity, speed);

    // check for collisions on ground
    if(mesh.position.y < 0) { this.willRemove = true }

  }
}

export default Beat;