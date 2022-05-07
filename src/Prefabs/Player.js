// Rocket prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);

    }

    update(){
        //movement using arcade physics and global variables in main.js
        
    }

}