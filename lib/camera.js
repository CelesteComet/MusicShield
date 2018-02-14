import * as THREE from 'three';

/* Camera stuff */
// fov — Camera frustum vertical field of view.
// aspect — Camera frustum aspect ratio.
// near — Camera frustum near plane.
// far — Camera frustum far plane.

const initialCameraPosition = new THREE.Vector3(15, 15, 15);

const camera = new THREE.PerspectiveCamera
(
  45, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  20000
);


camera.position.set(...initialCameraPosition);
export default camera;
