var KeyboardController = function(player) {
	this.player = player;
};
KeyboardController.prototype = {
	constructor: KeyboardController,
	update: function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.player.sprite.x -= 10;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.sprite.x += 10;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player.sprite.y -= 10;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.player.sprite.y += 10;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.player.fire();
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
			this.player.fireSuper();
		}
	}
};
