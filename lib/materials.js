import * as THREE from 'three';

var material = new THREE.MeshBasicMaterial( {color: "rgb(128,128,128)"} );

export const basicMaterial = new THREE.MeshBasicMaterial({
  color: "rgb(128, 128, 128)"
});

export const orangeShieldMaterial = new THREE.MeshLambertMaterial({
  transparent: true,
  opacity: 0.9,
  emmisive: 0xEC4C29,
  color: 0xEC4C29
})

export const orangeLaserMaterial =  new THREE.MeshBasicMaterial({
  blending  : THREE.AdditiveBlending,
  color   : 0xEC4C29,
  side    : THREE.DoubleSide,
  depthWrite  : false,
  transparent : true,
  emmisive: 0xEC4C29
})