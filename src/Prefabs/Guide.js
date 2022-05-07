// Rocket prefab
class Guide extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);

    }

    update(){
        // blink animation? 
        // He really doesnt need to do anything other than sit there and talk
        // He may not even need an update

    }

}