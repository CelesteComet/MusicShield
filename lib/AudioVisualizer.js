import * as THREE from 'three';
import { scene } from './globals';
import { BasicPhongMaterial, normalOrangeMaterial, normalBlueMaterial } from './materials';

class AudioVisualizer {
  constructor(coordinates, numberOfBins) {
    this.position = coordinates;
    // array to hold all bars
    this.bars = [];
    // cycle through and create 8 bar graphs
    let width  = 2,
        height = 0.5,
        depth  = 2;

    let bars = new THREE.Object3D;
    let geometry = new THREE.BoxGeometry( depth, height, width);
    for (let i = 0; i < numberOfBins; i++) {
      if (i <= 3) {
        this.bars[i] = new THREE.Mesh(geometry, normalBlueMaterial );
      } else {
        this.bars[i] = new THREE.Mesh(geometry, normalOrangeMaterial);
      }
      this.bars[i].position.x += (i * width * 1.2);
      bars.add(this.bars[i]);
    };

    // Give some light to the bars

    var light = new THREE.PointLight( 0xEC4C29, 5, 10 );
    light.position.set(4, 0, -27 );
    scene.add( light );

    var light = new THREE.PointLight( 0x4B84EC, 5, 10 );
    light.position.set(-4, 0, -27);
    scene.add( light );

    var spotLight = new THREE.SpotLight( 0xFFFFFF, 0.2 );
    spotLight.position.set( 0, 5, 40 );
    scene.add( spotLight);

    bars.position.set(-8.2,-0.5,-35)
    scene.add(bars);
  }

  update(data) {
    for (let i = 0; i < data.length; i++) {
      this.bars[i].scale.y = Math.abs(data[i]) * 0.05;
    }
  }


}

export default AudioVisualizer;