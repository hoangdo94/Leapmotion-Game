var defaultVelocity = 10;
var Player = function(controller, sprite) {
	this.controller = controller;
	this.sprite = sprite;
	this.velocity = defaultVelocity;
	
	sprite.anchor.setTo(0.5, 0.5); 
	sprite.animations.add('fly');
	sprite.animations.play('fly', 20, true);};

Player.prototype = {

	constructor: Player,
	
	
	update: function() {
		var input = this.controller.getInput();
		this.inputHandle(input);
	},
	
	inputHandle: function(input) {
		if (input == "UP") {
			this.sprite.y -= this.velocity;
		}
		
		if (input == "DOWN") {
			this.sprite.y += this.velocity;
		}
		
		if (input == "LEFT") {
			this.sprite.x -= this.velocity;
		}
		
		if (input == "RIGHT") {
			this.sprite.x += this.velocity;
		}
		
		if (input == "SPACEBAR") {
			// Do something here
		}
	}
};

