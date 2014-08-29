var h = window.innerHeight;
var w = window.innerWidth;
var playing = true;
var pause = false;
var controllerType;
var game = new Phaser.Game(w, h, Phaser.CANVAS, 'gameContainer');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('end', endState);

game.state.start('boot');