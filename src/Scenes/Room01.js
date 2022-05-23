class Room01 extends Phaser.Scene{
    constructor(){
        super("roomScene01"); // Follow naming convention for future rooms
    }

    preload() {
        // load images/tile sprites specific to this room
        this.load.image('torch', './assets/Torch.png');
        
    }

    create(){
        console.log('room 1 started');
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
        // for the first floor we dont need an enterance hole but will on later floors
        for(let i = 0; i < game.config.height; i += tileSize) { //Right wall top
            let wallTile = this.physics.add.sprite(0, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        // we leave a gap in the wall for an exit
        for(let i = 0; i < 350; i += tileSize) { //Right wall bottom
            let wallTile = this.physics.add.sprite(game.config.width - tileSize, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 400; i < game.config.height; i += tileSize) { //Left wall
            let wallTile = this.physics.add.sprite(game.config.width - tileSize, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        //Next add interior walls
        let aTile = this.physics.add.sprite(50, 800, 'wall').setOrigin(0); //the 1 block in bottom right
        aTile.body.immovable = true;
        aTile.body.allowGravity = false;
        this.walls.add(aTile);
        //Next add interior walls
        let bTile = this.physics.add.sprite(50, 600, 'wall').setOrigin(0); //the 1 block above that one
        bTile.body.immovable = true;
        bTile.body.allowGravity = false;
        this.walls.add(bTile);
        for(let i = 400; i < 850; i += tileSize) { //wall to player right
            let wallTile = this.physics.add.sprite(150, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 200; i < 850; i += tileSize) { //wall above enemy
            let wallTile = this.physics.add.sprite(i, 400, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 450; i += tileSize) { //wall bellow guide
            let wallTile = this.physics.add.sprite(i, 300, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 500; i < 850; i += tileSize) { //wall bellow guide continued
            let wallTile = this.physics.add.sprite(i, 300, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 300; i += tileSize) { //left torch wall
            let wallTile = this.physics.add.sprite(400, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 300; i += tileSize) { //right torch wall
            let wallTile = this.physics.add.sprite(500, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        //
        //
        // all walls done

        // add room specific interactable items
        // torch
        this.torchTile = this.physics.add.sprite(450, 50, 'torch').setOrigin(0);
        this.torchTile.body.immovable = true;
        this.torchTile.body.allowGravity = false;
        pickupSound = this.sound.add('pickup', {volume: 0.5});

        // add player at map enterance
        this.player = new Player(this, 100, 750, 'player').setOrigin(0);
        this.physics.add.existing(this.player);

        // add enemys
        // make the enemys group
        this.enemies = this.add.group();
        this.enemy1 = new Enemy(this, 200, 550, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy1);
        this.enemies.add(this.enemy1);
        this.enemy2 = new Enemy(this, 650, 50, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy2);
        this.enemies.add(this.enemy2);

        // add guide
        this.guide = this.physics.add.sprite(300, 250, 'enemy').setOrigin(0); //using guide sprite instead of prefab for now unless prefab is needed
        this.guide.body.immovable = true;
        this.guide.body.allowGravity = false;

        // add threat box for range where enemies become alerted. (in later rooms, check to see if player has torch and add torch instead of threat if they do)
        this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'threat').setOrigin(0.5).setScale(0.9);
        
        // add torch in case it is picked up, but hide it off screen. In future scenes, check if hasTorch is true for which threat to make
        this.newThreat = new Threat(this, -500, -500, 'torch_light').setOrigin(0.5);
        this.newThreat.body.setCircle(200);

        // add physics colliders between player, enemies, and walls
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.walls);

        // add physics overlap to detect player and threat overlapping with enemies or interactables or guide
        this.physics.add.overlap(this.player, this.enemies, ()=> { this.scene.start('gameOverScene'); }); // check if player is hit by enemy and game over if they do
        this.physics.add.overlap(this.threat, this.enemies, this.alerting); // check if player detection range collides with enemy and alert enemy
        this.physics.add.overlap(this.newThreat, this.enemies, this.alerting); // check if new player detection range collides with enemy and alert enemy
        this.physics.add.overlap(this.player, this.torchTile, this.interact); // check if player touches torch and equip it
        this.physics.add.overlap(this.threat, this.guide, this.startTalking); // make guide start talking if player is close enough
        this.physics.add.overlap(this.newThreat, this.guide, this.startTalking2); // make guide start talking if player is close enough


        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        // animation configs (if we end up using any)

        // Add guide dialogue into an array by sentence
        currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
        totalText = 9; // Total sentences spoken by guide in this scene
        textArray = [" ", "Hello... you look scared...", "Do you need help getting out of here?", "I can help. Trust me.", "The exit's further ahead.", "but before you go...", "There's an old torch up ahead.", "If you pick it up, the light it shines...", "will make the monsters more hesitant to approach you.", " "]
        talking = false;
        talking2 = false;
        // Display current sentence and advance to next sentence
        guideText = this.add.text(this.guide.x + 25, this.guide.y - 25, textArray[currText++], textConfig).setOrigin(0.5);
        //guide audio
        voice = this.sound.add('voice', {volume: 0.5});

        // Add exit zone
        this.exitZone = this.physics.add.sprite(925, 350, 'wall').setOrigin(0);
        this.physics.add.overlap(this.player, this.exitZone, ()=> { this.scene.start('roomScene02'); }); // check if player collides with exit to next room

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
        this.enemy2.update(this.player);
        if (hasTorch == false){
            this.threat.update(this.player); //passing player into threat so it can follow the player
        } else {
            this.newThreat.update(this.player); //they have picked up the torch
        }

        // check if player collides with exit to next room
    }

    alerting(threat, enemies){
        enemies.alert = true;
        enemies.setTexture('enemy');
    }

    interact(player, torchTile){
        torchTile.destroy();
        hasTorch = true;
        pickupSound.play();
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
            totalText = 2;
            textArray = ["Oops, looks like they see you from further now too.", "Heh heh heh, I'm sure you'll be fine."," "]
            guideText.text = textArray[currText++]; //say the first line after " "
            talking2 = true;
            voice.play();
        }
    }
}

