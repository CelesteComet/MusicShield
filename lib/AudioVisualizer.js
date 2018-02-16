import * as THREE from 'three';

class AudioVisualizer {
  constructor(coordinates) {
    this.position = coordinates;
  }

  onaudioprocess(e) {
    console.log(e)
  }


}

export default AudioVisualizer;