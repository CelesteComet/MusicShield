import * as THREE from 'three';

var material = new THREE.MeshBasicMaterial( {color: "rgb(128,128,128)"} );

export const basicMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff
});

export const basicPhongMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff
});

export const orangeShieldMaterial = new THREE.MeshLambertMaterial({
  transparent: true,
  opacity: 0.6,
  emmisive: 0xEC4C29,
  color: 0xEC4C29
})

export const blueShieldMaterial = new THREE.MeshLambertMaterial({
  transparent: true,
  opacity: 0.6,
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

export const normalOrangeMaterial = new THREE.MeshPhongMaterial({
  color: 0xEC4C29
});

export const normalBlueMaterial = new THREE.MeshPhongMaterial({
  color: 0x4B84EC
});