class Room02 extends Phaser.Scene{
    constructor(){
        super("roomScene02"); // Follow naming convention for future rooms
        this.exitsPos = [450]; // Y positions of exits across right wall
        this.entrancePos = [450]; // Y positions of exits across right wall
    }

    preload() {
        // load images/tile sprites specific to this room
        this.load.image('pit', './assets/Pit.png');
        this.load.image('eyes', './assets/Eye Glow.png');
        this.load.image('bridge', './assets/Cracking Bridge.png')
        this.load.audio('cracking', './assets/Cracking.wav');
        this.load.image('dust', './assets/Crumble_Dust.png')
        
    }

    create(){
        //reset global variables
        console.log('room 2 started');
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
        for(let i = 0; i < 300; i += tileSize) { //Bottom wall first half
            let wallTile = this.physics.add.sprite(i, game.config.height - tileSize, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 600; i < game.config.width; i += tileSize) { //Bottom wall second half
            let wallTile = this.physics.add.sprite(i, game.config.height - tileSize, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 0; i < 300; i += tileSize) { //Top wall first half
            let wallTile = this.physics.add.sprite(i, 0, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 600; i < game.config.width; i += tileSize) { //Top wall second half
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
        for(let i = 0; i < 250; i += tileSize) { //left gap wall top
            let wallTile = this.physics.add.sprite(250, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 300; i < 650; i += tileSize) { //left gap wall mid
            let wallTile = this.physics.add.sprite(250, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 800; i < 850; i += tileSize) { //left gap wall bot
            let wallTile = this.physics.add.sprite(250, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 0; i < 250; i += tileSize) { //right gap wall top
            let wallTile = this.physics.add.sprite(600, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 300; i < 650; i += tileSize) { //right gap wall mid
            let wallTile = this.physics.add.sprite(600, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 800; i < 850; i += tileSize) { //right gap wall bot
            let wallTile = this.physics.add.sprite(600, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        //room for guide
        for(let i = 100; i < 250; i += tileSize) { //top of room
            let wallTile = this.physics.add.sprite(i, 350, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 100; i < 250; i += tileSize) { //bottom of room
            let wallTile = this.physics.add.sprite(i, 550, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 400; i < 550; i += tileSize) { //wall of room
            let wallTile = this.physics.add.sprite(100, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        //
        //
        // all walls done

        // add room specific interactable items
        // add pits
        this.pitTop = this.physics.add.sprite(300, -100, 'pit').setOrigin(0).setScale(6, 7);
        this.pitTop.body.immovable = true;
        this.pitTop.body.allowGravity = false;
        this.walls.add(this.pitTop);

        this.pitMid = this.physics.add.sprite(300, 300, 'pit').setOrigin(0).setScale(6, 7);
        this.pitMid.body.immovable = true;
        this.pitMid.body.allowGravity = false;
        this.walls.add(this.pitMid);

        this.pitBot = this.physics.add.sprite(300, 800, 'pit').setOrigin(0).setScale(6, 7);
        this.pitBot.body.immovable = true;
        this.pitBot.body.allowGravity = false;
        this.walls.add(this.pitBot);

        //pit under crumbling bridge
        this.pitBot = this.physics.add.sprite(300, 250, 'pit').setOrigin(0).setScale(6, 1);
        this.pitBot.body.immovable = true;
        this.pitBot.body.allowGravity = false;

        this.shine = this.add.group();
        this.shine1 = this.physics.add.sprite(550, 600, 'threat').setOrigin(0).setScale(0.2);
        this.shine1.body.immovable = true;
        this.shine1.body.allowGravity = false;
        this.shine1.body.setCircle(15, 100, 100);
        this.shine.add(this.shine1);

        this.shine2 = this.physics.add.sprite(550, 800, 'threat').setOrigin(0).setScale(0.2);
        this.shine2.body.immovable = true;
        this.shine2.body.allowGravity = false;
        this.shine2.body.setCircle(15, 100, 100);
        this.shine.add(this.shine2);

        //add bridge
        this.crumbling = this.add.group();
        for(let i = 300; i < 600; i += tileSize) { //right of corner
            let bridgeTile = this.physics.add.sprite(i, 250, 'bridge').setOrigin(0);
            bridgeTile.body.immovable = true;
            bridgeTile.body.allowGravity = false;
            this.crumbling.add(bridgeTile);
        }

        // add cracking sound and visuals
        sfx = this.sound.add('cracking', {volume: 0.5});

        this.particles = this.add.particles('dust'); // Particles for crumbling dust
        this.particles.x = 300;
        this.particles.y = 300;
        this.particles.createEmitter({
            lifespan: 1000,
            speed: { min: 10, max: 20 },
            angle: 90,
            gravityY: 50,
            scale: { start: 1, end: 0.4 },
            quantity: 1,
            frequency: 500
        });
        this.particles.pause();

        // add player at map enterance
        this.player = new Player(this, 0, 450, 'player').setOrigin(0);
        this.physics.add.existing(this.player);

        // add enemys off screen
        // make the enemys group
        this.enemies = this.add.group();
        
        this.enemy1 = new Enemy(this, 550, -500, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy1);
        this.enemies.add(this.enemy1);
        this.enemy2 = new Enemy(this, 550, -500, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy2);
        this.enemies.add(this.enemy2);
        

        //add event trigger
        this.trigger = this.physics.add.sprite(475, 675, 'threat').setOrigin(0).setScale(0.5);
        this.trigger.body.immovable = true;
        this.trigger.body.allowGravity = false;

        // add guide
        this.guide = this.physics.add.sprite(150, 450, 'enemy').setOrigin(0); //using guide sprite instead of prefab for now unless prefab is needed
        this.guide.body.immovable = true;
        this.guide.body.allowGravity = false;

        // add threat box for range where enemies become alerted. Check if it is a torch or not
        if (hasTorch == false){
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'threat').setOrigin(0.5).setScale(0.9);
        } else {
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'torch_light').setOrigin(0.5);
            this.threat.body.setCircle(200);
        }

        // add physics colliders between player, enemies, and walls
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.walls);
        this.physics.add.collider(this.enemies, this.enemies);

        // add physics overlap to detect player and threat overlapping with enemies or interactables or guide
        this.physics.add.overlap(this.player, this.enemies, ()=> { this.scene.start('gameOverScene'); }); // check if player is hit by enemy and game over if they do
        this.physics.add.overlap(this.threat, this.enemies, this.alerting); // check if player detection range collides with enemy and alert enemy
        this.physics.add.overlap(this.threat, this.guide, this.startTalking); // make guide start talking if player is close enough
        this.physics.add.overlap(this.player, this.crumbling, this.crumble);
        this.physics.add.overlap(this.player, this.trigger, this.spawnEnemies);
        this.physics.add.overlap(this.threat, this.shine, this.glowEyes);

        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        // animation configs (if we end up using any)

        // Add guide dialogue into an array by sentence
        currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
        totalText = 8; // Total sentences spoken by guide in this scene
        textArray = [" ", "Hello again.⇨", "Be careful ahead...➤", "The lower bridge has an ambush.➤", "you wouldn't want that.➤", "Take the top bridge instead.➤", "I promise it'll hold.➤", "Heh heh heh heh...", " "]
        talking = false;
        talking2 = false;
        // Display current sentence and advance to next sentence
        guideText = this.add.text(this.guide.x - 75, this.guide.y - 25, textArray[currText++], textConfig).setOrigin(0, 0.5);
        //guide audio
        voice = this.sound.add('voice', {volume: 0.5});

        // Add exit zone
        this.exitZone = this.physics.add.sprite(925, 450, 'wall').setOrigin(0);
        this.physics.add.overlap(this.player, this.exitZone, ()=> { this.scene.start('roomScene03'); }); // check if player collides with exit to next room

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
        if (eventCheck == true){ //if enemies have spawned
            this.enemy1.update(this.player);
            this.enemy2.update(this.player);
        }

        this.threat.update(this.player); //passing player into threat so it can follow the player


        // check if player collides with exit to next room
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
        if (eventCheck == true && talking2 == false){ //after enemies spawn
            currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
            totalText = 1;
            textArray = ["I tried to warn you."," "]
            guideText.text = textArray[currText++]; //say the first line after " "
            talking2 = true;
            voice.play();
        }

    }
    spawnEnemies() {
        if (eventCheck == false){ //so it doesnt repeat
            eventCheck = true;
            currentScene.enemy1.y = 650;
            currentScene.enemy2.y = 750;
            console.log('check second'); 
            if (hasTorch == true){ //stop eyes glowing
                console.log('check last');
                currentScene.shine1.destroy(); //setTexture('threat').setScale(0.2);
                currentScene.shine2.destroy(); //setTexture('threat').setScale(0.2);
            } 
        }
    }
    crumble(){
        // play cracking if it isnt already
        if (sfx.isPlaying == false){
            sfx.play();
        }
        // Pause particle emitter and make particles invisible when off the bridge
        if (currentScene.player.x < 275 || currentScene.player.x > 575 ) {
            currentScene.particles.pause();
            currentScene.particles.visible = false;
        } else { // If player is on the bridge, resume particle emitter
            currentScene.particles.x = currentScene.player.x + 25;
            currentScene.particles.resume();
            currentScene.particles.visible = true; 
        }
        
    }
    glowEyes(threat, shine){ //eyes glow from torch light
        if (hasTorch == true){
            console.log('check first');
            shine.setTexture('eyes').setScale(1);
        }
    }
}