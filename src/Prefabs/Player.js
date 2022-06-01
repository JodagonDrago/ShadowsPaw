// player prefab
class Player extends Phaser.GameObjects.Sprite { //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.physics.world.enable(this); //this gives the prefab physics
      this.body.allowGravity = false; //no gravity cause it's top down
      scene.add.existing(this);

      // Boolean to prevent movement if player is already moving
      this.isMoving = false;

      //bool for if sprite is flipped
      this.flipped = false;

      // Reserve scene as local variable
      this.scene = scene;

      // Set up particle system
      this.blood = scene.add.particles('blood');
      this.blood.createEmitter({
        lifespan: 1000,
        speed: { min: 10, max: 20 },
        angle: 180,
        gravityY: 50,
        scale: { start: 1, end: 0.4 },
        quantity: 1,
        frequency: 500
      });

      this.blood.pause();

    }

    update(){

        // movement using arcade physics and global variables in main.js
        // Check keyboard input for directional movement
        if (cursors.left.isDown && !this.isMoving) {
            //console.log('Left pushed');
            this.isMoving = true;
            this.scene.physics.moveTo(this, this.x - 50, this.y, 60, playerSpeed);

            if (this.flipped == true){
                this.flipX = false;
                this.flipped = false;
            }

            // Delay movement until player has moved one unit (50px)
            this.delayMove();

        } else if (cursors.right.isDown && !this.isMoving) {
            //console.log('Right pushed');
            this.isMoving = true;
            this.scene.physics.moveTo(this, this.x + 50, this.y, 60, playerSpeed);

            if (this.flipped == false){
                this.flipX = true;
                this.flipped = true;
            }

            // Delay movement until player has moved one unit (50px)
            this.delayMove();

        } else if (cursors.up.isDown && !this.isMoving) {
            //console.log('Up pushed');
            this.isMoving = true;
            this.scene.physics.moveTo(this, this.x, this.y - 50, 60, playerSpeed);

            // Delay movement until player has moved one unit (50px)
            this.delayMove();

        } else if (cursors.down.isDown && !this.isMoving) {
            //console.log('Down pushed');
            this.isMoving = true;
            this.scene.physics.moveTo(this, this.x, this.y + 50, 60, playerSpeed);

            // Delay movement until player has moved one unit (50px)
            this.delayMove();

        }
        
    }

    // A function for delaying movement so that player does not move several times a second
    delayMove() {

        this.scene.time.delayedCall(playerSpeed + 1, () => {
            this.body.setVelocityY(0);
            this.body.setVelocityX(0);
            this.x = Phaser.Math.Snap.To(this.x, 50);
            this.y = Phaser.Math.Snap.To(this.y, 50);
            this.isMoving = false;
        }, null, this);

    }

}