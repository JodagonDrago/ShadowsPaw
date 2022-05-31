class Room03 extends Phaser.Scene{
    constructor(){
        super("roomScene03"); // Follow naming convention for future rooms
        this.exitsPos = [750]; // Y positions of exits across right wall
        this.entrancePos = [750]; // Y positions of exits across right wall
    }

    preload() {
        // load images/tile sprites specific to this room
        this.load.image('spikes off', './assets/Spikes Off.png');
        this.load.image('spikes on', './assets/Spikes On.png');
        this.load.audio('spikes', './assets/Spikes.wav');
        
    }

    create(){
        //reset global variables
        console.log('room 3 started');
        currentScene = this;
        eventCheck = false;
        talking = false;
        talking2 = false;
        isBleeding = false;

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
        
        //spike walls
        for(let i = 200; i < 750; i += tileSize) { //bottom spike wall
            let wallTile = this.physics.add.sprite(i, 800, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 200; i < 750; i += tileSize) { //top spike wall
            let wallTile = this.physics.add.sprite(i, 700, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        //guide box
        for(let i = 650; i < 750; i += tileSize) { //left wall
            let wallTile = this.physics.add.sprite(200, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 650; i < 750; i += tileSize) { //right wall
            let wallTile = this.physics.add.sprite(700, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 150; i < 750; i += tileSize) { //roof
            let wallTile = this.physics.add.sprite(i, 600, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        //den
        for(let i = 50; i < 100; i += tileSize) { //left wall
            let wallTile = this.physics.add.sprite(i, 600, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 100; i < 600; i += tileSize) { //right wall
            let wallTile = this.physics.add.sprite(700, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 300; i += tileSize) { //first room top
            let wallTile = this.physics.add.sprite(i, 350, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 450; i < 550; i += tileSize) { //first room right
            let wallTile = this.physics.add.sprite(250, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 400; i < 500; i += tileSize) { //second room bot
            let wallTile = this.physics.add.sprite(i, 500, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 300; i < 350; i += tileSize) { //tetris arm
            let wallTile = this.physics.add.sprite(i, 450, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 350; i < 400; i += tileSize) { //lone block in mid
            let wallTile = this.physics.add.sprite(i, 350, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 350; i < 400; i += tileSize) { //lone block above that block
            let wallTile = this.physics.add.sprite(i, 250, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 300; i < 450; i += tileSize) { //wall with monster on right
            let wallTile = this.physics.add.sprite(450, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 200; i += tileSize) { //wall coming from top
            let wallTile = this.physics.add.sprite(300, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 400; i < 600; i += tileSize) { //wall under top monster
            let wallTile = this.physics.add.sprite(i, 100, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 600; i < 650; i += tileSize) { //wall hanging to its right
            let wallTile = this.physics.add.sprite(i, 150, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 600; i < 700; i += tileSize) { //wall sticking from right
            let wallTile = this.physics.add.sprite(i, 400, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 150; i < 200; i += tileSize) { //decorative wall in top left
            let wallTile = this.physics.add.sprite(i, 150, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        //
        //
        // all walls done

        // add room specific interactable items
        // add spikes
        this.spikes = this.physics.add.sprite(400, 750, 'spikes off').setOrigin(0);
        this.spikes.body.setCircle(5, 25, 25);
        this.spikes.body.immovable = true;
        this.spikes.body.allowGravity = false;

        // add spike sound and visuals from getting hurt
        sfx = this.sound.add('spikes', {volume: 0.5});

        // Add camera for damage effect
        this.shakeCamera = this.cameras.add(0, 0, 900, 900);

        // add player at map enterance
        this.player = new Player(this, 0, 750, 'player').setOrigin(0);
        this.physics.add.existing(this.player);

        // add enemies
        // make the enemys group
        this.enemies = this.add.group();
        
        this.enemy1 = new Enemy(this, 50, 300, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy1);
        this.enemies.add(this.enemy1);
        this.enemy2 = new Enemy(this, 450, 550, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy2);
        this.enemies.add(this.enemy2);
        this.enemy3 = new Enemy(this, 150, 250, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy3);
        this.enemies.add(this.enemy3);
        this.enemy4 = new Enemy(this, 500, 350, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy4);
        this.enemies.add(this.enemy4);
        this.enemy5 = new Enemy(this, 250, 50, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy5);
        this.enemies.add(this.enemy5);
        this.enemy6 = new Enemy(this, 500, 50, 'enemy_calm').setOrigin(0);
        this.physics.add.existing(this.enemy6);
        this.enemies.add(this.enemy6);

        // add guide
        this.guide = this.physics.add.sprite(250, 650, 'enemy').setOrigin(0); //using guide sprite instead of prefab for now unless prefab is needed
        this.guide.body.setSize(80, 80, true);
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
        // this.physics.add.collider(this.enemies, this.enemies); //makes them push each other through walls

        // add physics overlap to detect player and threat overlapping with enemies or interactables or guide
        this.physics.add.overlap(this.player, this.enemies, ()=> { this.scene.start('gameOverScene'); }); // check if player is hit by enemy and game over if they do
        this.physics.add.overlap(this.threat, this.enemies, this.alerting); // check if player detection range collides with enemy and alert enemy
        this.physics.add.overlap(this.threat, this.guide, this.startTalking); // make guide start talking if player is close enough
        this.physics.add.overlap(this.player, this.spikes, this.spikeTrap); //spikes go off

        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        // animation configs (if we end up using any)

        // Add guide dialogue into an array by sentence
        currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
        totalText = 10; // Total sentences spoken by guide in this scene
        textArray = [" ", "See? I'm your friend. Heh heh heh.➤", "And I want to help you escape.➤", "You just have to trust me. Afterall...➤", "I'm more familiar with this place than you.➤", "Take the spike trap ahead for instance,➤", "It's old, and doesnt work propperly anymore.➤", "You can cross it and it wont kill you.➤", "Far safer than going through the den up North.➤", "Trust me.", " "]
        // Display current sentence and advance to next sentence
        guideText = this.add.text(this.guide.x - 75, this.guide.y - 25, textArray[currText++], textConfig).setOrigin(0, 0.5);
        //guide audio
        voice = this.sound.add('voice', {volume: 0.3});

        // Add exit zone
        this.exitZone = this.physics.add.sprite(925, 750, 'wall').setOrigin(0);
        this.physics.add.overlap(this.player, this.exitZone, ()=> { this.scene.start('roomScene04'); }); // check if player collides with exit to next room

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
        this.enemy3.update(this.player);
        this.enemy4.update(this.player);
        this.enemy5.update(this.player);
        this.enemy6.update(this.player);

        this.threat.update(this.player); //passing player into threat so it can follow the player

        // Update blood particles
        if (isBleeding) {
            this.player.blood.x = this.player.x + 20; // Offset by 20 so it is aligned to player
            this.player.blood.y = this.player.y + 50; // Offset by ten so it appears at feet of player
        }


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
            totalText = 4;
            textArray = ["See? I told you it wouldn't kill you.➤", "A little pain never killed anybody.➤", "And you can heal later.➤", "Heh heh heh heh...", " "]
            guideText.text = textArray[currText++]; //say the first line after " "
            talking2 = true;
            voice.play();
        }

    }
    spikeTrap(player, spikes) {
        if (eventCheck == false){ //so it doesnt repeat
            eventCheck = true;
            spikes.setTexture('spikes on');
            sfx.play();
            playerSpeed = 800;
        }

        // Start blood particles and play dmg effect
        if (!isBleeding) {
           currentScene.shakeCamera.shake(700, 0.025);
           currentScene.shakeCamera.flash(150, 255, 0, 0); 
        }
        isBleeding = true;
        player.blood.resume();
        
    }

}