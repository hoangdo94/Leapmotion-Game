var menuState = {

	create: function() {
		var logo = game.add.text(w/2, -150, 'This is GAME NAME', { font: '50px Arial', fill: '#fff' });
		logo.anchor.setTo(0.5);
		game.add.tween(logo).to({ y: h/2-80 }, 1000, Phaser.Easing.Bounce.Out).start();
		
		var label = game.add.text(w/2, h/2, 'Press ENTER to start the game', { font: '20px Arial', fill: '#fff' });
		label.anchor.setTo(0.5);
		label.alpha = 0;
		game.add.tween(label).delay(500).to({ alpha: 1}, 1000).start();
		game.add.tween(label).to({y: h/2+50}, 500).to({y: h/2+70}, 500).loop().start();
	},

	update: function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start('play');
		}
	},
	
};
