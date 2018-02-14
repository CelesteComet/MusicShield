import * as THREE from 'three';
import Manager from './Manager';
import Beat from './Beat';

class BeatManager extends Manager {
  constructor() {
    super();
  }

  createBeat() {
    let beat = new Beat;
    this.list[beat.mesh.uuid] = beat;
    return beat;
  }

};

const mBeatManager = new BeatManager;

export default mBeatManager;