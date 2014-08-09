var Player = function(spriteName, startPosition) {
	this.HP = 3;
	this.level = 1;
	//add sprite
	this.sprite = game.add.sprite(startPosition.x, startPosition.y, spriteName);
	this.sprite.anchor.set(0.5);
	this.sprite.animations.add('fly',[0, 1]);
	this.sprite.animations.add('injured', [2]);
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
	
	};
	
Player.prototype = {

	constructor: Player,

	getPos: function() { return {x: this.sprite.x, y: this.sprite.y}},
	update: function() {
		this.additionalUpdate();
		// update animations
		if (this.sprite.animations.currentAnim.loopCount > 0 && this.sprite.animations.currentAnim.name == 'injured') {
			this.sprite.animations.play('fly', 5, true);
		}
	},
	
	additionalUpdate: function() {
		this.controller.update();
		this.mainBullet.update();
		this.subBullet.update();
		this.openGlowEffects.update(this.sprite.x, this.sprite.y);
	},
	
	fire: function() {
		this.mainBullet.fire();
		if (this.subBullet.enabled) this.subBullet.fire();
	},

	initBullet: function(enemyManager) {
		this.mainBullet.enemyManager = enemyManager;
		this.subBullet.enemyManager = enemyManager;	
	}
};