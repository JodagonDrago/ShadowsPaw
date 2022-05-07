class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        
    }

    create(){
        // add menu image
        this.add.text(game.config.width/2, game.config.height/2, 'TRUSTING SHADOWS').setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press SPACE').setOrigin(0.5);

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');
    
    }

    update() {
        // Start game when Space Bar is pushed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('roomScene01');
        }
        
      }
}