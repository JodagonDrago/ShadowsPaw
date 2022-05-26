class RoomFinal extends Phaser.Scene{
    constructor(){
        super("roomSceneFinal"); // Follow naming convention for future rooms
        this.exitsPos = [400, 450, 500]; // Y positions of exits across right wall
    }

    preload() {
        this.load.image('secretWall', './assets/CrackedWall.png')
        this.load.image('holeWall', './assets/HoleWall.png')
        this.load.image('eyes', './assets/Eye Glow.png')
        this.load.image('redEyes', './assets/Red Eye Glow.png')
    }

    create() {

        // Place map sprite
        console.log('Final room started');
        this.map1 = this.add.tileSprite(0, 450, 450, 50, 'map').setOrigin(0, 0);
        this.map2 = this.add.tileSprite(450, 200, 450, 600, 'map').setOrigin(0, 0);

        this.walls = this.add.group();
        this.guideExit;
        this.secretExit;

        // Add top and bottom walls of open area
        for(let i = 400; i < game.config.width; i += tileSize) { //Bottom wall
            let wallTile;
            if (i == 500) {
                this.secretExit = this.physics.add.sprite(i, 750, 'secretWall').setOrigin(0); // Add secret exit sprite
                this.secretExit.body.immovable = true;
                this.secretExit.body.allowGravity = false;
            } else {
                wallTile = this.physics.add.sprite(i, 750, 'wall').setOrigin(0);
                wallTile.body.immovable = true;
                wallTile.body.allowGravity = false;
                this.walls.add(wallTile);
            }
        }
        for(let i = 400; i < game.config.width; i += tileSize) { //Top wall
            let wallTile;
            if (i == 600) {
                this.guideExit = this.physics.add.sprite(i, 150, 'holeWall').setOrigin(0); // Add guide exit sprite
                this.guideExit.body.setCircle(5, 25, 25);
                this.guideExit.body.immovable = true;
                this.guideExit.body.allowGravity = false;
            } else {
                wallTile = this.physics.add.sprite(i, 150, 'wall').setOrigin(0);
                wallTile.body.immovable = true;
                wallTile.body.allowGravity = false;
                this.walls.add(wallTile);
            }
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
        if (testing == false){
            this.eyesPosX = [100, 100, 200, 250, 300, 250, 100, 200, 150, 200, 300]; // X positions of eyes;
            this.eyesPosY = [100, 250, 150, 50, 150, 250, 650, 600, 750, 850, 700]; // Y positions of eyes;
        } else {
            this.eyesPosX = [50, 25, 50, 100, 200, 250, 150, 200, 300, 350, 325, 375, 450, 600, 650, 725, 775, 850, 875]; // X positions of eyes;
            this.eyesPosY = [700, 575, 875, 650, 600, 700, 750, 850, 700, 600, 800, 850, 875, 825, 875, 850, 850, 825, 875]; // Y positions of eyes;
        }

        for (let i = 0 ; i < this.eyesPosX.length; i++) {
            let currEyes = this.add.sprite(this.eyesPosX[i], this.eyesPosY[i], 'eyes');
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

        // Add guide dialogue into an array by sentence
        currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
        totalText = 9; // Total sentences spoken by guide in this scene
        textArray = [" ", "You're almost out.➤", "But there's just one last danger...➤", "Another ambush waiting for you.➤", "Right through that big exit.➤", "But don't worry...➤", "I made an opening in the wall for you.➤", "You can go through it isntead!➤", "Go on, you're so close!", " "]
        talking = false;
        talking2 = false;
        // Display current sentence and advance to next sentence
        guideText = this.add.text(this.guide.x + 25, this.guide.y - 25, textArray[currText++], textConfig).setOrigin(0.5);
        //guide audio
        voice = this.sound.add('voice', {volume: 0.5});

        // Add exit zones
        // Guide exit
        this.physics.add.overlap(this.player, this.guideExit, ()=> { this.scene.start('menuScene'); }); // check if player collides with guide exit
        // Trap exit
        this.exitZone = this.physics.add.sprite(925, 400, 'wall').setOrigin(0).setScale(1, 3);
        this.physics.add.overlap(this.player, this.exitZone, ()=> { this.scene.start('gameOverScene'); }); // check if player collides with trap exit
        // Secret exit
        this.unlockedExit = this.physics.add.sprite(500, 775, 'threat').setOrigin(0).setScale(0.2); //make secret exit past lock
        this.physics.add.collider(this.player, this.secretExit, this.keyCheck); // check if player collides with secret exit lock and open it if they have key
        this.physics.add.overlap(this.player, this.unlockedExit, ()=> { this.scene.start('menuScene'); }); // check if player collides with unlocked exit

        testing = true;
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

    keyCheck(player, secretExit) {
        if (hasKey == true){
            secretExit.destroy();
        }
    }
}