import * as THREE from 'three';
import { scene } from './globals';
import Keyboard from './Keyboard'; 
import { orangeShieldMaterial, blueShieldMaterial } from './materials';


class Shield {
  constructor() {
    // geometry and material of the shield 
    var geometry = new THREE.BoxGeometry( 1, 1.2, 0.2);
    // var material = new THREE.MeshBasicMaterial( {color: "rgb(128,128,128)"} );

    // mesh creation
    var shield = new THREE.Mesh(geometry, orangeShieldMaterial);
    this.mesh = shield;
    this.mesh.name = 'shield';
    // set initial position of the shield, 1.8 is the height of the camBox
    this.mesh.position.set(0, 1.8, -5);
    this.speed = 0.005;

    scene.add(this.mesh);
    return this;
  }

  update(dt) {
    const { speed, mesh } = this;
    if (Keyboard.keys['left'])  { mesh.translateOnAxis(new THREE.Vector3(-1,0,0).multiplyScalar(dt), speed); }
    if (Keyboard.keys['right']) { mesh.translateOnAxis(new THREE.Vector3(1,0,0).multiplyScalar(dt), speed);  }
    if (Keyboard.keys['up'])    { mesh.translateOnAxis(new THREE.Vector3(0,1,0).multiplyScalar(dt), speed);  }
    if (Keyboard.keys['down'])  { mesh.translateOnAxis(new THREE.Vector3(0,-1,0).multiplyScalar(dt), speed); }
  }
}
const mShield = new Shield();
export default mShield;