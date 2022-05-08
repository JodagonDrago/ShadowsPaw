//Spaceship prefab
class Enemy extends Phaser.Physics.Arcade.Sprite{ //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.physics.add.existing(this); //this gives the prefab physics
        this.body.allowGravity = false; //no gravity cause it's top down
        scene.add.existing(this);

    }

    update(){
        // check if alerted to player
        // this will likely need a global variable in the constructor

        //if alerted, move toward player
    }

}