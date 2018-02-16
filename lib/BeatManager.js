import * as THREE from 'three';
import Manager from './Manager';
import Beat from './Beat';
import { scene } from './globals';

class BeatManager extends Manager {
  constructor() {
    super();
  }

  createBeat() {
    let beat = new Beat;
    this.list[beat.mesh.uuid] = beat;
    return beat;
  }

  update(controllerMesh) {
    for (let id in this.list) {
      if (this.list[id].willRemove) {
        scene.remove(this.list[id].mesh);
        delete this.list[id];
      } else {
        this.list[id].update(controllerMesh);
      }
    }
  }

};

const mBeatManager = new BeatManager;

export default mBeatManager;