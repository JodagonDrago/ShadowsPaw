// Game: Trusting Shadows
// Contributors: Aaron Gonzales, Joseph Squires, Syvan Novom
// Concept: A top down puzzle-solving game where a mysterious guide offers dubious advice

// Global Variables
let cursors;
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keySPACE; // Input keys
let threat;
const tileSize = 50;
var enemySpeed = 80;
var moveTime = 500;
var hasTorch = false;

// Set up config file
let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Room01]
}

let game = new Phaser.Game(config)

// Reserve variables that will pass from scene to scene and change
// such as detection range and movespeed

// Start menu scene
game.scene.start('Menu');