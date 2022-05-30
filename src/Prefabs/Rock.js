class Rock extends Phaser.Physics.Arcade.Sprite { //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, dest, group) {
        super(scene, x, y, texture);
  
        // add object to existing scene
        scene.physics.add.existing(this); //this gives the prefab physics
        this.body.allowGravity = true; //no gravity cause it's top down
        this.setGravityY(400);
        this.destination = dest;
        this.scene = scene;
        this.shadow;
        this.group = group;

    }

    update(){
        if (this.y >= this.destination - 10) {
            this.group.add(this);
        }

        if (this.y >= this.destination) {
            
            console.log('SMASH');
            this.y = -10;
            this.destroy();
            this.shadow.destroy();
        }
        
    }

    drop() {
        this.scene.add.existing(this);
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