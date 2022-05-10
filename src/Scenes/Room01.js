class Room01 extends Phaser.Scene{
    constructor(){
        super("roomScene01"); // Follow naming convention for future rooms
    }

    preload() {
        // load images/tile sprites specific to this room
        this.load.image('torch', './assets/Torch.png');
        
    }

    create(){
        // Set background color (this is for testing)
        console.log('room 1 started');
        // this.cameras.main.setBackgroundColor('#6a717d');

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

        // add player at map enterance
        //this.player = this.physics.add.sprite(100, 750, 'player').setOrigin(0);
        this.player = new Player(this, 100, 750, 'player').setOrigin(0);
        //this.add.existing(this.player);
        this.physics.add.existing(this.player);

        // add enemys
        // make the enemys group
        this.enemies = this.add.group();
        this.enemy1 = new Enemy(this, 200, 550, 'enemy_calm').setOrigin(0);
        this.enemies.add(this.enemy1);
        this.enemy2 = new Enemy(this, 650, 50, 'enemy_calm').setOrigin(0);
        this.enemies.add(this.enemy2);

        // add guide
        this.guide = this.physics.add.sprite(300, 250, 'enemy').setOrigin(0); //using guide sprite instead of prefab for now unless prefab is needed
        this.guide.body.immovable = true;
        this.guide.body.allowGravity = false;

        // add threat box for range where enemies become alerted. (in later rooms, check to see if player has torch and add torch instead of threat if they do)
        this.threat = new Threat(this, this.player.x + tileSize/2, this.player.y + tileSize/2, 'threat').setOrigin(0.5);

        // add physics colliders between player, enemies, and walls
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.walls);

        // add physics overlap to detect player and threat overlapping with enemies or interactables or guide
        this.physics.add.overlap(this.player, this.enemys);
        this.physics.add.overlap(this.threat, this.enemys);
        this.physics.add.overlap(this.player, this.torchTile);
        this.physics.add.overlap(this.threat, this.guide);
        // ^ these are not quite done. need to look more into how overlap works so that things happen when an overlap occurs

        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        // animation configs (if we end up using any)

    }

    update() {

        // Check keyboard for space key input (This can be used for interacting with objects, or progressing guide text)
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log('space');
        }

        //update prefabs
        this.player.update();
        this.enemy1.update();
        this.enemy2.update();
        this.threat.update(this.player); //passing player into threat so it can follow the player


        // check if player detection range collides with enemy and alert enemy

        // check if player is hit by enemy and game over if they do

        // make guide start talking if player is close enough
        // and make guide text progress with space bar

        // check if player touches torch and equip it
        // this should increase the detection range and lower enemy movespeed

        // check if player collides with exit to next room
        // go to that scene if so
    }

    /*
    test(){
        console.log('collision');
    }
    */
}