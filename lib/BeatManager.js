import * as THREE from 'three';
import Manager from './Manager';
import Beat from './Beat';
import { scene } from './globals';

class BeatManager extends Manager {
  constructor() {
    super();
    this.lastCreated = 0;
    this.rate = 650;
    this.start = false;
  }

  createBeat() {
    let beat = new Beat;
    this.list[beat.mesh.uuid] = beat;
    return beat;
  }

  update(dt) {

    this.lastCreated += dt;
    if (this.lastCreated > this.rate) {
      this.createBeat();
      this.lastCreated = 0;
    }

    for (let id in this.list) {
      if (this.list[id].willRemove) {
        scene.remove(this.list[id].mesh);
        delete this.list[id];
      } else {
        this.list[id].update(dt);
      }
    }
  }

};

const mBeatManager = new BeatManager;

export default mBeatManager;