class Manager {
  constructor() {
    this.list = {};
  }

  update() {
    for (let id in this.list) {
      this.list[id].update();
    }
  }


}

export default Manager;

