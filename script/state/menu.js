var menuState = {

	create: function() {
		
		this.bg = game.add.tileSprite(0, 0, 2365, 1536, 'bg');
		var scale = w/this.bg.width;
		this.bg.scale.x =  scale;
		this.bg.scale.y =  scale;
		var planet3 = game.add.sprite(w - 100, 100, 'planet3');
		planet3.anchor.set(0.5);

		this.circle = game.add.sprite(w/2, h/2 - 100, 'magiccircle');
		this.circle.anchor.set(0.5);

		var logo = game.add.sprite(w/2, -150, 'logo');
		logo.anchor.setTo(0.5);
		game.add.tween(logo).to({ y: h/2-80 }, 1000, Phaser.Easing.Bounce.Out).start();

		var label = game.add.text(w/2, h/2, 'Press ENTER to use Keyboard Controller\nPress SPACE to use Leapmotion Controller', { font: '20px Arial', fill: '#fff' });
		label.anchor.setTo(0.5);
		label.alpha = 0;
		game.add.tween(label).delay(500).to({ alpha: 1}, 1000).start();
		game.add.tween(label).to({y: h/2+120}, 500).to({y: h/2+140}, 500).loop().start();
		
		
	},

	update: function() {
		this.bg.tilePosition.y += 0.3;
		this.circle.rotation -= 0.05;
		if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			controllerType = 1;
			game.state.start('play');
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			controllerType = 2;
			game.state.start('play');
		}
	},
	
};
