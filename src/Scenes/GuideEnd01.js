class GuideEnd01 extends Phaser.Scene{
    constructor(){
        super("roomSceneGuide01"); // Follow naming convention for future rooms
        this.exitsPos = [450]; // X positions of exits and enterance
    }

    preload() {
        this.load.image('red', './assets/Red Overlay.png')
    }

    create() {

        // Place map sprite
        console.log('guide hall room started');
        this.map1 = this.add.tileSprite(400, 0, 150, 900, 'map').setOrigin(0, 0); //verticle hall

        this.walls = this.add.group();

        // make hallway
        for(let i = 0; i < game.config.height; i += tileSize) { //Left wall
            let wallTile = this.physics.add.sprite(400, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        for(let i = 0; i < game.config.height; i += tileSize) { //Left wall
            let wallTile = this.physics.add.sprite(500, i, 'wall').setOrigin(0);
            wallTile.body.immovable = true;
            wallTile.body.allowGravity = false;
            this.walls.add(wallTile);
        }
        // no backtracking wall
        let hiddenTile = this.physics.add.sprite(450, 950, 'wall').setOrigin(0); //behind enterance
        hiddenTile.body.immovable = true;
        hiddenTile.body.allowGravity = false;
        this.walls.add(hiddenTile);

        // Add player
        this.player = new Player(this, 450, 850, 'player').setOrigin(0);
        this.physics.add.existing(this.player);

        // add threat box for range where enemies become alerted. Check if it is a torch or not
        if (hasTorch == false){
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'threat').setOrigin(0.5);
        } else {
            this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'torch_light').setOrigin(0.5);
        }
        
        //make red overlay
        this.redOverlay = this.add.sprite(50, 0, 'red').setOrigin(0).setScale(20);

        // add physics colliders between player, enemies, and walls
        this.physics.add.collider(this.player, this.walls);

        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Add exit zones
        this.exitZone = this.physics.add.sprite(450, -75, 'wall').setOrigin(0);
        this.physics.add.overlap(this.player, this.exitZone, ()=> { this.scene.start('roomSceneGuide02'); }); // check if player collides with trap exit

        // testing = true;
    }

    update() {

        //update prefabs
        this.player.update();

        // Update threat range
        this.threat.update(this.player);
    }
}