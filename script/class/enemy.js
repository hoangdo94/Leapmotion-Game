var Enemy = function(manager, spriteName, x, y, hp, bulletSprite, isChase) {
	this.manager = manager;
	this.HP = hp;
	//add sprite
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.anchor.set(0.5);
	this.sprite.body.allowRotation = false;
	//this.sprite.body.collideWorldBounds = true;

	this.sprite.scale.x = this.sprite.scale.y = 0.8;
	this.sprite.owner = this;
	this.sprite.body.velocity.y = 100;
	//bullet
	this.bullet = new EnemyBullet(bulletSprite, isChase);
	this.stared = false;

	this.time = 0;
};

Enemy.prototype = {

	constructor: Enemy,
	
	update: function() {
		if (this.sprite.y > h - this.sprite.height/2){
			this.manager.kill(this.sprite);
		}
		/*
		if (game.time.now > this.time) {
			this.sprite.body.velocity.x = (Math.random() - 0.5)*500;
			this.sprite.body.velocity.y = (Math.random() - 0.5)*500;
			this.time = game.time.now + 2000;
		}
		*/
	},
	
	changeBoundSize: function(wRatio, hRatio) {
		this.sprite.body.setSize(this.sprite.width*wRatio, this.sprite.height*hRatio, 0, 0);
	},
};

var EnemyManager = function(player) {
	this.player = player;
	this.sprites = game.add.group();
	this.sprites.enableBody = true;
    this.sprites.physicsBodyType = Phaser.Physics.ARCADE;
	
	// Collsion Handler
	this.collsionManager = new CollisionManager();
	this.starEffect = new StarEffects();
	this.mainPowerUpEffect = new PowerUpEffects('main');
	this.subPowerUpEffect = new PowerUpEffects('sub');
};

EnemyManager.prototype = {	

	constructor: EnemyManager,

	updateOperating: function(enemy, player){
		if(enemy){
			enemy.owner.update();
			enemy.owner.bullet.update(player);
		}

		// Only visible enemy can fire
		if (enemy && enemy.exists == true) {
			enemy.owner.bullet.fire(enemy, player);
		}
		
		if (enemy && !enemy.exists && enemy.owner.bullet.outOfUsing) {
			this.kill(enemy);
		}
		
		if (enemy && enemy.owner.HP < 0 && !enemy.owner.stared) {
			enemy.owner.stared = true;
			var tmp = Math.random();
			if (tmp>0.9) this.subPowerUpEffect.play(enemy.x, enemy.y);
			else if (tmp>0.7) this.mainPowerUpEffect.play(enemy.x, enemy.y);
			else this.starEffect.play(enemy.x, enemy.y);
		}
	},
		
	update: function(player) {
		this.sprites.forEach(this.updateOperating, this, false, player);
		game.physics.arcade.overlap(player.sprite, this.sprites, this.playerHitEnemy, null, this);
		this.collsionManager.update(player);
		this.starEffect.update(player);
		this.mainPowerUpEffect.update(player);
		this.subPowerUpEffect.update(player);
	},

	playerHitEnemy: function(player, enemy){
		this.collsionManager.playerEnemyCollision(player, enemy);
	},

	kill: function(enemy) {
		if (enemy) {
			enemy.kill();
			this.sprites.remove(enemy);
		}
	},

	add: function(enemyNumber, x, y, bulletSprite, isChase) {
		var enemy = new Enemy(this, 'enemy' + enemyNumber, x, y, enemyNumber, bulletSprite, isChase);
		this.sprites.add(enemy.sprite);
	},

};


var CollisionManager = function() {
	this.playerEnemyCollision = function(player, enemy) {
		// do something here
		
	}
	
	this.playerEnemyBulletCollision = function(player, bullet) {
		bullet.kill();
	}
	
	this.playerBulletEnemyCollision = function(bullet, enemy) {
		bullet.kill();
		enemy.owner.HP--;
		
		if (enemy.owner.HP <= 0) {
		}
	}
	
	this.update = function(player) {
	}
}