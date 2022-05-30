class Escape extends Phaser.Scene{
    constructor(){
        super("escapeScene");
    }

    preload() {
        // load escape audio
        this.load.audio('birds', './assets/Birds.wav');

        // load escape image
        this.load.image('exit', './assets/Exit.png');
    }

    create(){
        // add exit image
        this.map = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'exit').setOrigin(0, 0);

        //add exit message
        var message = [
            "The exit to the ruins stretches wide behind you as you step onto soft grass.",
            "The shadows which hunted you within do not follow you out into the sunlight,",
            "including that shadow which spoke to you along the way.",
            "",
            "Where they came from, and why one of them chose to speak to you, you don't know,",
            "But you know you're safe from them now.",
            "Finally."
        ]
        this.add.text(game.config.width/2, game.config.height - 175, message).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height - 50, 'Press [SPACE] to return to the menu.').setOrigin(0.5);

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        //get some happy music going
        this.game.sound.stopAll();
        this.birds = this.sound.add('birds', {volume: 0.5});
        this.birds.setLoop(true);
        this.birds.play();
    
    }

    update() {
        // Start game when Space Bar is pushed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
        
      }
}