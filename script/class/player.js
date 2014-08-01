var Player = function(game, spriteName, x, y) {
	this.game = game;
	
	//add sprite
	this.sprite = game.add.sprite(x, y, spriteName);
	this.sprite.anchor.set(0.5);
	var scale = 1/10;
	this.sprite.scale.x = this.sprite.scale.y = scale;
	
	//enable aracade physics for player sprite
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true; 
	
	this.controller = new KeyboardController(game,this);
};

Player.prototype = {

	constructor: Player,
	
	update: function() {
		this.controller.update();
	},
	
};