/**
* Effects occur when bullet of enemy hit player
* @constructor
* @param {number} loop - denfine the number of times the animation of this effects play
*/
var BulletHitEffects = function(loop) {
    this.loop = loop;
    this.effects = game.add.group();
    this.effects.createMultiple(60, 'bulletHit', false);
    this.effects.setAll('anchor.x', 0.5);
    this.effects.setAll('anchor.y', 0.5);
    this.effects.callAll('animations.add', 'animations', 'hit',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 50, true);
    
    this.play = function(x, y) {
        var hit = this.effects.getFirstExists(false);
        if (hit) {
            hit.reset(x, y - 50);
			hit.animations.play('hit', 50, true);
        }
    }
    
    this.update = function() {
       this.effects.forEach(function(hit){
			if(hit.animations.currentAnim.loopCount == loop - 1){
				hit.kill();
			}
    	});
	}	
}

/**
* Effects occur when enemy explose
* @constructor
* @param {number} loop - denfine the number of times the animation of this effects play
*/
var BoomEffects = function(loop) {
    this.loop = loop;
    this.effects = game.add.group();
    this.effects.createMultiple(60, 'explose', false);
    this.effects.setAll('anchor.x', 0.5);
    this.effects.setAll('anchor.y', 0.5);
    this.effects.callAll('animations.add', 'animations', 'boom',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20, true);

    this.play = function(x, y) {
        var boom = this.effects.getFirstExists(false);
		// reset loopCount
        if (boom) {
            boom.reset(x, y);
			boom.animations.currentAnim.restart();
        }
    }
    
    this.update = function() {
       	this.effects.forEach(function(boom){
			if(boom.animations.currentAnim.loopCount == loop){
				boom.kill();
			}
    	});
        
	}	
}

/**
* Effects occur when player is being in safestate
* @constructor
* @param {number} loop - denfine the number of times the animation of this effects play
*/
var OPenGlowEffects = function(loop) {
	this.loop = loop;
	this.effects = game.add.group();
    this.effects.createMultiple(60, 'glow', false);
    this.effects.setAll('anchor.x', 0.5);
    this.effects.setAll('anchor.y', 0.5);
    this.effects.callAll('animations.add', 'animations', 'glow',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 25, true);
	this.play = function(x, y) {
        var glow = this.effects.getFirstExists(false);
        if (glow) {
            glow.reset(x, y);
            glow.animations.currentAnim.restart();
			glow.alpha = 0;
			game.add.tween(glow).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 3, true);
        }
    }
    
    this.update = function(x, y) {
        this.effects.forEach(function(glow){
			if (glow.exists) {
				glow.x = x;
				glow.y = y;
			}
			
			if (glow.animations.currentAnim.loopCount == loop) {
				glow.kill();
			}
    	});
	}	
}

/**
* Effects occur when player hit star
* @constructor
* @param {Player} player - references to current Player instance
*/
var StarEffects = function(player) {
	this.player = player;
	this.effects = game.add.group();
	this.effects.enableBody = true;
    this.effects.physicsBodyType = Phaser.Physics.ARCADE;
    this.effects.createMultiple(60, 'star');
    this.effects.setAll('anchor.x', 0.5);
    this.effects.setAll('anchor.y', 0.5);
	this.starLimitTime = 0;
	this.add = false;
	this.play = function(x, y) {
        var star = this.effects.getFirstExists(false);
        if (star && this.starLimitTime < game.time.now) {
            star.reset(x, y);
			star.body.gravity.y = 800;
			star.body.velocity.y = -200;
			this.starLimitTime = game.time.now + 10;
        }
    }
    
    this.update = function(player) {
		game.physics.arcade.overlap(player.HUD.star, this.effects, this.updateStarNum, null, this);
        game.physics.arcade.overlap(player.sprite, this.effects, this.playerHitStar, null, this);
        this.effects.forEach(function(star){
            star.rotation += 0.1;
			if (star) {
				if (star.x > w || star.y > h) {
					star.kill();
				}
			}
    	});
		
		if(this.add) {
			player.starNum += 1;
			player.HUD.star.animations.play('change', 10, true);
			this.add = false;
		}
	}
	
	this.playerHitStar = function(player, star) {
		game.physics.arcade.moveToObject(star, {x: player.owner.HUD.star.x + 10, y: player.owner.HUD.star.y - 30}, 100, 300);		
	}
	
	this.updateStarNum = function(starNum, star) {
		star.kill();
		this.add = true;
	}
}

/**
* Effects occur when player hit powerup
* @constructor
* @param {numbe} type - type of powerup
*/
var PowerUpEffects = function(type) {
    this.type = type;
    this.effects = game.add.group();
    this.effects.enableBody = true;
    this.effects.physicsBodyType = Phaser.Physics.ARCADE;
    this.effects.createMultiple(30, (this.type == 'main')?'mainPowerup':'subPowerup');
    this.effects.setAll('anchor.x', 0.5);
    this.effects.setAll('anchor.y', 0.5);
    
    this.play = function(x, y) {
        var powerUp = this.effects.getFirstExists(false);
        if (powerUp) {
            powerUp.reset(x, y);
            powerUp.body.gravity.y = 400;
            powerUp.body.velocity.y = -200;
        }
    }
    
    this.update = function(player) {
        game.physics.arcade.overlap(player.sprite, this.effects, this.playerHitPowerUp, null, this);
        this.effects.forEach(function(powerUp){
            if (powerUp) {
                if (powerUp.x > w || powerUp.y > h) {
                    powerUp.kill();
                }
            }
        });
    }
    
    this.playerHitPowerUp = function(player, powerUp) {
        powerUp.kill();
        if (this.type == 'main') {
            player.owner.numOfPowerUpCollected++;
            if (player.owner.numOfPowerUpCollected == Math.pow(2, player.owner.level+1)){
                player.owner.mainBulletPowerUp();
                player.owner.numOfPowerUpCollected = 0;
            }
            player.owner.HUD.updateLevel();
        }
        else {
            player.owner.subBulletTime += player.owner.level * 3000;
        }
    }
}

/**
* Handle background controlling during the gametime
* @constructor
*/
var BackgroundControl = function() {
	this.bg = game.add.tileSprite(0, 0, 2365, 1536, 'bg');
	var scale = w/this.bg.width;
	this.bg.scale.x =  scale;
	this.bg.scale.y =  scale;
	
	this.planet1 = game.add.sprite(300, 0, 'planet1');
	game.physics.enable(this.planet1, Phaser.Physics.ARCADE);
	
	this.planet2 = game.add.sprite(800, -700, 'planet2');
	game.physics.enable(this.planet2, Phaser.Physics.ARCADE);
	this.planet2Tween = game.add.tween(this.planet2.scale).to({ x: 2, y: 2}, 120000);
	this.planet2Flag = true;
	
	this.planet3 = game.add.sprite(1400, -900, 'planet3');
	game.physics.enable(this.planet3, Phaser.Physics.ARCADE);
	this.planet3Tween = game.add.tween(this.planet3).to({x: 0, y: 1600}, 120000);
	this.planet3Flag = true;
	
	this.playerOriginPos = {};
	this.update = function(player) {
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.bg.tilePosition.x += 0.3;
			this.planet1.body.velocity.x = 23;
			this.planet2.body.velocity.x = 15;
			this.planet3.body.velocity.x = 25;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.bg.tilePosition.x += -0.3;
			this.planet1.body.velocity.x = -23;
			this.planet2.body.velocity.x = -15;
			this.planet3.body.velocity.x = -25;
		} else {
			this.planet1.body.velocity.x = 0;
			this.planet2.body.velocity.x = 0;
			this.planet3.body.velocity.x = 0;
		}
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.planet1.body.velocity.y = 28;
			this.planet2.body.velocity.y = 20;
			if (!this.planet3Flag)
				this.planet3.body.velocity.y = 20;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.planet1.body.velocity.y = -4;
			this.planet2.body.velocity.y = 0;
			if (!this.planet3Flag)
				this.planet3.body.velocity.y = 0;
		} else {
			this.planet1.body.velocity.y = 13;
			this.planet2.body.velocity.y = 5;
			if (!this.planet3Flag)
				this.planet3.body.velocity.y = 5;
		}
		
		if (this.planet2.y > -100 && this.planet2Flag) {
			this.planet2Tween.start();
			this.planet2Flag = false;
		}
		
		if (this.planet1.y > 500 && this.planet3Flag) {
			this.planet3Tween.start();
			this.planet3Flag = false;
			
		}
		this.bg.tilePosition.y += 0.5;
	}
	
	this.getOriginalPos = function(player) {
		this.playerOriginPos.x = player.sprite.x;
		this.playerOriginPos.y = player.sprite.y;
	}
}


/**
* Handle Collision
* @constructor
* @param player - current game player, instance of Player
* @param enemyManager - current instance of EnemyManager
*/
var CollisionManager = function(player, enemyManager) {
    this.player = player;
    this.enemyManager = enemyManager;
    this.boomEffect = new BoomEffects(1);
	this.bossBoomEffect = new BossBoomEffects(1);
    
    this.update = function() {
        if (this.player && this.enemyManager) {
            game.physics.arcade.overlap(this.player.mainBullet.bullets, this.enemyManager.sprites, this.bulletHitEnemy, null, this);
            game.physics.arcade.overlap(this.player.subBullet.bullets, this.enemyManager.sprites, this.bulletHitEnemy, null, this);
            game.physics.arcade.overlap(this.player.superBullet.bullets, this.enemyManager.sprites, this.bulletHitEnemy, null, this);
            
            this.enemyManager.sprites.forEach(this.updateOperating, this, false, this.player);          
        }
        
        this.boomEffect.update();
		this.bossBoomEffect.update();
    }
    
    this.updateOperating = function(enemy, player) {
        game.physics.arcade.overlap(player.sprite, enemy.owner.bullet.bullets, this.bulletHitPlayer, null, this);
    }
    
    this.bulletHitEnemy = function(bullet, enemy) {
		if (enemy.owner.isBoss == false) {
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
        } else if (enemy.owner.isBoss == true){
			
				if (enemy.y > 0) {
					if (enemy.owner.HP <= 0) {
						enemy.exists = false;
						this.bossBoomEffect.play(enemy.x, enemy.y);
					}
					bullet.kill();
					enemy.owner.HP--;
					enemy.animations.play('injured', 20, true);
				}
			/*
			if (enemy.y > 0) {
				if (enemy.owner.HP <= 0) {
					enemy.kill();
					this.bossBoomEffect.play(enemy.x, enemy.y);
				}
				bullet.kill();
				enemy.owner.HP--;
				enemy.animations.play('injured', 20, true);
			}*/
		}
    }
    
    this.bulletHitPlayer = function(player, bullet) {
        bullet.kill();
        player.animations.play('injured', 20, true);
        player.owner.HP--;
        player.owner.HUD.updateHP();
        if (player.owner.HP == 0) {
        }
    }
	
	/* pixelcollision: http://shin.cl/pixelperfect/main.js */
}

var BossBoomEffects = function(loop) {
    this.loop = loop;
    this.effects = game.add.group();
    this.effects.createMultiple(60, 'explose', false);
    this.effects.setAll('anchor.x', 0.5);
    this.effects.setAll('anchor.y', 0.5);
    this.effects.callAll('animations.add', 'animations', 'boom',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20, true);
	this.timing = 0;
	this.boomNo = 0;
	this.finished = true;
	this.x;
	this.y;
    this.play = function(x, y) {
		this.x = x;
		this.y = y;
		this.boomNo = 0;
		this.finished = false;
	}
	
    this.playBoom = function(x, y) {
        if (this.timing < game.time.now) {
			var boom = this.effects.getFirstExists(false);
			// reset loopCount
			if (boom) {
				boom.reset(x + this.getRandomPos(), y + this.getRandomPos());
				boom.animations.currentAnim.restart();
			}
			this.timing = game.time.now + 30;
			this.boomNo += 1;
		}
        
    }
    
    this.update = function() {
       	this.effects.forEach(function(boom){
			if(boom.animations.currentAnim.loopCount == loop){
				boom.kill();
			}
    	});
        
        if (!this.finished) {
			this.playBoom(this.x, this.y);
		}
		
		if (this.boomNo >= 50) {
			this.finished = true;
		}
	}
	
	this.getRandomPos = function() {
		var n = Math.floor(Math.random() * 3);
		var pos = Math.floor(Math.pow(1, n) * Math.random() * 200);
		return pos;
		
	}
}