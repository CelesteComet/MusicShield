import * as THREE from 'three';
import opts from './opts';
import { scene } from './globals';

/* Camera stuff */
// fov — Camera frustum vertical field of view.
// aspect — Camera frustum aspect ratio.
// near — Camera frustum near plane.
// far — Camera frustum far plane.


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);


var camBox = new THREE.Object3D();
if (!opts.vr) {
  camBox.position.z = -40;
}
camBox.add( camera );
camBox.position.set(0,0,0);
camBox.lookAt(0,0,0);
scene.add( camBox );

export default camera;
