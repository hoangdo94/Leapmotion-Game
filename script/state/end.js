var endState = {

	create: function() {
		this.txt = game.add.text(w/2, -150, 'Galaxy WAR', { font: '50px Arial', fill: '#fff' });
		this.txt.anchor.setTo(0.5);
		game.add.tween(this.txt).to({ y: h/2-80 }, 1000, Phaser.Easing.Bounce.Out).start();

		this.scoreText = game.add.text(w/2, h/2-20, 'Your Score: ' + score, { font: '32px Arial', fill: '#fff' });
		this.scoreText.anchor.setTo(0.5);
		this.scoreText.alpha = 0;
		game.add.tween(this.scoreText).delay(500).to({ alpha: 1}, 1000).start();

		this.restartText = game.add.text(w/2, h/2, 'Press ENTER to restart game', { font: '20px Arial', fill: '#fff' });
		this.restartText.anchor.setTo(0.5);
		this.restartText.alpha = 0;
		game.add.tween(this.restartText).delay(500).to({ alpha: 1}, 1000).start();
		game.add.tween(this.restartText).to({y: h/2+50}, 500).to({y: h/2+70}, 500).loop().start();

		if (status == 0) { //lose
			this.txt.text = 'YOU LOSE!'
		}
		if (status == 1) { //win
			this.txt.text = 'YOU WIN!'
		}
	},

	update: function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start('play');
		}
	},
	
};
