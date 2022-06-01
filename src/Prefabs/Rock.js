class Rock extends Phaser.Physics.Arcade.Sprite { //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, dest, group) {
        super(scene, x, y, texture);
  
        // add object to existing scene
        scene.physics.add.existing(this); //this gives the prefab physics
        this.body.allowGravity = true; // Add gravity 
        this.body.setCircle(32);
        this.setGravityY(400);
        this.destination = dest; // The Y location where it will hit the ground
        this.scene = scene;
        this.shadow;
        this.group = group;
        this.setDepth(3); // Have rock appear on top of player sprite

        this.particles = scene.add.particles(texture);
        this.explosion = this.particles.createEmitter({
            angle: { min: 240, max: 300 },
            speed: { min: 400, max: 600 },
            quantity: { min: 2, max: 10 },
            lifespan: 4000,
            alpha: { start: 1, end: 0 },
            scale: { min: 0.05, max: 0.4 },
            rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
            gravityY: 800,
            on: false
        });

    }

    update(){
        // Add collision just before it reaches destination
        // This is so it doesn't hit the player until it lands
        if (this.y >= this.destination - 10) {
            this.group.add(this);
        }

        // Remove rock once the deed is done
        if (this.y >= this.destination) {
            console.log('SMASH');
            //add rock audio
            this.scene.smash = this.scene.sound.add('smash', {volume: 2});
            this.scene.smash.play();

            this.y = -10;
            this.destroy();
            this.shadow.destroy();
            this.particles.emitParticleAt(this.x, this.destination);
        }
        
    }

    drop() {
        this.scene.add.existing(this);

        // Add shadow to telegraph landing
        this.shadow = this.scene.add.arc(this.x, this.destination, 10, 0, 360, false, 0x454242, 0.5);
        this.scene.tweens.add({

            targets: this.shadow,
            scaleX: 4.5,
            scaleY: 4.5,
            yoyo: false,
            ease: 'Sine.easeIn',
            duration: 1000
        });
    }


}