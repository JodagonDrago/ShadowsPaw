class Room05 extends Phaser.Scene{
    constructor(){
        super("roomScene05"); // Follow naming convention for future rooms
        this.exitsPos = [250]; // Y positions of exits across right wall
        this.entrancePos = [650]; // Y positions of exits across right wall
    }

    preload() {
        // load images/tile sprites specific to this room
        this.load.image('key', './assets/Key.png');
        
    }

    create(){
        //reset global variables
        console.log('room 5 started');
        currentScene = this;
        eventCheck = false;
        talking = false;
        talking2 = false;

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
        //we leave a gap in the wall for an enterance
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
        //Next add interior walls
        for(let i = 200; i < 850; i += tileSize) { //under key wall
            let wallTile = this.physics.add.sprite(i, 150, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 300; i += tileSize) { //above enterance wall
            let wallTile = this.physics.add.sprite(i, 600, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 250; i += tileSize) { //below enterance wall
            let wallTile = this.physics.add.sprite(i, 700, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 200; i < 550; i += tileSize) { //left wall
            let wallTile = this.physics.add.sprite(200, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 200; i < 550; i += tileSize) { //left wall 2
            let wallTile = this.physics.add.sprite(250, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 700; i < 850; i += tileSize) { //guide right wall
            let wallTile = this.physics.add.sprite(250, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 350; i < 750; i += tileSize) { //big interior wall
            for(let a = 450; a < 750; a += tileSize) {
                let wallTile = this.physics.add.sprite(a, i, 'wall').setOrigin(0);
                wallTile.body.immovable = true;
                wallTile.body.allowGravity = false;
                this.walls.add(wallTile);
            }
        }

        // no backtracking wall
        let hiddenTile = this.physics.add.sprite(-50, 650, 'wall').setOrigin(0); //behind enterance
        hiddenTile.body.immovable = true;
        hiddenTile.body.allowGravity = false;
        this.walls.add(hiddenTile);
        //
        //
        // all walls done

        // add room specific interactable items
        //add key
        this.keyTile = this.physics.add.sprite(750, 100, 'threat').setOrigin(0);
        this.keyTile.body.setSize(25, 25, false);
        this.keyTile.body.immovable = true;
        this.keyTile.body.allowGravity = false;

        // add player at map enterance
        this.player = new Player(this, 0, 650, 'player').setOrigin(0);
        this.physics.add.existing(this.player);

        // add enemies
        // make the enemys group
        this.enemies = this.add.group();
        
        this.enemy1 = new Enemy(this, 50, 550, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy1);
        this.enemies.add(this.enemy1);

        // add guide
        this.guide = new Guide(this, 200, 750, 'enemy').setOrigin(0);
        this.physics.add.existing(this.guide);
        this.guideExit = this.add.sprite(100, 800, 'guideHole').setOrigin(0); //add guide's exit

        // add threat box for range where enemies become alerted. Check if it is a torch or not
        if (hasTorch == false){
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'threat').setOrigin(0.5).setScale(0.9);
        } else {
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'torch_light').setOrigin(0.5);
            this.threat.body.setCircle(200);
        }

        //add blood particles if bleeding (not sure if this is needed yet)
        if (isBleeding == true){
            this.player.blood.resume();
        }

        //trigger for guide to question you
        this.question = this.physics.add.sprite(50, 50, 'threat').setOrigin(0);
        this.question.body.setSize(25, 25, false);
        this.question.body.immovable = true;
        this.question.body.allowGravity = false;

        // add physics colliders between player, enemies, and walls
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.walls);
        // this.physics.add.collider(this.enemies, this.enemies); //makes them push each other through walls

        // add physics overlap to detect player and threat overlapping with enemies or interactables or guide
        this.physics.add.overlap(this.player, this.enemies, ()=> { this.scene.start('gameOverScene'); }); // check if player is hit by enemy and game over if they do
        this.physics.add.overlap(this.threat, this.enemies, this.alerting); // check if player detection range collides with enemy and alert enemy
        this.physics.add.overlap(this.threat, this.guide, this.startTalking); // make guide start talking if player is close enough
        this.physics.add.overlap(this.threat, this.keyTile, function () { //make key shine
            eventCheck = true;
        });
        this.physics.add.overlap(this.player, this.keyTile, this.grabKey); //pick up key
        this.physics.add.overlap(this.threat, this.question, this.startTalking2); //question player


        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        // animation configs (if we end up using any)

        // Add guide dialogue into an array by sentence
        currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
        totalText = 4; // Total sentences spoken by guide in this scene
        textArray = [" ", "You should have listened to me back there.➤", "Now you have no choice...➤", "Your only chance is to run.", " "]

        // Display current sentence and advance to next sentence
        guideText = this.add.text(this.guide.x - 75, this.guide.y - 25, textArray[currText++], textConfig).setOrigin(0, 0.5);
        //guide audio
        voice = this.sound.add('voice', {volume: 0.3});

        //add rocks if they were sent down in previous room and update guide text accordingly. I put this before guide starts talking just in case
        if (rockFall){
            // Add rocks
            this.rockX = [150, 200, 50, 50, 50, 100, 150, 50, 100, 150, 50, 300]; // X positions of rocks;
            this.rockY = [550, 550, 450, 400, 350, 400, 450, 300, 250, 350, 150, 200]; // Y positions of rocks;

            for (let i = 0 ; i < this.rockX.length; i++) {
                let currRock = this.physics.add.sprite(this.rockX[i], this.rockY[i], 'rocks').setOrigin(0);
                currRock.body.immovable = true;
                currRock.body.allowGravity = false;
                this.walls.add(currRock);
            }

            totalText = 4; // Total sentences spoken by guide in this scene
            textArray = [" ", "Great job back there.➤", "Those rocks you dropped blocked them off.➤", "Not much further to go now.➤", "Told you that you could trust me.", " "]
        }

        // Add exit zone
        this.exitZone = this.physics.add.sprite(925, 250, 'wall').setOrigin(0);
        this.physics.add.overlap(this.player, this.exitZone, ()=> { this.scene.start('roomSceneFinal'); }); // check if player collides with exit to next room

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
        //console.log(talking);

        //update prefabs
        this.player.update();
        this.enemy1.update(this.player);
        this.guide.update(this.player);
        this.threat.update(this.player); //passing player into threat so it can follow the player

        // Update blood particles
        if (isBleeding) {
            this.player.blood.x = this.player.x + 20; // Offset by 20 so it is aligned to player
            this.player.blood.y = this.player.y + 50; // Offset by ten so it appears at feet of player
        }

        //make key shine part 2
        if (eventCheck && hasTorch && !hasKey){
            this.keyTile.setTexture('key');
        } else if (!hasKey){
            this.keyTile.setTexture('threat');
        }
        eventCheck = false;
    }

    alerting(threat, enemies){
        enemies.alert = true;
        enemies.setTexture('enemy');
    }

    startTalking() {
        if (talking == false){ //so it doesnt repeat
            guideText.text = textArray[currText++]; //say the first line after " "
            talking = true;
            voice.play();
        }
    }

    startTalking2() {
        if (talking2 == false){ //so it doesnt repeat
            currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
            totalText = 3;
            textArray = ["Where are you going?➤", "There's nothing over there.➤", "You're just going to corner yourself!➤", " "]
            guideText.text = textArray[currText++]; //say the first line after " "
            talking2 = true;
            voice.play();
        }

    }

    grabKey(player, keyTile){
        if (hasTorch){ // pickup key if player can see it
            keyTile.destroy();
            hasKey = true;
            pickupSound.play();
        }
    }

}