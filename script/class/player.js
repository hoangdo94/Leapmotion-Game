var Player = function(spriteName, x, y) {
	this.HP = 3;
	this.level = 1;
	//add sprite
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.anchor.set(0.5);
	this.sprite.body.collideWorldBounds = true; 
	
	this.controller = null;
	this.mainBullet = new Laser('laser', this, null);
	this.subBullet = new Rocket('rocket', this, null);
};

Player.prototype = {

	constructor: Player,
	
	update: function() {
		this.controller.update();
		this.mainBullet.update();
		this.subBullet.update();
	},
	
	fire: function() {
		this.mainBullet.fire();
		if (this.subBullet.enabled) this.subBullet.fire();
	},
};