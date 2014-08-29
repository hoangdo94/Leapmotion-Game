var bootState = {
	preload: function () {
		game.stage.backgroundColor = '#000';
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
		game.load.image('planet1', 'asset/image/planet1.png');
		game.load.image('planet2', 'asset/image/planet2.png');
		game.load.image('planet3', 'asset/image/planet3.png');
		game.load.image('planet4', 'asset/image/planet4.png');

		game.load.spritesheet('player', 'asset/image/player.png', 112, 75, 3);
		game.load.spritesheet('number', 'asset/image/number.png', 19, 19, 11);
		game.load.spritesheet('hpbar', 'asset/image/hpbar.png', 10, 10, 2);
		game.load.image('playerIcon', 'asset/image/playericon.png');
		game.load.image('laser', 'asset/image/laser.png');
		game.load.image('enemylaserchase', 'asset/image/enemybullet.png');
		game.load.image('enemylaserunchase', 'asset/image/enemylaserunchase.png');
		game.load.image('star', 'asset/image/star.png');
		game.load.image('homingbullet', 'asset/image/rocket.png');
		game.load.image('superbullet', 'asset/image/superbullet.png');
		game.load.image('spraybullet', 'asset/image/spraybullet.png');
		game.load.spritesheet('enemy1', 'asset/image/enemy1.png',93, 84, 2);
		game.load.spritesheet('enemy2', 'asset/image/enemy2.png', 104, 84, 2);
		game.load.spritesheet('enemy3', 'asset/image/enemy3.png', 103, 84, 2);
		game.load.spritesheet('enemy4', 'asset/image/enemy4.png', 82, 83, 2);
		game.load.spritesheet('enemy5', 'asset/image/enemy5.png', 97, 84, 2);
		game.load.image('mainPowerup', 'asset/image/mainpowerup.png');
		game.load.image('subPowerup', 'asset/image/subpowerup.png');
		game.load.spritesheet('bulletHit', 'asset/image/bulletbitspritesheet.png', 20, 20, 10);
		game.load.spritesheet('explose', 'asset/image/explosion.png',133.5, 134, 12);
		game.load.spritesheet('glow', 'asset/image/glow.png',200, 200, 18);
		game.load.spritesheet('starnum', 'asset/image/starNum.png',40, 40, 2);
		game.load.spritesheet('boss1', 'asset/image/boss.png', 400, 400, 2);
		game.load.spritesheet('bossheart', 'asset/image/bossheart.png', 103, 103, 2);
		
		game.load.image('magiccircle', 'asset/image/magiccircle5.jpg');
		game.load.spritesheet('boss2', 'asset/image/boss2new.png', 242, 254, 3);
		//load audios
		//game.load.audio('music', 'asset/sound/music.wav');
	},
	create: function () {
		game.state.start('menu');
	}
};
