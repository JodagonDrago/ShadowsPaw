class GameOver2 extends Phaser.Scene{
    constructor(){
        super("gameOverScene2");
    }

    preload() {
        // load game over audio
        this.load.audio('squish', './assets/Squish.wav');

        // load game over image
        
    }

    create(){
        // add menu image
        this.add.text(game.config.width/2, game.config.height/2, 'You have died').setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press SPACE to return to the menu').setOrigin(0.5);

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        //get some sad music going
        this.game.sound.stopAll();
        this.scream = this.sound.add('squish', {volume: 0.3});
        this.scream.play();
    
    }

    update() {
        // Start game when Space Bar is pushed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
        
      }
}