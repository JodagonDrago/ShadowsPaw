// Threat prefab
//this exists to have a larger area around the player where the enemies detect them
class Threat extends Phaser.Physics.Arcade.Sprite { //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.physics.add.existing(this); //this gives the prefab physics
      this.body.allowGravity = false; //no gravity cause it's top down
      scene.add.existing(this);

    }

    update(player){
        //follow player
        this.x = player.x + tileSize/2;
        this.y = player.y + tileSize/2;
    }

}