  import * as THREE from 'three';

  var root_url = './assets/skybox';
  var materialArray = [];
  var textureLoader = new THREE.TextureLoader();
  materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(`${root_url}_px.jpg`) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(`${root_url}_py.jpg`) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(`${root_url}_py.jpg`) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(`${root_url}_py.jpg`) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(`${root_url}_py.jpg`) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(`${root_url}_py.jpg`) }));
  for (var i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
  var skyboxGeom = new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 );
  var skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );

  export default skybox;