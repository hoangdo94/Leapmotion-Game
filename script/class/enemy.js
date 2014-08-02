var Enemy = function(manager, spriteName, x, y, hp) {
	this.manager = manager;
	this.HP = hp;
	//add sprite
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.anchor.set(0.5);
	this.sprite.body.allowRotation = false;
	this.sprite.owner = this;

	//bullet
	this.bullet = null;
	this.bulletCd = null;

	//move path
	this.movePath = null;
	this.moveSpeed = null;

	this.sprite.body.velocity.y = 100;
};

Enemy.prototype = {

	constructor: Enemy,
	
	update: function() {
		if (this.sprite.y > h){
			this.manager.kill(this);
		}
	},
	
	changeBoundSize: function(wRatio, hRatio) {
		this.sprite.body.setSize(this.sprite.width*wRatio, this.sprite.height*hRatio, 0, 0);
	},
};

var EnemyManager = function(player) {
	this.player = player;
	this.sprites = game.add.group();
};

EnemyManager.prototype = {	

	constructor: EnemyManager,

	update: function() {
		this.sprites.forEach(function(enemy){
			enemy.owner.update();
		});
		game.physics.arcade.overlap(this.player.sprite, this.sprites, this.playerHitEnemy, null, this);

	},

	playerHitEnemy: function(player, enemy){
		this.kill(enemy);
	},

	kill: function(enemy) {
		enemy.kill();
		this.sprites.remove(enemy);
	},

	add: function(enemyNumber, x, y) {
		var enemy = new Enemy(this, 'enemy' + enemyNumber, x, y, enemyNumber);
		this.sprites.add(enemy.sprite);
	},

};
