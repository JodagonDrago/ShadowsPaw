class Room01 extends Phaser.Scene{
    constructor(){
        super("roomScene01"); // Follow naming convention for future rooms
    }

    preload() {
        // load images/tile sprites

        // load spritesheet
        
    }

    create(){
        // Set background color (this is for testing)
        console.log('room 1 started');
        this.cameras.main.setBackgroundColor('#6a717d');

        // place map sprite
     
        // place wall sprites

        // add player at map enterance

        // add enemys

        // add physics colliders between player, enemies, and walls

        // Set up cursor-key input for directional movement
        cursors = this.input.keyboard.createCursorKeys();

        // Define keys that aren't for movement
        keySPACE = this.input.keyboard.addKey('SPACE');

        // animation configs

    }

    update() {
        // Check keyboard input for directional movement
        if (cursors.left.isDown) {
            console.log('Left pushed');

        } else if (cursors.right.isDown) {
            console.log('Right pushed');

        } else if (cursors.up.isDown) {
            console.log('Up pushed');

        } else if (cursors.down.isDown) {
            console.log('Down pushed');
        }

        // Check keyboard for space key input (This can be used for interacting with objects)
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log('space');
        }

        // check if player detection range collides with enemy and alert enemy

        // check if player is hit by enemy

        // make guide start talking if player is close enough

        // check if player touches torch and equip it
        // this should increase the detection range and lower enemy movespeed

        // check if player collides with exit to next room
        // go to that scene if so
    }

}