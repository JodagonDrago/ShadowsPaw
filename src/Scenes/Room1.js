class Play extends Phaser.Scene{
    constructor(){
        super("room1Scene");
    }

    preload() {
        // load images/tile sprites

        // load spritesheet
        
    }

    create(){
        // place map sprite
     
        // place wall sprites

        // add player at map enterance

        // add enemys

        // add physics colliders between player, enemies, and walls

        // define keys
        
        // animation configs

    }

    update() {
        // check keyboard input for movement

        // check if player detection range collides with enemy and alert enemy

        // check if player is hit by enemy

        // make guide start talking if player is close enough

        // check if player touches torch and equip it
        // this should increase the detection range and lower enemy movespeed

        // check if player collides with exit to next room
        // go to that scene if so
    }

}