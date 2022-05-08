// player prefab
class Player extends Phaser.Physics.Arcade.Sprite { //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.physics.add.existing(this); //this gives the prefab physics
      this.body.allowGravity = false; //no gravity cause it's top down
      scene.add.existing(this);

    }

    update(){
        // movement using arcade physics and global variables in main.js
        // Check keyboard input for directional movement
        if (cursors.left.isDown) {
            console.log('Left pushed');

        } else if (cursors.right.isDown) {
            console.log('Right pushed');

        } else if (cursors.up.isDown) {
            console.log('Up pushed');

        } else if (cursors.down.isDown) {
            console.log('Down pushed');
        }
        
    }

}