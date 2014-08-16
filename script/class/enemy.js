/**
* Enemy of the game
* @constructor
* @param manager
*/
var Enemy = function(manager, spriteName, x, y, hp, bulletSprite, isChase, path) {
	this.manager = manager;
	this.HP = hp;
	//add sprite
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.anchor.set(0.5);
	this.sprite.body.allowRotation = false;
	this.sprite.animations.add('fly', [0]);
	this.sprite.animations.add('injured', [1]);
	this.sprite.animations.play('fly', 5, true);
	
	this.sprite.scale.x = this.sprite.scale.y = 0.8;
	this.sprite.owner = this;
	//this.sprite.body.velocity.y = 100;
	//bullet
	this.bullet = new EnemyBullet(bulletSprite, isChase);
	this.stared = false;
	
	// Path
	this.path = path;
	this.pathNeededToUpdate = true;
	this.time = 0;
};

Enemy.prototype = {

	constructor: Enemy,
	
	update: function() {
		if (this.sprite.y > h - this.sprite.height/2){
			this.sprite.exists = false;
		}
		
		if (this.sprite.animations.currentAnim.loopCount > 0 && this.sprite.animations.currentAnim.name == 'injured') {
				this.sprite.animations.play('fly', 5, true);
		}
	},
	
	changeBoundSize: function(wRatio, hRatio) {
		this.sprite.body.setSize(this.sprite.width*wRatio, this.sprite.height*hRatio, 0, 0);
	},
};

//==================================================================================================================================================================

var EnemyManager = function(player) {
	this.player = player;
	this.sprites = game.add.group();
	this.sprites.enableBody = true;
    this.sprites.physicsBodyType = Phaser.Physics.ARCADE;
	this.movePathManager = new MovePathManager();

	// Collsion Handler
	this.starEffect = new StarEffects(this.player);
	this.mainPowerUpEffect = new PowerUpEffects('main');
	this.subPowerUpEffect = new PowerUpEffects('sub');
	this.STRAIGHTPATH = 0;
	this.CIRCLEPATH = 1;
	this.BARPATH = 2;
	this.RANDOMPATH = 3;
	
	this.isOutOfEnemies = true;
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
		
		if (enemy && enemy.owner.path == this.STRAIGHTPATH) {
			this.movePathManager.straightPath(enemy);
		} else if (enemy && enemy.owner.path == this.CIRCLEPATH) {
			this.movePathManager.circletPath(enemy);
		} else if (enemy && enemy.owner.path == this.BARPATH)  {
			this.movePathManager.barPath(enemy);
		} else if (enemy && enemy.owner.path == this.RANDOMPATH && enemy.owner.pathNeededToUpdate) {
			this.movePathManager.randomPath(enemy);
		} 
	},
		
	update: function(player) {
		this.sprites.forEach(this.updateOperating, this, false, player);
		this.starEffect.update(player);
		this.mainPowerUpEffect.update(player);
		this.subPowerUpEffect.update(player);
		if (!this.sprites.getFirstExists(true)) {
			this.isOutOfEnemies = true;
		} else {
			this.isOutOfEnemies = false;
		}
	},

	kill: function(enemy) {
		if (enemy) {
			enemy.kill();
			this.sprites.remove(enemy);
		}
	},

	add: function(enemyNumber, x, y, bulletSprite, isChase, path) {
		var enemy = new Enemy(this, 'enemy' + enemyNumber, x, y, enemyNumber, bulletSprite, isChase, path);
		this.sprites.add(enemy.sprite);
	},
	
	addGroupPath: function(enemyNumber, x, y, bulletSprite, isChase, number, path) {
		if (path == this.STRAIGHTPATH) {
			for (var i = 0; i < number; i++) {
				this.add(enemyNumber, x, y - 100 * i, bulletSprite, isChase, path);
			}
		} else if (path == this.CIRCLEPATH) {
			for (var i = 0; i < number; i++) {
				this.add(enemyNumber, w / 2, y - 100 * i, bulletSprite, isChase, path);
			}
		} else if (path == this.RANDOMPATH) {
			for (var i = 0; i < number; i++) {
				this.add(enemyNumber, x + 75 + Math.floor(100 * Math.random()), y - 100 * i, bulletSprite, isChase, path);
			}
		} else if (path == this.BARPATH) {
			for (var i = 0; i < number; i++) {
				this.add(enemyNumber, x + 100 * i, y, bulletSprite, isChase, path);
			}
		}
		
	},
	
	getRandromPathType: function() {
		var rand = Math.floor(4 * Math.random());
		if (rand == 0) {
			return this.STRAIGHTPATH;
		} else if ( rand == 1) {
			return this.CIRCLEPATH;
		} else if (rand == 2) {
			return this.BARPATH;
		} else if (rand == 3) {
			return this.RANDOMPATH;
		}
	}
};

//==================================================================================================================================================================

var CollisionManager = function(player, enemyManager) {
	this.player = player;
	this.enemyManager = enemyManager;
	this.boomEffect = new BoomEffects(1);
	
	this.playerEnemyCollision = function(player, enemy) {
		// do something here
		
	}
	
	this.playerEnemyBulletCollision = function(player, bullet) {
		bullet.kill();
	}
	
	this.playerBulletEnemyCollision = function(bullet, enemy) {
		bullet.kill();
		enemy.owner.HP--;
	}
	
	this.update = function() {
		if (this.player && this.enemyManager) {
			game.physics.arcade.overlap(this.player.mainBullet.bullets, this.enemyManager.sprites, this.bulletHitEnemy, null, this);
			game.physics.arcade.overlap(this.player.subBullet.bullets, this.enemyManager.sprites, this.bulletHitEnemy, null, this);
			game.physics.arcade.overlap(this.player.superBullet.bullets, this.enemyManager.sprites, this.bulletHitEnemy, null, this);
			
			this.enemyManager.sprites.forEach(this.updateOperating, this, false, this.player);			
		}
		
		this.boomEffect.update();
	}
	
	this.updateOperating = function(enemy, player) {
		game.physics.arcade.overlap(player.sprite, enemy.owner.bullet.bullets, this.bulletHitPlayer, null, this);
	}
	
	this.bulletHitEnemy = function(bullet, enemy) {
		//  When a bullet hits an enemy we kill them both (When they appear on the screen)
		if (enemy.y > 0) {
			if (enemy.owner.HP <= 0) {
				enemy.exists = false;
				this.boomEffect.play(enemy.x, enemy.y);
			}
			bullet.kill();
			enemy.owner.HP--;
			enemy.animations.play('injured', 20, true);
		}
	}
	
	this.bulletHitPlayer = function(player, bullet) {
		bullet.kill();
		player.animations.play('injured', 20, true);
		player.owner.HP--;
		player.owner.HUD.updateHP();
		if (player.owner.HP == 0) {
			//game over :v
			// chua viet
		}
	}
}

//==================================================================================================================================================================

var MovePathManager = function() {
	this.circletPath = function(enemy) {
		if (enemy) {
    		if (enemy.y < (h/2 - 150)) {
    			enemy.body.velocity.y = 200;
    			enemy.body.velocity.x = 20;
    		}
    		else {
    			enemy.body.velocity.y = 0;
    			enemy.body.velocity.x = 0;
    			enemy.x += 2 * Math.cos(enemy.angle);
    			enemy.y += 2 * Math.sin(enemy.angle);
    			enemy.angle += 0.01;
    		}
    	}
	}

	this.straightPath = function(enemy) {
		if (enemy) {
			if (enemy.y < (h / 5)) {
    			enemy.body.velocity.y = 200;
    			enemy.body.velocity.x = 20;
    		} else {
    			enemy.body.velocity.y = 100;
    		}
    	}
	}

	this.randomPath = function(enemy) {
		if (enemy) {
			if (enemy.y < (h / 5)) {
    			enemy.body.velocity.y = 200;
    			enemy.body.velocity.x = 20;
    		} else {
				enemy.body.velocity.x = 25 - 50 * Math.random();
				enemy.body.velocity.y = Math.random() * 50 + 50;
				enemy.owner.pathNeededToUpdate = false;
    		}
		}
	}
	
	this.barPath = function(enemy) {
		if (enemy.y < (h / 5)) {
			enemy.body.velocity.y = 200;
			enemy.body.velocity.x = 20;
    	} else {
			enemy.body.velocity.y = 100;
    	}
	}
}