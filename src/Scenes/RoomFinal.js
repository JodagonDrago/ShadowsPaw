class RoomFinal extends Phaser.Scene{
    constructor(){
        super("roomSceneFinal"); // Follow naming convention for future rooms
    }

    create() {
        // Place map sprite
        console.log('Final room started');
        this.map = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map').setOrigin(0, 0);

        this.walls = this.add.group();

        // Add top and bottom walls
        for(let i = 0; i < game.config.width; i += tileSize) { //Bottom wall
            let wallTile = this.physics.add.sprite(i, game.config.height - tileSize, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 0; i < game.config.width; i += tileSize) { //Top wall
            let wallTile = this.physics.add.sprite(i, 0, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        // Add left wall with gap for player spawn point
        for(let i = 0; i < game.config.height; i += tileSize) { //Left wall
            if (i != game.config.height / 2) {
                let wallTile = this.physics.add.sprite(0, i, 'wall').setOrigin(0);
                wallTile.body.immovable = true;
                wallTile.body.allowGravity = false;
                this.walls.add(wallTile);  
            }
        }
    }

    update() {

    }
}