import * as THREE from 'three';
import options from './opts';
import { scene } from './globals';

const wireframe = options.wireframe;

class Floor {
  constructor() {

    // var light = new THREE.PointLight( 0xA33423, 10, 40 );
    // light.position.set( -(6), 0, 0 );
    // scene.add( light );
    let height = 35;
    let geometry = new THREE.BoxGeometry(8, height, 1);
    // let geometry = new THREE.PlaneGeometry(100, 100);
    let material = new THREE.MeshPhongMaterial( {color: "rgb(128,128,128)", wireframe: wireframe} );
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.y += -0.5;
    mesh.position.z -= 13;

    // mesh.set(new THREE.Vector3(0,1,0), 1);
    mesh.rotation.x = -Math.PI / 2;
    return mesh;
  }
}

class ForwardStage {
  constructor() {
    let height = 2;
    let geometry = new THREE.BoxGeometry( 10, height, 10);
    let material = new THREE.MeshPhongMaterial( {color: "rgb(18,0,128)", wireframe: wireframe} );
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,0,-35);
    mesh.position.y += (height/2);
    return mesh;
  }
}

class LeftSideStage {
  constructor() {
    var zPos = -10;
    var light = new THREE.PointLight( 0xA33423, 10, 40 );
    light.position.set( -(6), 0, 0 );
    scene.add( light );

    var light = new THREE.PointLight( 0x0B2EF0, 10, 40 );
    light.position.set( 6, 0, 0 );
    scene.add( light );

    let LeftSideStage = new THREE.Object3D;
    let height = 1;
    let geometry = new THREE.BoxGeometry( 1, height, 14);
    let material = new THREE.MeshPhongMaterial( {color: "rgb(18,0,18)", wireframe: wireframe} );
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
    LeftSideStage.position.z -= 28;

    scene.add(LeftSideStage);
    return LeftSideStage;
  }
}

class RightSideStage {
  constructor() {
    let RightSideStage = new THREE.Object3D;
    let height = 1;
    let geometry = new THREE.BoxGeometry( 1, height, 14);
    let material = new THREE.MeshPhongMaterial( {color: "rgb(18,0,18)", wireframe: wireframe} );
    let mesh = new THREE.Mesh(geometry, material);
    let mesh2 = mesh.clone();
    let mesh3 = mesh.clone();
    RightSideStage.add(mesh);
    RightSideStage.add(mesh2);
    RightSideStage.add(mesh3);
    mesh.position.set(4.5, height/2, -6);
    mesh2.position.set(6, height/2, -6);
    mesh3.position.set(6, height/2 + 1.5, -6);
    RightSideStage.scale.z -= 3;
    RightSideStage.position.z -= 28;

    scene.add(RightSideStage);
    return RightSideStage;
  }
}





export { 
  Floor,
  ForwardStage,
  LeftSideStage,
  RightSideStage
}
