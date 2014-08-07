var Player = function(spriteName, startPosition) {
	this.HP = 3;
	this.level = 1;
	//add sprite
	this.sprite = game.add.sprite(startPosition.x, startPosition.y, spriteName);
	this.sprite.anchor.set(0.5);
	this.sprite.animations.add('fly');
	this.sprite.animations.play('fly', 5, true);
	
	//enable aracade physics for player sprite
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true; 
	
	this.controller = null;
	this.mainBullet = new Laser('laser', this, null);
	this.subBullet = new Rocket('rocket', this, null);
	
	// Effects
	this.openGlowEffects = new OPenGlowEffects(3);
	this.openGlowEffects.play(startPosition.x, startPosition.y);
	
	/*this.or = game.add.sprite(100, 100, 'rocket');
	
	this.orbit = new OrbitManager(this.or, 5);*/
	};
	
	
	

Player.prototype = {

	constructor: Player,

	update: function() {
		this.additionalUpdate();
	},
	
	additionalUpdate: function() {
		this.controller.update();
		this.mainBullet.update();
		this.subBullet.update();
		this.openGlowEffects.update(this.sprite.x, this.sprite.y);
		/*this.orbit.update();*/
	},
	
	fire: function() {
		this.mainBullet.fire();
		if (this.subBullet.enabled) this.subBullet.fire();
	},
};