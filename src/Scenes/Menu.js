class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('music', './assets/Closing-In_Looping.mp3');
        this.load.audio('voice', './assets/Guide Voice.wav');
        this.load.audio('pickup', './assets/Pickup.wav');
        this.load.audio('alert', './assets/Alert.wav');

        // load sprites that will appear in many rooms
        this.load.image('map', './assets/Room.png');
        this.load.image('player', './assets/Player.png');
        this.load.image('threat', './assets/Threat.png');
        this.load.image('enemy', './assets/Enemy and Guide.png');
        this.load.image('enemy_calm', './assets/Enemy Calm.png');
        this.load.image('wall', './assets/Wall.png');
        this.load.image('wall_half', './assets/Wall Seethrough.png');
        this.load.image('torch_light', './assets/Torchlight.png');
        this.load.image('blood', './assets/Blood.png');
        this.load.image('title', './assets/Title.png');
        this.load.image('rocks', './assets/Rocks.png');

        // load spritesheet
        
    }

    create(){
        // add menu image
        this.map = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'title').setOrigin(0, 0);
        this.title = this.add.text(game.config.width/2, game.config.height/1.5, ' ').setOrigin(0.5);
        this.prompt = this.add.text(game.config.width/2, game.config.height/1.5 + 100, 'PRESS [SPACE] TO START').setOrigin(0.5);

        //ensure player doesnt start with variables from previous runs
        hasKey = false;
        playerSpeed = 500;
        hasTorch = false;

        eventCheck = false; //ensure player cant hit space repeatedly

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        //get some music going
        this.game.sound.stopAll();
        music = this.sound.add('music', {volume: 0.5});
        music.setLoop(true);
        music.play();
    
    }

    update() {
        // Start game when Space Bar is pushed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            if (eventCheck == false) {
                this.prompt.text = "PRESS [SPACE] TO ADVANCE DIALOGUE WHEN YOU SEE ➤"
                this.title.text = "USE ARROW KEYS TO MOVE"
                eventCheck = true;
                console.log(eventCheck);
            } else if (eventCheck == true) {
                console.log(eventCheck);
                this.scene.start('roomScene01');
            }
        }
      }
}