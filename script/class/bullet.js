var Bullet = function(spriteName, object, enemyManager) {
	this.object = object;
	this.enemyManager = enemyManager;

	// Sprite settings
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(60, spriteName);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
	this.bulletTime = 0;
	
	// Bullet Hit Effects
	this.bulletHitEffect = new BulletHitEffects(2);
	this.boomEffect = new BoomEffects(1);
	
	// Collsion Handler
	this.collsionManager = new CollisionManager();
};

Bullet.prototype = {
	constructor: Bullet,

	update: function() {
		game.physics.arcade.overlap(this.bullets, this.enemyManager.sprites, this.bulletHitEnemy, null, this);
		this.additionalUpdate();
		this.bulletHitEffect.update();
		this.boomEffect.update();
	},

	additionalUpdate: function() {

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
				bullet.reset(this.object.x, this.object.y + 4);
				bullet.body.velocity.y = -800;
				this.bulletTime = game.time.now + 100;
			}
		}
	},

	bulletHitEnemy: function(bullet, enemy) {
		//  When a bullet hits an enemy we kill them both
		/*bullet.kill();
		enemy.owner.HP--;*/
		this.collsionManager.playerBulletEnemyCollision(bullet, enemy);
		if (enemy.owner.HP <= 0) {
			this.enemyManager.kill(enemy);
			this.boomEffect.play(enemy.x, enemy.y);
		}
		
		this.bulletHitEffect.play(bullet.x, bullet.y);
	}
};

var Laser = function(spriteName, object, enemyManager) {
	Bullet.call(this, spriteName, object, enemyManager);
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
		bullet.reset(this.object.sprite.x, this.object.sprite.y - this.object.sprite.height/2 + 4);
		bullet.body.velocity.y = -800;
	}
};

Laser.prototype.fireTwo = function() {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x + (this.object.sprite.width/4 - 5), this.object.sprite.y - this.object.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;	
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x - (this.object.sprite.width/4 - 5), this.object.sprite.y - this.object.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}
};

Laser.prototype.fireThree = function() {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x, this.object.sprite.y - this.object.sprite.height/2);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x + (this.object.sprite.width/2 - 10), this.object.sprite.y - this.object.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x - (this.object.sprite.width/2 - 10), this.object.sprite.y - this.object.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}
};

Laser.prototype.fireFour = function() {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x + (this.object.sprite.width/2 - 10), this.object.sprite.y - this.object.sprite.height/2 + 40);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x + (this.object.sprite.width/2 - 10)/3, this.object.sprite.y - this.object.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x - (this.object.sprite.width/2 - 10)/3, this.object.sprite.y - this.object.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x - (this.object.sprite.width/2 - 10), this.object.sprite.y - this.object.sprite.height/2 + 40);
		bullet.body.velocity.y = -800;
	}
};

Laser.prototype.fireFive = function() {
	var bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x, this.object.sprite.y - this.object.sprite.height/2);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x + (this.object.sprite.width/4 - 5), this.object.sprite.y - this.object.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x + (this.object.sprite.width/2 - 10), this.object.sprite.y - this.object.sprite.height/2 + 40);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x - (this.object.sprite.width/4 - 5), this.object.sprite.y - this.object.sprite.height/2 + 20);
		bullet.body.velocity.y = -800;
	}

	bullet = this.bullets.getFirstDead(false);
	if (bullet) {
		bullet.reset(this.object.sprite.x - (this.object.sprite.width/2 - 10), this.object.sprite.y - this.object.sprite.height/2 + 40);
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

var Rocket = function(spriteName, object, enemyManager) {
	Bullet.call(this, spriteName, object, enemyManager);
	this.enabled = false;
	this.bullets.setAll('anchor.y', 0.5);
};

Rocket.prototype = Object.create(Bullet.prototype);

Rocket.prototype.fire = function() {
	 //  To avoid them being allowed to fire too fast we set a time limit
	if (game.time.now > this.bulletTime)
	{
		//  Grab the first bullet we can from the pool
		var bullet = this.bullets.getFirstDead(false);

		if (bullet && this.enemyManager.sprites.getFirstAlive() !== null)
		{
			//  And fire it
			bullet.reset(this.object.sprite.x, this.object.sprite.y - this.object.sprite.height/2 + 4);
			this.bulletTime = game.time.now + 500;
		}
	}
};

Rocket.prototype.additionalUpdate = function() {
	var target = this.enemyManager.sprites.getFirstAlive();
	if (target !== null) {
		this.bullets.forEach(function(bullet){
			bullet.rotation += 0.2;
			bullet.x += (this.x - bullet.x)/20;
			bullet.y += (this.y - bullet.y)/20;
		}, target);
	} else {
		this.bullets.forEach(function(bullet){
			bullet.rotation += 0.2;
			bullet.y -= 10;
		});
	}
	this.bulletHitEffect.update();
	this.boomEffect.update();
};


var EnemyBullet = function(spriteName, enemy, player) {
	this.enemy = enemy;
	this.player = player;

	// Sprite settings
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(600, spriteName);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
	this.bulletTime = 0;
	
	// Collsion Handler
	this.collsionManager = new CollisionManager();
}

EnemyBullet.prototype = {
	fire: function(target) {
		 //  To avoid them being allowed to fire too fast we set a time limit
		if (game.time.now > this.bulletTime)
		{
			//  Grab the first bullet we can from the pool
			var bullet = this.bullets.getFirstDead(false);

			if (bullet)
			{
				game.physics.enable(bullet, Phaser.Physics.ARCADE);
				//  And fire it
				bullet.reset(this.enemy.sprite.x, this.enemy.sprite.y);
				//bullet.body.velocity.y = 800;
				bullet.rotation = game.physics.arcade.moveToObject(bullet, target.sprite, 10, Math.floor(1000 + Math.random() * 1000));
				this.bulletTime = game.time.now + 2000;
			}
			
		}
	},
	
	update: function(player) {
		game.physics.arcade.overlap(player.sprite, this.bullets, this.bulletHitPlayer, null, this);
		this.bullets.forEach(function(bullet){
			if(bullet){
				// do something here
			}
		});
	},
	
	bulletHitPlayer: function(player, bullet) {
		this.collsionManager.playerEnemyBulletCollision(player, bullet);
	}
}