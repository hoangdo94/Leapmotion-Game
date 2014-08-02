var Bullet = function(spriteName, player, enemies) {
	this.player = player;
	this.enemies = enemies;
	// Sprite settings
	this.bullets = game.add.group();
	this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, spriteName);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
	this.bulletTime = 0;
}

Bullet.prototype = {
	constructor: Bullet,
	
	update: function() {
		game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
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
				bullet.reset(this.player.x, this.player.y + 4);
				bullet.body.velocity.y = -800;
				this.bulletTime = game.time.now + 100;
			}
		}
	},
	
	collisionHandler: function(bullet, enemy) {
		//  When a bullet hits an enemy we kill them both
		bullet.kill();	
		enemy.kill();
	}
}

var Laser = function(spriteName, player, enemies) {
	Bullet.call(this, spriteName, player, enemies);
	this.laserNum = 1;
}

Laser.prototype = Object.create(Bullet.prototype);

Laser.prototype.setLaserNum = function(laserNum) {
	this.laserNum = laserNum;
}

Laser.prototype.fireOne = function() {
	var bullet = this.bullets.getFirstExists(false);
	if (bullet)
	{
		bullet.reset(this.player.x, this.player.y + 4);
		bullet.body.velocity.y = -800;
	}
}

Laser.prototype.fireTwo = function() {
	var bullet = this.bullets.getFirstExists(false);
	if (bullet) {
		bullet.reset(this.player.x+25, this.player.y + 8);
		bullet.body.velocity.y = -800;	
	}
	
	bullet = this.bullets.getFirstExists(false);
	if (bullet) {
		bullet.reset(this.player.x-25, this.player.y + 8);
		bullet.body.velocity.y = -800;
	}
}

Laser.prototype.fireThree = function() {
	var bullet = this.bullets.getFirstExists(false);
	if (bullet) {
		bullet.reset(this.player.x, this.player.y);
		bullet.body.velocity.y = -800;
	}
	
	bullet = this.bullets.getFirstExists(false);
	if (bullet) {
		bullet.reset(this.player.x+25, this.player.y + 8);
		bullet.body.velocity.y = -800;
	}
		
	bullet = this.bullets.getFirstExists(false);
	if (bullet) {
		bullet.reset(this.player.x-25, this.player.y + 8);
		bullet.body.velocity.y = -800;
	}
}

Laser.prototype.fire = function() {
	 //  To avoid them being allowed to fire too fast we set a time limit
	if (game.time.now > this.bulletTime)
	{
		if (this.laserNum == 1) {
			this.fireOne();
		} else if (this.laserNum == 2) {
			this.fireTwo();
		} else if (this.laserNum == 3) {
			this.fireThree();
		}
		
		this.bulletTime = game.time.now + 100;
	}
}

var Rocket = function(spriteName, player, enemies) {
	Bullet.call(this, spriteName, player, enemies);
}

Rocket.prototype = Object.create(Bullet.prototype);

Rocket.prototype.fire = function() {
	 //  To avoid them being allowed to fire too fast we set a time limit
	if (game.time.now > this.bulletTime)
	{
		//  Grab the first bullet we can from the pool
		var bullet = this.bullets.getFirstExists(false);

		if (bullet)
		{
			//  And fire it
			bullet.reset(this.player.x, this.player.y + 4);
			bullet.body.velocity.x = 500;
			bullet.body.velocity.y = -100;
			this.bulletTime = game.time.now + 100;
		}
	}
}

