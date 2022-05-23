class RoomFinal extends Phaser.Scene{
    constructor(){
        super("roomSceneFinal"); // Follow naming convention for future rooms
        this.exitsPos = [400, 450, 500]; // Y positions of exits across right wall
    }

    preload() {
        this.load.image('secretWall', './assets/CrackedWall.png')
        this.load.image('holeWall', './assets/HoleWall.png')
        this.load.image('eyes', './assets/EyeGlow.png')
        this.load.image('redEyes', './assets/RedEyeGlow.png')
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

        // Add enemy eyes in the void
        this.eyes = this.add.group();
        let eyesPosX = [100, 100, 200, 250, 300, 250, 100, 200, 150, 200, 300]; // X positions of eyes;
        let eyesPosY = [100, 250, 150, 50, 150, 250, 650, 600, 750, 850, 700]; // Y positions of eyes;

        for (let i = 0 ; i < eyesPosX.length; i++) {
            let currEyes = this.add.sprite(eyesPosX[i], eyesPosY[i], 'eyes');
            this.eyes.add(currEyes);
        }

        // Add guide in void
        this.guide = this.physics.add.sprite(350, 350, 'redEyes').setOrigin(0); //using guide sprite instead of prefab for now unless prefab is needed
        this.guide.body.immovable = true;
        this.guide.body.allowGravity = false;


        // Add player
        this.player = new Player(this, 0, game.config.height / 2, 'player').setOrigin(0);
        this.physics.add.existing(this.player);

        // add threat box for range where enemies become alerted. Check if it is a torch or not
        if (hasTorch == false){
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'threat').setOrigin(0.5);
        } else {
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'torch_light').setOrigin(0.5);
        }

        // add physics colliders between player, enemies, and walls
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.overlap(this.threat, this.guide, this.startTalking); // make guide start talking if player is close enough

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

        // Add guide dialogue into an array by sentence
        currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
        totalText = 7; // Total sentences spoken by guide in this scene
        textArray = [" ", "Your fate lies ahead", "If I were you...", "I would take that hole in the wall", " "]
        talking = false;
        talking2 = false;
        // Display current sentence and advance to next sentence
        guideText = this.add.text(this.guide.x - 90, this.guide.y - 25, textArray[currText++], textConfig).setOrigin(0, 0.5);
        //guide audio
        voice = this.sound.add('voice', {volume: 0.5});
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

        // Update threat range
        this.threat.update(this.player);
    }

    startTalking() {
        if (talking == false){ //so it doesnt repeat
            guideText.text = textArray[currText++]; //say the first line after " "
            talking = true;
            voice.play();
        }
    }
}