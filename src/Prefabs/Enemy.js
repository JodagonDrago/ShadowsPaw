//Spaceship prefab
class Enemy extends Phaser.GameObjects.Sprite{ //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.physics.world.enable(this); //this gives the prefab physics
        this.body.allowGravity = false; //no gravity cause it's top down
        scene.add.existing(this);

        this.alert = false;

        // Reserve scene as local variable
        this.scene = scene;

    }

    update(player){
        // check if alerted to player
        // if alerted, move toward player
        if (this.alert == true){
            this.scene.physics.moveToObject(this, player, enemySpeed);

        }
    }

}