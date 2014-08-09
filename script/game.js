window.onload=function(){
	screenfull.request();
};

var h = window.innerHeight;
var w = window.innerWidth;
var playing = true;

var game = new Phaser.Game(w, h, Phaser.CANVAS, 'gameContainer');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');