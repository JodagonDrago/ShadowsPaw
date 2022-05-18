class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload() {
        // load game over audio
        

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
        music = this.sound.add('music', {volume: 0.5});
        music.setLoop(true);
        music.play();
    
    }

    update() {
        // Start game when Space Bar is pushed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
        
      }
}