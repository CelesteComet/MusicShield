import * as THREE from 'three';
import { scene } from './globals';
import Manager from './Manager';





class ParticleManager extends Manager {
  constructor() {
    super();



  }

  createParticles(vector3) {
    let {x, y, z} = vector3;
  }

};

const ParticleManager = new Particle;

export default ParticleManager;


        // particles = new Array();
        // var PI2 = Math.PI * 2;
        // var material = new THREE.SpriteCanvasMaterial( {
        //   color: 0xffffff,
        //   program: function ( context ) {
        //     context.beginPath();
        //     context.arc( 0, 0, 0.5, 0, PI2, true );
        //     context.fill();
        //   }
        // } );
        // var i = 0;
        // for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
        //   for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
        //     particle = particles[ i ++ ] = new THREE.Sprite( material );
        //     particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
        //     particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
        //     scene.add( particle );
        //   }
        // }







        //awdawdwdawd