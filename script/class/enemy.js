/**
* Enemy of the game
* @constructor
* @param spriteName - name of sprite of enemy
* @param x - x coordnates at first loading
* @param y - y coordinates at first loading
* @param hp - hp of enemy
* @param bulletSprite - name of spirte of corresponding enemy bullet
* @param isChase - define the ability of chasing to the player of enemy bullet
* @param path - define the moving path of enemy
*/
var Enemy = function(spriteName, x, y, hp, bulletSprite, isChase, path) {
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
};

//==================================================================================================================================================================

var Boss = function(spriteName, x, y, hp) {
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.anchor.set(0.5);

	tween = game.add.tween(this.sprite).to({ x: w/2, y: h/10}, 1500, Phaser.Easing.Linear.None)
								  .to({ x: w/2+w/6, y: h/10+h/8-50}, 1000, Phaser.Easing.Linear.None)
								  .to({ x: 5*w/6, y: h/10+h/4}, 1500, Phaser.Easing.Linear.None)
								  .to({ x: w/2+w/6, y: h/10+3*h/8+50}, 1000, Phaser.Easing.Linear.None)
								  .to({ x: w/2, y: h/10+h/2}, 1500, Phaser.Easing.Linear.None)
								  .to({ x: w/2-w/6, y: h/10+3*h/8+50}, 1000, Phaser.Easing.Linear.None)
								  .to({ x: w/6, y: h/10+h/4}, 1500, Phaser.Easing.Linear.None)
								  .to({ x: w/2-w/6, y: h/10+h/8-50}, 1500, Phaser.Easing.Linear.None)
								  .loop()
								  .start();

	this.HP = hp;
	this.sprite.owner = this;
	this.bullet = new SprayBullet('homingbullet', this);
	this.isBoss = false;
};

Boss.prototype = {

	constructor: Boss,

	update: function(){
		this.sprite.angle += 1;
	},

};

//==================================================================================================================================================================

var EnemyManager = function(owner) {
	this.owner = owner;
	this.sprites = game.add.group();
	this.sprites.enableBody = true;
    this.sprites.physicsBodyType = Phaser.Physics.ARCADE;
	this.movePathManager = new MovePathManager();

	// Collsion Handler
	this.starEffect = new StarEffects(this.owner);
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

	updateOperating: function(enemy, owner){
		if(enemy){
			enemy.owner.update();
			enemy.owner.bullet.update();
		}

		// Only visible enemy can fire
		if (enemy && enemy.exists == true) {
			enemy.owner.bullet.fire(enemy, owner);
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
		
	update: function(owner) {
		this.sprites.forEach(this.updateOperating, this, false, owner);
		this.starEffect.update(owner);
		this.mainPowerUpEffect.update(owner);
		this.subPowerUpEffect.update(owner);
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

	addBoss: function(spriteName, x, y, hp) {
		var boss = new Boss(spriteName, x, y, hp);
		this.sprites.add(boss.sprite);
	},

	addEnemy: function(enemyNumber, x, y, bulletSprite, isChase, path) {
		var enemy = new Enemy('enemy' + enemyNumber, x, y, enemyNumber, bulletSprite, isChase, path);
		this.sprites.add(enemy.sprite);
	},
	
	addEnemyGroup: function(enemyNumber, x, y, bulletSprite, isChase, enemyCount, path) {
		if (path == this.STRAIGHTPATH) {
			for (var i = 0; i < enemyCount; i++) {
				this.addEnemy(enemyNumber, x, y - 150 * i, bulletSprite, isChase, path);
			}
		} else if (path == this.CIRCLEPATH) {
			for (var i = 0; i < enemyCount; i++) {
				this.addEnemy(enemyNumber, w / 2, y - 150 * i, bulletSprite, isChase, path);
			}
		} else if (path == this.RANDOMPATH) {
			for (var i = 0; i < enemyCount; i++) {
				this.addEnemy(enemyNumber, x + 75 + Math.floor(100 * Math.random()), y - 100 * i, bulletSprite, isChase, path);
			}
		} else if (path == this.BARPATH) {
			for (var i = 0; i < enemyCount; i++) {
				this.addEnemy(enemyNumber, x + 100 * i, y, bulletSprite, isChase, path);
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


var MovePathManager = function() {
	this.circletPath = function(enemy) {
		if (enemy) {
    		if (enemy.y < h/3) {
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