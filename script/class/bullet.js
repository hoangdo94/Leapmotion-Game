/**
* Abstract class contains main attributes and method of a bullet
* @constructor
* @param {string} spriteName - references to name of bullet image file was loaded in load.js
* @param {owner} owner - references to currently owner
*/
var Bullet = function(spriteName, owner) {
	this.owner = owner;

	// Sprite settings
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(120, spriteName);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
	this.bulletTime = 0;
};

Bullet.prototype = {
	constructor: Bullet,

	update: function() {
		this.additionalUpdate();
	},

	additionalUpdate: function() {
		this.bullets.forEach(function(bullet) {
			if (bullet.x > w || bullet.x < 0 || bullet.y > h || bullet.y < 0) {
				bullet.kill();
			}
		});
	},

	fire: function() {
		 //  To avoid them being allowed to fire too fast we set a time limit
		if (game.time.now > this.bulletTime)
		{
			//  Grab the first bullet we can from the pool
			var bullet = this.bullets.getFirstExists(false);

			if (bullet)
			{
				//  And fire it
				bullet.reset(this.owner.x, this.owner.y + 4);
				bullet.body.velocity.y = -800;
				this.bulletTime = game.time.now + 100;
			}
		}
	}
};

/**
* Mainbullet of owner. It inheritances from Bullet class
* @constructor
* @param {string} spriteName - references to name of bullet image file was loaded in load.js
* @param {owner} owner - references to currently owner
*/
var Laser = function(spriteName, owner) {
	Bullet.call(this, spriteName, owner);
	this.level = 1;
};

Laser.prototype = Object.create(Bullet.prototype);

Laser.prototype.setLevel = function(level) {
	this.level = level;
};

Laser.prototype.fireOne = function() {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet)
	{
		bullet.reset(this.owner.sprite.x, this.owner.sprite.y - this.owner.sprite.height/2 + 4);
		bullet.body.velocity.y = -800;
	}
};

Laser.prototype.fireTwo = function() {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x + (this.owner.sprite.width/4 - 5), this.owner.sprite.y - this.owner.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;	
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x - (this.owner.sprite.width/4 - 5), this.owner.sprite.y - this.owner.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}
};

Laser.prototype.fireThree = function() {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x, this.owner.sprite.y - this.owner.sprite.height/2);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x + (this.owner.sprite.width/2 - 10), this.owner.sprite.y - this.owner.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x - (this.owner.sprite.width/2 - 10), this.owner.sprite.y - this.owner.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}
};

Laser.prototype.fireFour = function() {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x + (this.owner.sprite.width/2 - 10), this.owner.sprite.y - this.owner.sprite.height/2 + 40);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x + (this.owner.sprite.width/2 - 10)/3, this.owner.sprite.y - this.owner.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x - (this.owner.sprite.width/2 - 10)/3, this.owner.sprite.y - this.owner.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x - (this.owner.sprite.width/2 - 10), this.owner.sprite.y - this.owner.sprite.height/2 + 40);
		bullet.body.velocity.y = -800;
	}
};

Laser.prototype.fireFive = function() {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x, this.owner.sprite.y - this.owner.sprite.height/2);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x + (this.owner.sprite.width/4 - 5), this.owner.sprite.y - this.owner.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x + (this.owner.sprite.width/2 - 10), this.owner.sprite.y - this.owner.sprite.height/2 + 40);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x - (this.owner.sprite.width/4 - 5), this.owner.sprite.y - this.owner.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x - (this.owner.sprite.width/2 - 10), this.owner.sprite.y - this.owner.sprite.height/2 + 40);
		bullet.body.velocity.y = -800;
	}
};

Laser.prototype.fire = function() {
	 //  To avoid them being allowed to fire too fast we set a time limit
	if (game.time.now > this.bulletTime)
	{
		if (this.level == 1) {
			this.fireOne();
		} else if (this.level == 2) {
			this.fireTwo();
		} else if (this.level == 3) {
			this.fireThree();
		} else if (this.level == 4) {
			this.fireFour();
		} else if (this.level == 5) {
			this.fireFive();
		}
		this.bulletTime = game.time.now + 100;
	}
};

/**
* subbullet of owner. It inheritances from Bullet class
* @constructor
* @param {string} spriteName - references to name of bullet image file was loaded in load.js
* @param {owner} owner - references to currently owner
* @param {EnemyManager} enemyManager - references enemyManager instance that currently controls enemy groups
*/
var HomingBullet = function(spriteName, owner, enemyManager) {
	Bullet.call(this, spriteName, owner);
	this.enemyManager = enemyManager;
	this.enabled = false;
	this.bullets.setAll('anchor.y', 0.5);
};

HomingBullet.prototype = Object.create(Bullet.prototype);

HomingBullet.prototype.fire = function() {
	 //  To avoid them being allowed to fire too fast we set a time limit
	if (game.time.now > this.bulletTime)
	{
		if (this.enemyManager.sprites.getFirstAlive() !== null)
		{
			//  Grab the first bullet we can from the pool
			var bullet = this.bullets.getFirstDead(false);
			//  And fire it
			bullet.reset(this.owner.sprite.x + this.owner.sprite.width/2, this.owner.sprite.y - this.owner.sprite.height/2 + 4);

			//another bullet
			bullet = this.bullets.getFirstDead(false);
			bullet.reset(this.owner.sprite.x - this.owner.sprite.width/2, this.owner.sprite.y - this.owner.sprite.height/2 + 4);

			this.bulletTime = game.time.now + 500;
		}
	}
};

HomingBullet.prototype.additionalUpdate = function() {
	var target = this.enemyManager.sprites.getFirstAlive();
	if (target !== null && target.exists) {
		this.bullets.forEach(function(bullet){
			bullet.rotation = game.physics.arcade.accelerateToObject(bullet, target, 800);
		}, target);
	} else {
		this.bullets.forEach(function(bullet){
			bullet.y -= 10;
		});
	}
};


/**
* superbullet of owner. It inheritances from Bullet class
* @constructor
* @param {string} spriteName - corresponding name of image file was loaded in loadState
* @param {owner} owner - references to currently owner instance
*/
var SuperBullet = function(spriteName, owner) {
	Bullet.call(this, spriteName, owner);
	this.level = 1;
	this.angle = 0;
	this.maxAngle = 0;
	this.velocity = 800;
	this.timing = 0;
	this.isFinished = true;
	this.isActive = true;
	this.recharge = 0;
};

SuperBullet.prototype = Object.create(Bullet.prototype);

SuperBullet.prototype.setLevel = function(level) {
	this.level = level;
};

SuperBullet.prototype.fireAround = function(angle) {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.owner.sprite.x, this.owner.sprite.y);
		bullet.body.velocity.y = -Math.cos(Math.PI * angle / 180) * this.velocity;
		bullet.body.velocity.x = Math.sin(Math.PI * angle / 180) * this.velocity;
	}
}

SuperBullet.prototype.fire = function(number) {
	 //  To avoid them being allowed to fire too fast we set a time limit
	this.maxAngle = number * 360;
	if (this.isActive) { 
		this.isFinished = false;
		this.isActive = false;
		this.recharge = 0;
	}
	
};

SuperBullet.prototype.additionalUpdate = function() {
	if (game.time.now > this.timing)
	{
		if (!this.isFinished) {
			this.fireAround(this.angle);
			this.angle += 10;
			
			if (this.angle > this.maxAngle) {
				this.angle = 0;
				this.isFinished = true;
			}
		}
		
		if (this.recharge > 1000) {
			this.isActive = true;
			this.recharge = 1000;
		}
		
		this.recharge += 1;
		
		this.timing = game.time.now + 5;
	}
}

/**
* Bullet of boss1. It inheritances from Bullet class
* @constructor
* @param {string} spriteName - references to name of bullet image file was loaded in load.js
* @param {owner} owner - references to currently owner
* @param {EnemyManager} enemyManager - references enemyManager instance that currently controls enemy groups
*/
var SprayBullet = function(spriteName, owner) {
	Bullet.call(this, spriteName, owner);
	this.bullets.setAll('anchor.y', 0.5);
	//this.bullets.setAll('outOfBoundsKill', false);
};

SprayBullet.prototype = Object.create(Bullet.prototype);

SprayBullet.prototype.fire = function() {
	if (game.time.now > this.bulletTime)
	{
		var bullet;
		var vertical;
		var horizal;
		for (var i=0; i<8; i++){
			bullet = this.bullets.getFirstDead(false);
			vertical = Math.cos(i*Math.PI/4 + this.owner.sprite.angle);
			horizal = Math.sin(i*Math.PI/4 + this.owner.sprite.angle)
			bullet.reset(this.owner.sprite.x + this.owner.sprite.width/2*vertical, this.owner.sprite.y + this.owner.sprite.height/2*horizal);
			bullet.body.velocity.x =500*vertical;
			bullet.body.velocity.y =500*horizal;
			bullet.body.gravity.y = 300;
		}
		this.bulletTime = game.time.now + 1000;
	}
};

SprayBullet.prototype.additionalUpdate = function() {
	/*
	this.bullets.forEach(function(bullet){
		if (bullet.x > h) bullet.exists = false;
	});
*/
};

/**
* Enemy weapon
* @constructor
* @param {string} spriteName - corresponding name of image file was loaded in loadState
* @param {boolean} isChase - the ability of chasing.
*/
var EnemyBullet = function(spriteName, isChase) {
	this.isChase = isChase;
	// Sprite settings
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(60, spriteName);
    this.bullets.setAll('anchor.x', 0.5)	;
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
	this.bulletTime = game.time.now + 2000;
	// Collsion Handler
	this.outOfUsing = false;
}

EnemyBullet.prototype = {
	fire: function(enemy, target) {
		 //  To avoid them being allowed to fire too fast we set a time limit
		if (game.time.now > this.bulletTime)
		{
			//  Grab the first bullet we can from the pool
			var bullet = this.bullets.getFirstDead(false);

			if (bullet)
			{
				game.physics.enable(bullet, Phaser.Physics.ARCADE);
				//  And fire it
				bullet.reset(enemy.x, enemy.y + enemy.height);
				
				if (this.isChase)
					bullet.rotation = game.physics.arcade.moveToObject(bullet, target.sprite, 10, Math.floor(1000 + Math.random() * 1000));
				else
					bullet.body.velocity.y = 800;
				this.bulletTime = game.time.now + 3000;
			}
			
		}
	},
	
	update: function() {
		if (!this.bullets.getFirstExists(true)) {
			this.outOfUsing = true;
		} else this.outOfUsing = false;
	},
}
