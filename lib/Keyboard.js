class Keyboard {
  constructor() {
    console.log("Keyboard initialized");
    this.keys = {
      'up':    false,
      'down':  false,
      'left':  false,
      'right': false,
      'fire':  false
    };
  }

  init() {
    document.addEventListener('keydown', e => {
      let code = e.keyCode;
      if (code == 87) { this.keys['up']     = true }  
      if (code == 68) { this.keys['right']  = true }
      if (code == 65) { this.keys['left']   = true }  
      if (code == 83) { this.keys['down']   = true } 
      if (code == 32) { this.keys['fire']  = true }      

    })

    document.addEventListener('keyup', e => {
      let code = e.keyCode;

      if (code == 87) { this.keys['up']     = false }  
      if (code == 68) { this.keys['right']  = false }
      if (code == 65) { this.keys['left']   = false }  
      if (code == 83) { this.keys['down']   = false }   
      if (code == 32) { this.keys['fire']  = false }      

    })
  }
}

let keyboard = new Keyboard;
keyboard.init();

export default keyboard;