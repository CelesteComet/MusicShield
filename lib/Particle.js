import * as THREE from 'three';
import { scene } from './globals';
import { basicMaterial } from './materials';

class Particle {
  constructor() {
    this.velocity = new THREE.Vector3(0,200,0);
    var radius = 0.1;
    var geometry = new THREE.CircleGeometry( radius, 32 );
    this.mesh = new THREE.Mesh( geometry, basicMaterial );
    this.gravity = new THREE.Vector3(0, -10, 0)
    this.speed = 0.001;
    scene.add(this.mesh);
  }

  update() {
    const {velocity, speed} = this;
    this.velocity = this.velocity.add(this.gravity);
    this.mesh.translateOnAxis(this.velocity, speed);
    if(this.mesh.position.y < -5) {
      scene.remove(this.mesh);
    }
  }
}

class ParticlesInstance {
  constructor(size) {
    this.array = [];
    for (let i = 0; i < size; i++) {
      this.array.push(new Particle)
    }
  }

  update() {
    this.array.forEach(particle => {
      particle.update();
    })
  }
}



export {ParticlesInstance, Particle};