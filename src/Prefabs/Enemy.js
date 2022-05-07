//Spaceship prefab
class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

    }

    update(){
        // check if alerted to player
        // this will likely need a global variable in the constructor

        //if alerted, move toward player
    }

}