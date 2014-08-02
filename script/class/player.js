var Player = function(game, spriteName, startPosition) {
	this.game = game;
	this.x = startPosition.x;
	this.y = startPosition.y;
	
	//add sprite
	this.sprite = game.add.sprite(startPosition.x, startPosition.y, spriteName);
	this.sprite.anchor.set(0.5);
	var scale = 1/8;
	this.sprite.scale.x = this.sprite.scale.y = scale;
	this.sprite.animations.add('fly');
	this.sprite.animations.play('fly', 20, true);
	
	//enable aracade physics for player sprite
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true; 
	
	this.controller = new KeyboardController(game,this);
	
	
	
	
	this.laser = new Laser('bullet', this, null);
};

Player.prototype = {

	constructor: Player,

	update: function() {
		// Update position
		this.x = this.sprite.x;
		this.y = this.sprite.y;
		
		this.controller.update();
		this.laser.update();
	},
	
	fire: function() {
		this.laser.fire();
	}
};