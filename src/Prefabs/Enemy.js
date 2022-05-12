//Spaceship prefab
class Enemy extends Phaser.GameObjects.Sprite{ //made a physics object instead of a gameobject
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.physics.world.enable(this); //this gives the prefab physics
        this.body.allowGravity = false; //no gravity cause it's top down
        this.body.setCircle(25); //circle collider to avoid getting stuck on the walls
        scene.add.existing(this);

        this.alert = false;

        // Boolean to prevent movement if player is already moving
        this.pause = false;

        // Reserve scene as local variable
        this.scene = scene;

    }

    update(player){
        // check if alerted to player
        // if alerted, move toward player

        //see which direction to move first
        this.playerXDistance = this.x - player.x;
        this.playerYDistance = this.y - player.y;
        if (this.alert == true){
            if (this.pause == false){
                this.scene.physics.moveToObject(this, player, enemySpeed);
            }
            if (hasTorch == true && this.pause == false){
                this.scene.time.delayedCall(700, () => {
                    this.body.setVelocityY(0);
                    this.body.setVelocityX(0);
                    this.pause = true;
                }, null, this);

            } else if (this.pause == true){
                this.scene.time.delayedCall(500, () => {
                    this.pause = false;
                }, null, this);

            }
        }
    }

}