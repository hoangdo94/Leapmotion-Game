var Controller = function(game) {
    this.game = game;
    this.getInput = function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            return "LEFT";
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            return "RIGHT";
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            return "UP";
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            return "DOWN";
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			return "SPACEBAR";
		}
    }
}