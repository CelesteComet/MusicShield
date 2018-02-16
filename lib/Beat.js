import * as THREE from 'three';
import { scene } from './globals';
import { 
  getDirectionBetweenTwoVectors,
  getRandomNumberBetween
} from './utils';

import shield from './Shield';
import Particle from './Particle';


class Beat {
  constructor() {
    var geometry = new THREE.SphereGeometry( 0.4, 16, 16);
    var colorIndex = getRandomNumberBetween(0,1);
    var material;
    if (colorIndex === 1) {
      material = new THREE.MeshBasicMaterial( {color: "rgb(100%, 0%, 0%)"} );
    } else {
      material = new THREE.MeshBasicMaterial( {color: "rgb(0%, 0%, 100%)"} );
    }
    var sphere = new THREE.Mesh( geometry, material );
    scene.add(sphere);
    this.willRemove = false;
    this.mesh = sphere;
    this.speed = 0.03;
    let xPos = getRandomNumberBetween(-10, 10);
    this.startingPosition = new THREE.Vector3(xPos, 80, -300);
    const {x, y, z} = this.startingPosition;
    let randomX = getRandomNumberBetween(-1,1);
    let randomY = getRandomNumberBetween(-2,0);
    this.mesh.position.set(x, y, z);
    this.velocity = getDirectionBetweenTwoVectors(this.startingPosition, new THREE.Vector3(randomX,randomY,0));

    // lets add some collisions, origin, direction, near, far
    this.ray = new THREE.Raycaster( this.mesh.position, this.velocity, 0, 1 );
    return this;
  }

  update(dt) {
    // if (this.ray.intersectObjects( scene.children ).length > 0) {
    //   this.willRemove = true;
    // };
    var vector = new THREE.Vector3();
    vector.setFromMatrixPosition( shield.mesh.matrixWorld );

    if (this.mesh.position.distanceTo(vector) < 1) {
      this.willRemove = true;
    }

    const { velocity, speed, mesh } = this;
    mesh.translateOnAxis(velocity.clone().multiplyScalar(dt), speed);

    // check for collisions on ground
    if(mesh.position.y < -5) { this.willRemove = true }

  }
}

export default Beat;