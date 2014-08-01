var KeyboardController = function(game, player) {
	this.game = game;
	this.player = player;
};
KeyboardController.prototype = {

	constructor: KeyboardController,
	
	update: function() {
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.player.sprite.x -= 10;
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.sprite.x += 10;
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player.sprite.y -= 10;
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.player.sprite.y += 10;
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			
		}
	},
	
};