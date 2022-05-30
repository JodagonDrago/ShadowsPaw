class Room04 extends Phaser.Scene {
    constructor(){
        super("roomScene04"); // Follow naming convention for future rooms
        this.exitsPos = [100]; // Y positions of exits across right wall
        this.entrancePos = [750]; // Y positions of exits across right wall
        this.rockFalling = false;
    }

    preload() {
        // load images/tile sprites specific to this room
        this.load.image('rock', './assets/Rock.png')
    }

    create() {
        currentScene = this;
        // place map sprite
        this.map = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map').setOrigin(0, 0);
    
        // place wall sprites
        //
        //
        // make the wall group
        this.walls = this.add.group();

        // ring the map with walls
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
        for(let i = 0; i < game.config.height; i += tileSize) { //Left wall
            if (!this.entrancePos.includes(i)) {
                let wallTile = this.physics.add.sprite(0, i, 'wall').setOrigin(0);
                wallTile.body.immovable = true;
                wallTile.body.allowGravity = false;
                this.walls.add(wallTile);  
            }
        }
        // we leave a gap in the wall for an exit
        for(let i = 0; i < game.config.height; i += tileSize) { //Right wall
            if (!this.exitsPos.includes(i)) {
                let wallTile = this.physics.add.sprite(game.config.width - tileSize, i, 'wall').setOrigin(0);
                wallTile.body.immovable = true;
                wallTile.body.allowGravity = false;
                this.walls.add(wallTile);
            }
        }

        // add player at map enterance
        this.player = new Player(this, 0, 750, 'player').setOrigin(0);
        this.physics.add.existing(this.player);

        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        // Add collision for walls and player
        this.physics.add.collider(this.player, this.walls);

        //Add collision group for falling rocks
        this.rocks = this.add.group();
        this.physics.add.overlap(this.player, this.rocks, ()=> { this.scene.start('gameOverScene'); });

        // Start dropping rocks
    }

    update() {
        this.player.update();
        if (this.rockFalling) {
           this.rock.update(); 
        }
    }

    dropRock(X, Y) {
        this.rockFalling = true;
        // Add rock itself and have it fall
        this.rock = new Rock(currentScene, X, -10, 'rock', Y, this.rocks);
        //this.rocks.add(this.rock);
        this.rock.drop(); 
    }
}