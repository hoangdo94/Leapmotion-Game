var bootState = {
	preload: function () {
		game.stage.backgroundColor = '#2c3e50';
		game.load.image('loading', 'asset/image/loading.png');
		game.load.image('loading2', 'asset/image/loading2.png');
	},
	create: function() {
		this.game.state.start('load');
	}
};


var loadState = {
	preload: function () {
	    label2 = game.add.text(Math.floor(w/2)+0.5, Math.floor(h/2)-15+0.5, 'loading...', { font: '30px Arial', fill: '#fff' });
		label2.anchor.setTo(0.5, 0.5);

		preloading2 = game.add.sprite(w/2, h/2+15, 'loading2');
		preloading2.x -= preloading2.width/2;
		preloading = game.add.sprite(w/2, h/2+19, 'loading');
		preloading.x -= preloading.width/2;
		game.load.setPreloadSprite(preloading);
		
		//load images
		game.load.image('bg', 'asset/image/bg.jpg');
		game.load.spritesheet('player', 'asset/image/playerspritesheet.png', 112, 75, 2);
		game.load.image('laser', 'asset/image/laser.png');
		game.load.image('rocket', 'asset/image/rocket.png');
		game.load.image('enemy1', 'asset/image/enemy1.png');
		game.load.image('enemy2', 'asset/image/enemy2.png');
		game.load.image('enemy3', 'asset/image/enemy3.png');
		game.load.image('enemy4', 'asset/image/enemy4.png');
		game.load.image('enemy5', 'asset/image/enemy5.png');
		game.load.image('mainPowerup', 'asset/image/mainPowerup.png');
		game.load.image('subPowerup', 'asset/image/subPowerup.png');
		game.load.spritesheet('bulletHit', 'asset/image/bulletbitspritesheet.png', 20, 20, 10);
		game.load.spritesheet('explose', 'asset/image/explosion.png',133.5, 134, 12);
		game.load.spritesheet('glow', 'asset/image/glow.png',200, 200, 18);
		//load audios
		//game.load.audio('music', 'asset/sound/music.wav');
	},
	create: function () {
		game.state.start('menu');
	}
};
