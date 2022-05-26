// Game: Trusting Shadows
// Contributors: Aaron Gonzales, Joseph Squires, Syvan Novom
// Concept: A top down puzzle-solving game where a mysterious guide offers dubious advice

// Global Variables
let cursors;
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keySPACE; // Input keys
let threat;
let music;
const tileSize = 50;
var enemySpeed = 90; //higher is faster
var playerSpeed = 500; //lower is faster
var hasTorch = false;

//Global dialogue variables
var currText; // Current sentence to display
var totalText; // Total sentences spoken by guide in this scene
var talking;
var talking2; //second dialogue after choice
var textArray;
let guideText;
let tutorialText;

//effect controllers
let eventCheck = false; //checker for events
let currentScene;
let hasKey; //the key!

//audio variables need to be global to execute in functions
let voice;
let pickupSound;
let sfx;
let isBleeding;

// Set up config file
let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },

    scene: [Menu, Room01, Room02, Room03, RoomFinal, GameOver]
}

// Instantiate text config for dialogue
let textConfig = {
    fontFamily: 'Courier',
    fontSize: '20px',
    align: 'left',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}

let game = new Phaser.Game(config)

// Reserve variables that will pass from scene to scene and change
// such as detection range and movespeed

// Start menu scene
game.scene.start('menuScene');