class RoomFinal extends Phaser.Scene{
    constructor(){
        super("roomSceneFinal"); // Follow naming convention for future rooms
        this.exitsPos = [400, 450, 500]; // Y positions of exits across right wall
    }

    preload() {
        this.load.image('secretWall', './assets/CrackedWall.png')
        this.load.image('holeWall', './assets/HoleWall.png')
    }

    create() {
        // Place map sprite
        console.log('Final room started');
        this.map1 = this.add.tileSprite(0, 450, 450, 50, 'map').setOrigin(0, 0);
        this.map2 = this.add.tileSprite(450, 200, 450, 500, 'map').setOrigin(0, 0);

        this.walls = this.add.group();

        // Add top and bottom walls of open area
        for(let i = 400; i < game.config.width; i += tileSize) { //Bottom wall
            let wallTile;
            if (i == 500) {
                wallTile = this.physics.add.sprite(i, 700, 'secretWall').setOrigin(0);
            } else {
                wallTile = this.physics.add.sprite(i, 700, 'wall').setOrigin(0);
            }
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 400; i < game.config.width; i += tileSize) { //Top wall
            let wallTile;
            if (i == 500) {
                wallTile = this.physics.add.sprite(i, 150, 'holeWall').setOrigin(0);
            } else {
                wallTile = this.physics.add.sprite(i, 150, 'wall').setOrigin(0);
            }
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }

        // Add top and bottom corridor walls
        for(let i = 0; i < game.config.width / 2; i += tileSize) { //Top wall
            let wallTile = this.physics.add.sprite(i, 400, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 0; i < game.config.width / 2; i += tileSize) { //Bottom wall
            let wallTile = this.physics.add.sprite(i, 500, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }

    
        // Connect open area to corridor
        for(let i = 150; i < 750; i += tileSize) {
            if (i != game.config.height / 2) {
                let wallTile = this.physics.add.sprite(400, i, 'wall').setOrigin(0);
                wallTile.body.immovable = true;
                wallTile.body.allowGravity = false;
                this.walls.add(wallTile);  
            }
        }
    
        // Add right wall with exits
        for(let i = 150; i < 750; i += tileSize) { //Right wall
            if (!this.exitsPos.includes(i)) {
                let wallTile = this.physics.add.sprite(850 , i, 'wall').setOrigin(0);
                wallTile.body.immovable = true;
                wallTile.body.allowGravity = false;
                this.walls.add(wallTile);
            }  
        }

        // Add player
        this.player = new Player(this, 0, game.config.height / 2, 'player').setOrigin(0);
        this.physics.add.existing(this.player);

        // add physics colliders between player, enemies, and walls
        this.physics.add.collider(this.player, this.walls);

        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        // Add exit zones
        this.exitZones = this.add.group();
        // Tile(s) for guide exit
        // Tile(s) for trap exit
        this.exitZones.add(this.physics.add.sprite(925, 400, 'wall').setOrigin(0));
        this.exitZones.add(this.physics.add.sprite(925, 450, 'wall').setOrigin(0));
        this.exitZones.add(this.physics.add.sprite(925, 500, 'wall').setOrigin(0));
        // Tile(s) for secret exit

        this.physics.add.overlap(this.player, this.exitZones, ()=> { this.scene.start('roomSceneFinal'); }); // check if player collides with exit to next room
    }

    update() {
        // Check keyboard for space key input (This can be used for interacting with objects, or progressing guide text)
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && currText <= totalText && talking == true) {
            // Advance to next sentence
            guideText.text = textArray[currText++];
            if (currText <= totalText){ //dont make sound if dialogue is over
            voice.play();
            }
        }

        //update prefabs
        this.player.update();
    }
}