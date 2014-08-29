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
var Enemy = function(spriteName, x, y, hp, bulletSprite, isChase, direction, path) {
	this.HP = hp;
	//add sprite
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.anchor.set(0.5);
	this.sprite.body.allowRotation = false;
	this.sprite.animations.add('fly', [0]);
	this.sprite.animations.add('injured', [1]);
	this.sprite.animations.play('fly', 5, true);
	
	this.collisionSprite = this.sprite;
	this.collisionSprite.owner = this;
	this.sprite.owner = this;
	
	this.sprite.scale.x = this.sprite.scale.y = 0.8;
	this.sprite.owner = this;
	//bullet
	this.bullet = new EnemyBullet(bulletSprite, isChase);
	this.stared = false;
	
	// Path
	this.path = path;
	this.pathNeededToUpdate = true;
	this.direction = direction;
	this.time = 0;
	this.isBoss = false;
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

var BossStage1 = function(spriteName, x, y, hp) {
	this.HP = hp;
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.setSize(this.sprite.width/Math.sqrt(2), this.sprite.height/Math.sqrt(2), 0, 0);
	this.sprite.anchor.set(0.5);
	this.sprite.animations.add('fly', [0]);
	this.sprite.animations.add('injured', [1]);
	this.sprite.animations.play('fly', 5, true);
	this.sprite.exists = false;
	this.movePoints = [	{x: w/2, y: h/10},
						{x: w/2+w/6, y: h/10+h/8-50}, 
						{x: 5*w/6, y: h/10+h/4},
						{x: w/2+w/6, y: h/10+3*h/8+50},
						{x: w/2, y: h/10+h/2},
						{x: w/2-w/6, y: h/10+3*h/8+50},
						{x: w/6, y: h/10+h/4},
						{x: w/2-w/6, y: h/10+h/8-50}
					  ];
	
	this.currentPoint = 0;


	this.originX = x;
	this.originY = y;
	
	this.introDone = false;
	this.tweenBegin = false;

	this.openSprite = game.add.sprite(x, y, spriteName);
	this.openSprite.anchor.set(0.5);
	this.openSprite.scale.x = 0.1;
	this.openSprite.scale.y = 0.1;
	game.add.tween(this.openSprite.scale).to({x: 1, y: 1}, 2000, Phaser.Easing.Linear.None).start();
	
	this.bossHeartSprite = game.add.sprite(x, y, 'bossheart');
	this.bossHeartSprite.animations.add('fly', [0, 1]);
	this.bossHeartSprite.animations.play('fly', 10, true);
	this.bossHeartSprite.anchor.set(0.5);
	
	this.collisionSprite = this.bossHeartSprite;
	this.collisionSprite.owner = this;
	this.sprite.owner = this;
	
	this.bullet = new SprayBullet('spraybullet', this);
	this.isBoss = true;
	this.time = 0;

	//Hp Bar
	this.maxHP = this.HP;
	this.hpbarEmpty = game.add.sprite(w/2 - w/6, h/20, 'hpbar');
	this.hpbarEmpty.frame = 1;
	this.hpbarFull = game.add.sprite(w/2 - w/6, h/20, 'hpbar');
	this.hpbarEmpty.width = this.hpbarFull.width = w/3;
	this.hpbarEmpty.height = this.hpbarFull.height = this.hpbarEmpty.width/20;	
};

BossStage1.prototype = {

	constructor: BossStage1,

	update: function(){
		game.world.bringToTop(this.bossHeartSprite);
		this.sprite.angle += 1;
		// update animations
		if (this.sprite.animations.currentAnim.loopCount > 0 && this.sprite.animations.currentAnim.name == 'injured') {
			this.sprite.animations.play('fly', 5, true);
		}
		
		if (this.openSprite.scale.x == 1) {
			this.introDone = true;
		}
		
		if (this.introDone && !this.tweenBegin) {
			this.sprite.reset(this.originX, this.originY);
			this.tweenBegin = true;
			this.openSprite.destroy();
		}
		
		this.bossHeartSprite.x = this.sprite.x;
		this.bossHeartSprite.y = this.sprite.y;
		if (Math.abs(this.sprite.x - this.movePoints[this.currentPoint].x) < 5 && Math.abs(this.sprite.y == this.movePoints[this.currentPoint].y)<5) {
			this.currentPoint++;
			if (this.currentPoint >= this.movePoints.length) this.currentPoint = 0;
			if (this.introDone) {
				this.bullet.fire();
			}
		}

		game.physics.arcade.moveToXY(this.sprite, this.movePoints[this.currentPoint].x, this.movePoints[this.currentPoint].y, 200);

		this.updateHpBar();
	},

	updateHpBar: function(){
		this.hpbarFull.width = this.hpbarEmpty.width*this.HP/this.maxHP;
		if (this.HP <= 0){
			this.hpbarEmpty.destroy();
			this.hpbarFull.destroy();
			this.bossHeartSprite.destroy();
		}
	}

};

var BossStage2 = function(spriteName, x, y, hp, player) {
	this.player = player;
	this.HP = 500;
	this.dangerRange = this.HP / 3;
	this.isIntro = true;
	this.sprite = game.add.sprite(100, 100, spriteName);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.anchor.set(0.5);
	this.sprite.animations.add('fly',[0]);
	this.sprite.animations.add('injured',[1]);
	this.sprite.animations.add('dangered',[2]);
	this.sprite.animations.play('fly', 5, true);
	this.sprite.body.setSize(this.sprite.width, this.sprite.height/2, 0, -this.sprite.height/4);

	//this.sprite.reset(-this.sprite.body.halfWidth, this.sprite.body.halfHeight);
	tween1 = game.add.tween(this.sprite).to({ x: w + this.sprite.body.halfWidth }, 1000, Phaser.Easing.Linear.None).start();
	this.isIntro = true;
	
	this.sprite.reset(w + this.sprite.body.halfWidth, this.sprite.body.halfHeight);
	tween2 = game.add.tween(this.sprite).to({ x: -this.sprite.body.halfWidth }, 1400, Phaser.Easing.Linear.None).delay(3000).start();
	
	this.sprite.reset(-this.sprite.body.halfWidth, this.sprite.body.halfHeight);
	tween3 = game.add.tween(this.sprite).to({ x: w + this.sprite.body.halfWidth }, 1800, Phaser.Easing.Linear.None).delay(6000).start();
	
	this.sprite.reset(w + this.sprite.body.halfWidth, this.sprite.body.halfHeight);
	tween4 = game.add.tween(this.sprite).to({ x: w / 2 }, 2000, Phaser.Easing.Linear.None).delay(9000).start();
	tween4.onComplete.add(function(){
		this.sprite.reset(w /2, this.sprite.body.halfHeight);
		this.isIntro = false;
		}, this);

	this.collisionSprite = this.sprite;
	this.collisionSprite.owner = this;
	this.sprite.owner = this;
	
	this.isBoss = true;
	this.time = 0;

	//Hp Bar
	this.maxHP = this.HP;
	this.hpbarEmpty = game.add.sprite(w/2 - w/6, h/20, 'hpbar');
	this.hpbarEmpty.frame = 1;
	this.hpbarFull = game.add.sprite(w/2 - w/6, h/20, 'hpbar');
	this.hpbarEmpty.width = this.hpbarFull.width = w/3;
	this.hpbarEmpty.height = this.hpbarFull.height = this.hpbarEmpty.width/20;
	this.bullet = new FadeBullet('spraybullet', this);
	
	
};

BossStage2.prototype = {

	constructor: BossStage2,

	update: function(){
		if (this.sprite.exists) {
		
		if (this.sprite.animations.currentAnim.loopCount > 0 && this.sprite.animations.currentAnim.name == 'injured') {
			if (this.HP > this.dangerRange){
				this.sprite.animations.play('fly', 5, true);
			} else if (this.HP <= this.dangerRange) {
				this.sprite.animations.play('dangered', 5, true);
			}
		}
		
		//game.physics.arcade.moveToXY(this.sprite, this.movePoints[this.currentPoint].x, this.movePoints[this.currentPoint].y, 200);
		if (this.isIntro) {
			this.bullet.fireIntro();
		} else {
			if (this.player)
				this.bullet.fireArray(this.player.sprite);
				if (Math.abs(this.player.sprite.x - this.sprite.x) > 30)
					game.physics.arcade.moveToObject(this.sprite, {x: this.player.sprite.x, y: this.sprite.body.halfHeight}, 50); 
		}
		if (this.HP <= this.dangerRange) {
			this.bullet.fireCircleActive = true;
			//this.sprite.animations.play('dangered', 5, true);
		}
		this.updateHpBar();
		this.bullet.update(this.player.spirte);
		}
	},

	updateHpBar: function(){
		this.hpbarFull.width = this.hpbarEmpty.width*this.HP/this.maxHP;
		if (this.HP <= 0){
			this.hpbarEmpty.destroy();
			this.hpbarFull.destroy();
		}
	}
	
	

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
	this.CROSSPATH = 4;
	this.CHAINEDPATH = 5;
	this.isOutOfEnemies = true;
};

EnemyManager.prototype = {	

	constructor: EnemyManager,

	updateOperating: function(enemy, owner){
		if(enemy){
			enemy.owner.update();
			enemy.owner.bullet.update();
		}
		if (enemy && !enemy.exists && enemy.owner.bullet.outOfUsing) {
			this.kill(enemy);
		}
		if (enemy && !(enemy.owner.isBoss)) {
			// Only visible enemy can fire
			if (enemy.exists == true) {
				enemy.owner.bullet.fire(enemy, owner);
			}
		
			if (enemy.owner.HP < 0 && !enemy.owner.stared) {
				enemy.owner.stared = true;
				var tmp = Math.random();
				if (tmp>0.9) this.subPowerUpEffect.play(enemy.x, enemy.y);
				else if (tmp>0.7) this.mainPowerUpEffect.play(enemy.x, enemy.y);
				else this.starEffect.play(enemy.x, enemy.y);
			}
		
			if (enemy.owner.path == this.STRAIGHTPATH) {
				this.movePathManager.straightPath(enemy);
			} else if (enemy.owner.path == this.CIRCLEPATH) {
				this.movePathManager.circletPath(enemy);
			} else if (enemy.owner.path == this.BARPATH)  {
				this.movePathManager.barPath(enemy);
			} else if (enemy.owner.path == this.RANDOMPATH && enemy.owner.pathNeededToUpdate) {
				this.movePathManager.randomPath(enemy);
			} else if (enemy.owner.path == this.CROSSPATH) {
				this.movePathManager.crossPath(enemy);
			} else if (enemy.owner.path == this.CHAINEDPATH) {
				this.movePathManager.chainedPath(enemy);
			}
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

	addBoss: function(spriteName, x, y, hp, type) {
		if (type == 1) {
			var boss = new BossStage1(spriteName, x, y, hp, this.owner);
		} else if (type == 2) {
			boss = new BossStage2(spriteName, x, y, hp, this.owner);
		}
		this.sprites.add(boss.sprite);
	},

	addEnemy: function(enemyNumber, x, y, bulletSprite, isChase, direction, path) {
		var enemy = new Enemy('enemy' + enemyNumber, x, y, enemyNumber, bulletSprite, isChase, direction, path);
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
    			if (enemy.owner.direction === 1) 
    				enemy.body.velocity.x = 20;
    			else
    				enemy.body.velocity.x = -20;
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

	this.crossPath = function(enemy) {
		enemy.body.velocity.y = 200;
		if (enemy.owner.direction === 1) {
			enemy.body.velocity.x = 250;
			enemy.angle = -45;
		}
		else {
			enemy.body.velocity.x = -250;
			enemy.angle = 45;
		}		
	}

	this.chainedPath = function(enemy) {
		var vx = 150; 
		if (enemy.y <= 200) {
			if (enemy.owner.direction == 1)
				enemy.body.velocity.x = vx;
			else
				enemy.body.velocity.x = -vx;
			enemy.body.velocity.y = 100;
		}
		else if (enemy.y > 200 && enemy.y <= 400) {
			if (enemy.owner.direction == 1)
				enemy.body.velocity.x = -vx;
			else
				enemy.body.velocity.x = vx;
		}
		else if (enemy.y > 400) {
			if (enemy.owner.direction == 1)
				enemy.body.velocity.x = vx;
			else
				enemy.body.velocity.x = -vx;
		}
	}
}