var Player = function(game, sprite, startPosition) {
	this.game = game;
	
	//add sprite
	this.sprite = game.add.sprite(startPosition.x, startPosition.y, sprite);
	this.sprite.anchor.set(0.5);
	var scale = 1/9;
	this.sprite.scale.x = this.sprite.scale.y = scale;
	this.sprite.animations.add('fly');
	this.sprite.animations.play('fly', 20, true);
	
	//enable aracade physics for player sprite
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true; 
	
	this.controller = new KeyboardController(game,this);
};

Player.prototype = {

	constructor: Player,

	update: function() {
		this.controller.update();
	}
};