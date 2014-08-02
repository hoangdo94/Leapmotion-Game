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
		game.load.spritesheet('playerSprite', 'asset/image/shipAnimation.png', 115, 69, 8);
		//load audios
		//game.load.audio('music', 'asset/sound/music.wav');
	},
	create: function () {
		game.state.start('menu');
	}
};
