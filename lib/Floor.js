import * as THREE from 'three';
import options from './opts';
import { scene } from './globals';
import { basicPhongMaterial, basicMaterial } from './materials';

const wireframe = options.wireframe;

class Floor {
  constructor() {

    // var light = new THREE.PointLight( 0xA33423, 10, 40 );
    // light.position.set( -(6), 0, 0 );
    // scene.add( light );
    let height = 35;
    let geometry = new THREE.BoxGeometry(12, height, 1);
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
    let height = 4;
    let geometry = new THREE.BoxGeometry( 20, height, 10);
    let material = new THREE.MeshPhongMaterial( {color: "rgb(128,128,128)", wireframe: wireframe} );
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,0,-35);
    mesh.position.y = -3;
    return mesh;
  }
}

class LeftSideStage {
  constructor() {
    var zPos = -15;
    var intensity = 20;
    var light = new THREE.PointLight( 0x0B2EF0, intensity, 10 );
    light.position.set( -(5), 0.1, 0 );
    scene.add( light );

    var light = new THREE.PointLight( 0xA23526, intensity, 10 );
    light.position.set( 5, 0.1, 0 );
    scene.add( light );

    var light = new THREE.PointLight( 0x0B2EF0, intensity, 10 );
    light.position.set( -(5), 0.1, -18 );
    scene.add( light );

    var light = new THREE.PointLight( 0xA23526, intensity, 10 );
    light.position.set( 5, 0.1, -18 );
    scene.add( light );

    let LeftSideStage = new THREE.Object3D;
    let height = 1;
    let geometry = new THREE.BoxGeometry( 1, height, 20);
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
    let geometry = new THREE.BoxGeometry( 1, height, 20);
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

class Everything {
  constructor() {
    console.log("EVERYTHING ADDED")
    var everything = new THREE.Object3D();
    let geometry = new THREE.BoxGeometry( 1, 4, 34);
    let leftstair1 = new THREE.Mesh(geometry, basicPhongMaterial);
    let leftstair2 = new THREE.Mesh(geometry, basicPhongMaterial);
    let leftstair3 = new THREE.Mesh(geometry, basicPhongMaterial);

    everything.position.set(-7, 0, -12.5);
    leftstair1.position.x -= 1;
    leftstair1.position.y = 0;
    leftstair2.position.x -= 3;
    leftstair2.position.y = 0.5;
    leftstair3.position.x -= 5;
    leftstair3.position.y = 1;


    everything.add(leftstair1);
    everything.add(leftstair2);
    everything.add(leftstair3);
    let another_set = everything.clone();
    another_set.position.x = -6;
    another_set.position.y = 1.5;
    another_set.position.z += 12.5;
    everything.add(another_set);
    let theOtherSide = everything.clone();
    theOtherSide.position.x = 7;
    theOtherSide.rotation.y = Math.PI;

    theOtherSide.position.y -= 3;
    everything.position.y -= 3;
    scene.add(theOtherSide);
    scene.add(everything);
  }
}

var meh = 33;
var geometry = new THREE.CylinderGeometry(meh, meh, 5, 19, 1, true, null, 2*Math.PI );
var material = new THREE.MeshPhongMaterial({
  color: "rgb(128, 128, 128)"
});
var cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder )

cylinder.material.side = THREE.BackSide;
cylinder.rotation.y = 24;
cylinder.position.z -= 17;

var mLeftSideStage = new LeftSideStage;
var mRightSideStage = new RightSideStage;
mLeftSideStage.position.y -= 4;
mRightSideStage.position.y -= 4;
scene.add(mLeftSideStage);
scene.add(mRightSideStage);
var mFloor = new Floor;
mFloor.position.y -= 4;
scene.add(mFloor)
new Everything();
var mForward = new ForwardStage;
scene.add(mForward);

export { 
  Floor,
  ForwardStage,
  LeftSideStage,
  RightSideStage
}
