/*<<<<<<< HEAD*/
var Player = function(spriteName, startPosition) {
	this.HP = 3;
	this.level = 1;
	//add sprite
	this.sprite = game.add.sprite(startPosition.x, startPosition.y, sprite);
	this.sprite.anchor.set(0.5);
	var scale = 1/9;
	this.sprite.scale.x = this.sprite.scale.y = scale;
	this.sprite.animations.add('fly');
	this.sprite.animations.play('fly', 20, true);
	
	//enable aracade physics for player sprite
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
/*=======
var Player = function(spriteName, x, y) {
	this.HP = 3;
	this.level = 1;
	//add sprite
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.anchor.set(0.5);
>>>>>>> 6eb9d80f0147b7e50667e9319e54e1263c18037b*/
	this.sprite.body.collideWorldBounds = true; 
	
	this.controller = null;
	this.mainBullet = new Laser('laser', this, null);
	this.subBullet = new Rocket('rocket', this, null);
};

Player.prototype = {

	constructor: Player,

	update: function() {
		this.controller.update();
/*<<<<<<< HEAD
	}
=======*/
		this.mainBullet.update();
		this.subBullet.update();
	},
	
	fire: function() {
		this.mainBullet.fire();
		if (this.subBullet.enabled) this.subBullet.fire();
	},
/*>>>>>>> 6eb9d80f0147b7e50667e9319e54e1263c18037b*/
};