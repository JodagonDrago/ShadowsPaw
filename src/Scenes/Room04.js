class Room04 extends Phaser.Scene {
    constructor(){
        super("roomScene04"); // Follow naming convention for future rooms
        this.exitsPos = [100]; // Y positions of exits across right wall
        this.entrancePos = [750]; // Y positions of exits across right wall
        this.rockFalling = false;
    }

    preload() {
        // load images/tile sprites specific to this room
        this.load.audio('cracking', './assets/Cracking.wav');
        this.load.image('rock', './assets/Rock.png');
        this.load.image('button', './assets/Button.png');
    }

    create() {
        currentScene = this;
        // Add camera for damage effect
        this.shakeCamera = this.cameras.add(0, 0, 900, 900);

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
        // Add blocked off section for guide
        for(let i = 50; i < 200; i += tileSize) { // Top segment
            let wallTile = this.physics.add.sprite(i, 600, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 200; i += tileSize) { // Bottom segment
            let wallTile = this.physics.add.sprite(i, 700, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 150; i < 200; i += tileSize) { // Connect segments
            let wallTile = this.physics.add.sprite(i, 650, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        // Fill gap above guide enclosure
        for(let i = 50; i < 600; i += tileSize) {
            let wallTile = this.physics.add.sprite(50, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 600; i += tileSize) {
            let wallTile = this.physics.add.sprite(100, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 50; i < 600; i += tileSize) {
            let wallTile = this.physics.add.sprite(150, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }

        // add guide
        this.guide = this.physics.add.sprite(100, 650, 'enemy').setOrigin(0); //using guide sprite instead of prefab for now unless prefab is needed
        this.guide.body.immovable = true;
        this.guide.body.allowGravity = false;

        // add player at map entrance
        this.player = new Player(this, 0, 750, 'player').setOrigin(0);
        this.physics.add.existing(this.player);
        this.player.setDepth(2); // Have player appear above button. This is unique to this situation

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

        this.physics.add.overlap(this.threat, this.guide, this.startTalking); // make guide start talking if player is close enough

        // Add guide dialogue into an array by sentence
        currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
        totalText = 5; // Total sentences spoken by guide in this scene
        textArray = [" ", "I bet you're confused...➤", "Try stepping on that switch.➤", "It will keep you safe from an enemy in the room ahead.➤", "Doesn't that sound helpful?", " "]
        talking = false;
        talking2 = false;
        // Display current sentence and advance to next sentence
        guideText = this.add.text(this.guide.x - 75, this.guide.y - 25, textArray[currText++], textConfig).setOrigin(0, 0.5);
        //guide audio
        voice = this.sound.add('voice', {volume: 0.5});

        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        // Add collision for walls and player
        this.physics.add.collider(this.player, this.walls);

        //Add collision group for falling rocks
        this.rocks = this.add.group();
        this.physics.add.overlap(this.player, this.rocks, ()=> { this.scene.start('gameOverScene'); });

        // Add button that will trigger rocks
        this.button = this.physics.add.sprite(100, 800, 'button').setOrigin(0);
        this.button.setDepth(1); // Have button appear beneath player
        this.physics.add.overlap(this.player, this.button, this.pressButton);
        this.click = this.sound.add('cracking', {volume: 2.5});

        // Add exit zone
        this.exitZone = this.physics.add.sprite(925, 100, 'wall').setOrigin(0);
        this.physics.add.overlap(this.player, this.exitZone, ()=> { this.scene.start('roomScene05'); }); // check if player collides with exit to next room
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

        this.player.update();
        this.threat.update(this.player); //passing player into threat so it can follow the player

        // Update blood particles
        if (isBleeding) {
            this.player.blood.x = this.player.x + 20; // Offset by 20 so it is aligned to player
            this.player.blood.y = this.player.y + 50; // Offset by ten so it appears at feet of player
        }

        if (this.rockFalling) {
           this.rock.update();
           this.rock2.update(); 
           this.rock3.update();
           this.rock4.update();
        }
    }

    dropRock() {
        // Set initial position of first rock
        let X = Phaser.Math.Between(200, 800);
        let Y = currentScene.player.y

        // Add rocks in randomized locations
        this.rock = new Rock(currentScene, X, -10, 'rock', Y, this.rocks);

        X = Phaser.Math.Between(200, 800);
        this.rock2 = new Rock(currentScene, X, -10, 'rock', Y - 50, this.rocks);

        X = Phaser.Math.Between(200, 800);
        this.rock3 = new Rock(currentScene, X, -10, 'rock', Y - 100, this.rocks);

        X = Phaser.Math.Between(200, 800);
        this.rock4 = new Rock(currentScene, X, -10, 'rock', Y + 50, this.rocks);

        // Drop them rocks babyyy!
        this.rock.drop();
        this.rock2.drop();
        this.rock3.drop();
        this.rock4.drop();

        // Drop some more
        this.time.delayedCall(2200, this.dropRock, [], this);
    }

    startTalking() {
        if (talking == false){ //so it doesnt repeat
            guideText.text = textArray[currText++]; //say the first line after " "
            talking = true;
            voice.play();
        }
        if (currentScene.rockFalling == true && talking2 == false){ //after rocks begin to fall
            currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
            totalText = 2;
            textArray = ["Hm. It appears that may have caused some...➤", "Instability.➤", " "]
            guideText.text = textArray[currText++]; //say the first line after " "
            talking2 = true;
            voice.play();
        }
    }

    pressButton() {
        // Toggle global rock variable
        rockFall = true;
        // Shake camera
        if (!currentScene.rockFalling){
            // Shake camera
            currentScene.shakeCamera.shake(700, 0.025);

            // Toggle event check
            currentScene.rockFalling = true;
            currentScene.dropRock();

            // Play sound effect
            currentScene.click.play();
        }
    }
}