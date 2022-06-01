// Rocket prefab
class Guide extends Phaser.GameObjects.Sprite { //left a gameobject cause it doesnt move or interact with player ever
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.physics.world.enable(this); //this gives the prefab physics
      this.body.allowGravity = false; //no gravity cause it's top down
      this.body.immovable = true;
      scene.add.existing(this);

      //bool and other variables for if sprite is flipped
      this.flipped = false;
      this.posX = this.body.x;

      // Reserve scene as local variable
      this.scene = scene;

    }

    update(player){

      // turn to face player
      if (this.posX - player.x > 0 && this.flipped == true){
        this.flipX = false;
        this.flipped = false;
      } else if (this.posX - player.x < 0 && this.flipped == false){
        this.flipX = true;
        this.flipped = true;
      }

    }

}