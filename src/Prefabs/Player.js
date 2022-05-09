// player prefab
class Player extends Phaser.Physics.Arcade.Sprite { //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.physics.add.existing(this); //this gives the prefab physics
      this.body.allowGravity = false; //no gravity cause it's top down
      scene.add.existing(this);

      // Boolean to prevent movement if player is already moving
      this.isMoving = false;

      // Reserve scene as local variable
      this.scene = scene;

    }

    update(){
        // movement using arcade physics and global variables in main.js
        // Check keyboard input for directional movement
        if (cursors.left.isDown && !this.isMoving) {
            console.log('Left pushed');
            this.isMoving = true;
            this.x -= 50;

            // Delay movement until player has moved one unit (50px)
            this.delayMove();

        } else if (cursors.right.isDown && !this.isMoving) {
            console.log('Right pushed');
            this.isMoving = true;
            this.x += 50;

            // Delay movement until player has moved one unit (50px)
            this.delayMove();

        } else if (cursors.up.isDown && !this.isMoving) {
            console.log('Up pushed');
            this.isMoving = true;
            this.y -= 50;

            // Delay movement until player has moved one unit (50px)
            this.delayMove();

        } else if (cursors.down.isDown && !this.isMoving) {
            console.log('Down pushed');
            this.isMoving = true;
            this.y += 50;

            // Delay movement until player has moved one unit (50px)
            this.delayMove();

        }
        
    }

    // A function for delaying movement so that player does not move several times a second
    delayMove() {
        this.scene.time.delayedCall(500, () => {
            this.isMoving = false;
        }, null, this);
    }

}