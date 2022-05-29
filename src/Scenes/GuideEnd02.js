class GuideEnd02 extends Phaser.Scene{
    constructor(){
        super("roomSceneGuide02"); // Follow naming convention for future rooms
    }

    preload() {
        this.load.image('red', './assets/Red Overlay.png')
    }

    create() {

        // Place map sprite
        console.log('guide hall final room started');
        currentScene = this;
        eventCheck = false;
        talking = false;
        talking2 = false;

        this.map1 = this.add.tileSprite(300, 600, 350, 350, 'map').setOrigin(0, 0); //verticle hall

        this.walls = this.add.group();

        // make box
        for(let i = 600; i < game.config.height; i += tileSize) { //Left wall
            let wallTile = this.physics.add.sprite(300, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 600; i < game.config.height; i += tileSize) { //Left wall
            let wallTile = this.physics.add.sprite(600, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 350; i < 600; i += tileSize) { //Roof
            let wallTile = this.physics.add.sprite(i, 600, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 350; i < 600; i += tileSize) { //Floor
            if (i != 450){
                let wallTile = this.physics.add.sprite(i, 850, 'wall').setOrigin(0);
                wallTile.body.immovable = true;
                wallTile.body.allowGravity = false;
                this.walls.add(wallTile);
            }
        }

        // Add player
        this.player = new Player(this, 450, 850, 'player').setOrigin(0);
        this.physics.add.existing(this.player);

        // add threat box for range where enemies become alerted. Check if it is a torch or not
        if (hasTorch == false){
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'threat').setOrigin(0.5);
        } else {
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'torch_light').setOrigin(0.5);
        }

        // add guide
        this.guide = this.physics.add.sprite(450, 700, 'enemy').setOrigin(0); //using guide sprite instead of prefab for now unless prefab is needed
        this.guide.body.immovable = true;
        this.guide.body.allowGravity = false;
        
        //make red overlay
        this.redOverlay = this.add.sprite(50, 0, 'red').setOrigin(0).setScale(20);

        // add physics colliders between player, enemies, and walls
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.overlap(this.threat, this.guide, this.startTalking); // make guide start talking if player is close enough
        this.physics.add.overlap(this.player, this.guide, ()=> { this.scene.start('gameOverScene'); }); // check if player collides with trap exit

        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Add guide dialogue into an array by sentence
        currText = 0; // Current sentence to display, starts above total so dialogue doesnt appear until collision
        totalText = 2; // Total sentences spoken by guide in this scene
        textArray = [" ", "Finally.", " "]
        // Display current sentence and advance to next sentence
        guideText = this.add.text(this.guide.x + 25, this.guide.y - 25, textArray[currText++], textConfig).setOrigin(0, 0.5);
        //guide audio
        voice = this.sound.add('voice', {volume: 0.3});

        // Add exit zones
        this.exitZone = this.physics.add.sprite(450, -75, 'wall').setOrigin(0);
        this.physics.add.overlap(this.player, this.exitZone, ()=> { this.scene.start('gameOverScene'); }); // check if player collides with trap exit

        // testing = true;
    }

    update() {

        //update prefabs
        this.player.update();

        // Update threat range
        this.threat.update(this.player);

        if (eventCheck){
            currentScene.physics.moveToObject(this.guide, this.player, 300);
        }
    }

    startTalking() {
        if (talking == false){ //so it doesnt repeat
            guideText.text = textArray[currText++]; //say the first line after " "
            talking = true;
            voice.play();
            currentScene.time.delayedCall(1200, () => {
                eventCheck = true;
                guideText.text = textArray[currText++]; //finish sentence
            }, null, this);
        }
    }
}