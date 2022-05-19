class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload() {
        // load game over audio
        this.load.audio('dead', './assets/Death.wav');

        // load game over image
        
    }

    create(){
        // add menu image
        this.add.text(game.config.width/2, game.config.height/2, 'You have died').setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press SPACE to return to the menu').setOrigin(0.5);

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        //reset game parameters
        hasTorch = false;

        //get some sad music going
        this.game.sound.stopAll();
        this.scream = this.sound.add('dead', {volume: 0.5});
        this.scream.play();
    
    }

    update() {
        // Start game when Space Bar is pushed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
        
      }
}