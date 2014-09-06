var menuState = {

	create: function() {
		
		this.magiccircle = game.add.sprite(w / 2, h / 2,'magiccircle');
		this.magiccircle.anchor.setTo(0.5);
		this.magiccircle.alpha = 1;
		
		var logo = game.add.text(w/2, -150, 'Galaxy WAR', { font: '50px Arial', fill: '#fff' });
		logo.anchor.setTo(0.5);
		game.add.tween(logo).to({ y: h/2-80 }, 1000, Phaser.Easing.Bounce.Out).start();
		
		var label = game.add.text(w/2, h/2, 'Press ENTER to use Keyboard Controller\nPress SPACE to use Leapmotion Controller', { font: '20px Arial', fill: '#fff' });
		label.anchor.setTo(0.5);
		label.alpha = 0;
		game.add.tween(label).delay(500).to({ alpha: 1}, 1000).start();
		game.add.tween(label).to({y: h/2+50}, 500).to({y: h/2+70}, 500).loop().start();
		
		
	},

	update: function() {
		this.magiccircle.angle -= 0.1;
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
