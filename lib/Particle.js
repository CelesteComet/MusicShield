import * as THREE from 'three';
import { scene } from './globals';
import { basicMaterial, orangeLaserMaterial } from './materials';
import { getRandomNumberBetween } from './utils';

class Particle {
  constructor(_x,_y,_z, position) {
    this.velocity = new THREE.Vector3(_x, _y, 0).normalize().multiplyScalar(200);
    var radius = 0.05;
    var geometry = new THREE.CircleGeometry( radius, 32 );
    this.mesh = new THREE.Mesh( geometry, orangeLaserMaterial );
    const {x, y, z} = position;
    this.mesh.position.set(x, y, z);
    this.gravity = new THREE.Vector3(0, -10, 0)
    this.speed = 0.001;
  }

  update() {
    const {velocity, speed} = this;
    this.velocity = this.velocity.add(this.gravity);
    this.mesh.translateOnAxis(this.velocity, speed);
    scene.add(this.mesh);
    if(this.mesh.position.y < -5) {
      scene.remove(this.mesh);
    }
  }
}

class ParticlesInstance {
  constructor(size, pos) {
    this.array = [];
    for (let i = 0; i < size; i++) {
      let x = getRandomNumberBetween(-10,10);
      let y = getRandomNumberBetween(-10,10);
      let z = getRandomNumberBetween(-10,10);
      this.array.push(new Particle(x, y, x, pos))
    }
  }

  update() {
    this.array.forEach(particle => {
      particle.update();
    })
  }
}


export {ParticlesInstance, Particle};