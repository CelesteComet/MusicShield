import { scene } from './globals';

class Manager {
  constructor() {
    this.list = {};
  }

  update() {
    for (let id in this.list) {
      if (this.list[id].willRemove === true) { scene.remove(this.list[id].mesh) }
      this.list[id].update();
    }
  }


}

export default Manager;

