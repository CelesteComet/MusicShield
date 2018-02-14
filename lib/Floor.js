import * as THREE from 'three';
import options from './opts';
import { scene } from './globals';

const wireframe = options.wireframe;

class Floor {
  constructor() {
    let geometry = new THREE.PlaneGeometry(100, 100);
    let material = new THREE.MeshBasicMaterial( {color: "rgb(128,0,128)", wireframe: wireframe} );
    let mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    return mesh;
  }
}

class ForwardStage {
  constructor() {
    let height = 2;
    let geometry = new THREE.BoxGeometry( 10, height, 10);
    let material = new THREE.MeshBasicMaterial( {color: "rgb(18,0,128)", wireframe: wireframe} );
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,0,-24);
    mesh.position.y += (height/2);
    return mesh;
  }
}

class LeftSideStage {
  constructor() {

    let LeftSideStage = new THREE.Object3D;
    let height = 1;
    let geometry = new THREE.BoxGeometry( 1, height, 14);
    let material = new THREE.MeshBasicMaterial( {color: "rgb(18,0,18)", wireframe: wireframe} );
    let mesh = new THREE.Mesh(geometry, material);
    let mesh2 = mesh.clone();
    let mesh3 = mesh.clone();
    LeftSideStage.add(mesh);
    LeftSideStage.add(mesh2);
    LeftSideStage.add(mesh3);
    mesh.position.set(-4.5, height/2, -6);
    mesh2.position.set(-6, height/2, -6);
    mesh3.position.set(-6, height/2 + 1.5, -6);
    LeftSideStage.scale.z -= 3;
    LeftSideStage.position.z -= 11;

    scene.add(LeftSideStage);
    return LeftSideStage;
  }
}

class RightSideStage {
  constructor() {
    let stage = new LeftSideStage;
    console.log(stage)
    stage.position.x += 6.5;
    stage.rotation.z = Math.PI / 2;
    stage.position.y += 6.5;
    scene.add(stage);
  }
}





export { 
  Floor,
  ForwardStage,
  LeftSideStage,
  RightSideStage
}
