// player prefab
class Player extends Phaser.Physics.Arcade.Sprite { //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.physics.add.existing(this); //this gives the prefab physics
      this.body.allowGravity = false; //no gravity cause it's top down
      this.body.immovable = true;
      scene.add.existing(this);

      // Boolean to prevent movement if player is already moving
      this.isMoving = false;
      this.posX = this.x;
      this.posY = this.y;

      // Reserve scene as local variable
      this.scene = scene;

    }

    update(){

        // movement using arcade physics and global variables in main.js
        // Check keyboard input for directional movement
        if (cursors.left.isDown && !this.isMoving) {
            //console.log('Left pushed');
            this.isMoving = true;
            this.posX = this.x;
            this.body.setVelocityX(-100);

            // Delay movement until player has moved one unit (50px)
            //this.delayMove();

        } else if (cursors.right.isDown && !this.isMoving) {
            //console.log('Right pushed');
            this.isMoving = true;
            this.posX = this.x;
            this.body.setVelocityX(100);

            // Delay movement until player has moved one unit (50px)
            //this.delayMove();

        } else if (cursors.up.isDown && !this.isMoving) {
            //console.log('Up pushed');
            this.isMoving = true;
            this.posY = this.y;
            this.body.setVelocityY(-100);

            // Delay movement until player has moved one unit (50px)
            //this.delayMove();

        } else if (cursors.down.isDown && !this.isMoving) {
            //console.log('Down pushed');
            this.isMoving = true;
            this.posY = this.y;
            this.body.setVelocityY(100);

            // Delay movement until player has moved one unit (50px)
            //this.delayMove();

        }
        if (this.x == this.posX + 50 || this.x == this.posX - 50 || this.y == this.posY + 50 || this.y == this.posY + 50){
            this.body.setVelocityY(0);
            this.body.setVelocityX(0);
            this.isMoving = false;
        }
        /* all of this is trying to get colliders working
        if (this.body.touching.left || this.body.touching.right){
            this.body.setVelocityX(0);
            this.x = Phaser.Math.Snap.To(this.x, 50);
            //console.log('touch');
        } else if (this.body.touching.up || this.body.touching.down){
            this.body.setVelocityY(0);
            //console.log('touch');
            this.y = Phaser.Math.Snap.To(this.y, 50);
        } 
        */
        
    }

    // A function for delaying movement so that player does not move several times a second
    delayMove() {
        /*
        this.scene.time.delayedCall(501, () => {
            this.body.setVelocityY(0);
            this.body.setVelocityX(0);
            this.isMoving = false;
        }, null, this);
        */
    }

}