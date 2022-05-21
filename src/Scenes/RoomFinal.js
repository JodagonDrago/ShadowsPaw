class RoomFinal extends Phaser.Scene{
    constructor(){
        super("roomSceneFinal"); // Follow naming convention for future rooms
        this.exitsPos = [200, 250, 400, 450, 600, 650]; // Y positions of exits across right wall
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
        // Add right wall with three openings
        for(let i = 0; i < game.config.height; i += tileSize) { //Right wall
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
        this.exitZones.add(this.physics.add.sprite(925, 200, 'wall').setOrigin(0));
        this.exitZones.add(this.physics.add.sprite(925, 250, 'wall').setOrigin(0));
        this.exitZones.add(this.physics.add.sprite(925, 400, 'wall').setOrigin(0));
        this.exitZones.add(this.physics.add.sprite(925, 450, 'wall').setOrigin(0));
        this.exitZones.add(this.physics.add.sprite(925, 600, 'wall').setOrigin(0));
        this.exitZones.add(this.physics.add.sprite(925, 650, 'wall').setOrigin(0));

        this.physics.add.overlap(this.player, this.exitZones, ()=> { this.scene.start('roomSceneFinal'); }); // check if player collides with exit to next room

        // Add light from exits
        let r1 = this.add.arc(900, 250, 50, 90, 270, false, 0xFFFFFF, 0.4);
        let r2 = this.add.arc(900, 450, 50, 90, 270, false, 0xf02929, 0.4);

        this.tweens.add({

            targets: r2,
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
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