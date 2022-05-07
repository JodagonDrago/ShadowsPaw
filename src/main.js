let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Room1]
}
let game = new Phaser.Game(config)

// reserve keyboard vars 
// (may have interact keys eventually, unless walking into things interacts with them)
let keyUP, keyDOWN, keyLEFT, keyRIGHT;

// reserve variables that will pass from scene to scene and change
// such as detection range and movespeed