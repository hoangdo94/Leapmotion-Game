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
		game.world.bringToTop(this.bullets);
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
	this.sound = game.add.audio('laserFire');
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
		this.sound.play();
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
	this.isActive = false;
	this.recharge = 0;
	this.sound = game.add.audio('skill');
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
	this.maxAngle = number * 360;
	if (this.isActive) { 
		this.sound.play();
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
			bullet.body.gravity.y = 600;
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
* Bullet of boss2. It inheritances from Bullet class
* @constructor
* @param {string} spriteName - references to name of bullet image file was loaded in load.js
* @param {owner} owner - references to currently owner
* @param {EnemyManager} enemyManager - references enemyManager instance that currently controls enemy groups
*/
var FadeBullet = function(spriteName, owner) {
	Bullet.call(this, spriteName, owner);
	this.bullets.setAll('anchor.y', 0.5);
	this.bulletArrayTime = 0;
	this.isFireIntro = true;
	this.isFireArray = true;
	this.isFireCircle = true;
	this.velocity = 400;
	this.fireCircleActive = false;
	//this.bullets.setAll('outOfBoundsKill', false);
};

FadeBullet.prototype = Object.create(Bullet.prototype);

FadeBullet.prototype.fireIntro = function() {
	if (game.time.now > this.bulletTime)
	{
		var bullet = this.bullets.getFirstExists(false);
		if (bullet) {
			bullet.reset(this.owner.sprite.x, this.owner.sprite.y);
			bullet.alpha = 1;
			bullet.isTween = false;
			bullet.body.velocity.y = 500;
		}
		this.bulletTime = game.time.now + 50;
	}
};
FadeBullet.prototype.fireArray = function(player) {
	this.isFireIntro = false;
	if ((game.time.now > this.bulletTime) && this.isFireArray)
	{
		if (this.isFireCircle && this.fireCircleActive) {
			this.fireAround(0, this.owner.sprite.x+100, this.owner.sprite.y);
			this.fireAround(60, this.owner.sprite.x+100, this.owner.sprite.y);
			this.fireAround(120, this.owner.sprite.x+100, this.owner.sprite.y);
			this.fireAround(180, this.owner.sprite.x+100, this.owner.sprite.y);
			this.fireAround(240, this.owner.sprite.x+100, this.owner.sprite.y);
			this.fireAround(300, this.owner.sprite.x+100, this.owner.sprite.y);
			this.fireAround(0, this.owner.sprite.x-100, this.owner.sprite.y);
			this.fireAround(60, this.owner.sprite.x-100, this.owner.sprite.y);
			this.fireAround(120, this.owner.sprite.x-100, this.owner.sprite.y);
			this.fireAround(180, this.owner.sprite.x-100, this.owner.sprite.y);
			this.fireAround(240, this.owner.sprite.x-100, this.owner.sprite.y);
			this.fireAround(300, this.owner.sprite.x-100, this.owner.sprite.y);
			this.isFireCircle = false;
		}
		var bullet = this.bullets.getFirstExists(false);
		bullet.alpha = 1;
		if (bullet) {
			bullet.reset(this.owner.sprite.x, this.owner.sprite.y);
			if (player) 
				bullet.rotation = game.physics.arcade.moveToObject(bullet, player, 50, 1500);
		}
		this.bulletTime = game.time.now + 50;
	}
};

FadeBullet.prototype.updateFireIntro = function() {
	this.bullets.forEach(function(bullet) {
		
		if (bullet.exists && !bullet.isTween) {
			game.add.tween(bullet).to({alpha: 0},600, Phaser.Easing.Linear.None).start();
			bullet.isTween = true;
		}
		
		if (bullet.alpha <= 0) {
			bullet.kill();
		}
	});
}

FadeBullet.prototype.updateFire = function() {
	if (game.time.now > this.bulletArrayTime) {
		if (this.isFireArray) {
			this.isFireArray = false;
			this.isFireCircle = false;
		this.bulletArrayTime = game.time.now + 1000	;
		} else {
			this.isFireArray = true;
			this.isFireCircle = true;
		this.bulletArrayTime = game.time.now + 500	;
		}
	}
}
FadeBullet.prototype.update = function() {
	if (this.isFireIntro) {
		this.updateFireIntro();
	} else {
		this.updateFire();
	}
	/*
	this.bullets.forEach(function(bullet){
		if (bullet.x > h) bullet.exists = false;
	});
*/
};
FadeBullet.prototype.fireAround = function(angle, x, y) {
	var bullet = this.bullets.getFirstDead(false);
	bullet.alpha = 1;
	if (bullet) {
		bullet.reset(x, y);
		bullet.body.velocity.y = -Math.cos(Math.PI * angle / 180) * this.velocity;
		bullet.body.velocity.x = Math.sin(Math.PI * angle / 180) * this.velocity;
	}
}
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
    this.bullets.setAll('anchor.y', 0);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
	this.bulletTime = game.time.now + 1000;
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
				bullet.reset(enemy.x, enemy.y);
				
				if (this.isChase)
					bullet.rotation = game.physics.arcade.moveToObject(bullet, target.sprite, 10, Math.floor(1000 + Math.random() * 1000));
				else
					bullet.body.velocity.y = 800;
				this.bulletTime = game.time.now + 1000;
			}
			
		}
	},
	
	update: function() {
		if (!this.bullets.getFirstExists(true)) {
			this.outOfUsing = true;
		} else this.outOfUsing = false;
	},
}
