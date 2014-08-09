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

var StarEffects = function(loop) {
	this.loop = loop;
	this.effects = game.add.group();
	this.effects.enableBody = true;
    this.effects.physicsBodyType = Phaser.Physics.ARCADE;
    this.effects.createMultiple(60, 'star');
    this.effects.setAll('anchor.x', 0.5);
    this.effects.setAll('anchor.y', 0.5);
	
	this.play = function(x, y) {
        var star = this.effects.getFirstExists(false);
        if (star) {
            star.reset(x, y);
			star.body.gravity.y = 800;
			star.body.velocity.y = -200;
        }
    }
    
    this.update = function(player) {
        game.physics.arcade.overlap(player.sprite, this.effects, this.playerHitStar, null, this);
        this.effects.forEach(function(star){
			if (star) {
				if (star.x > w || star.y > h) {
					star.kill();
				}
			}
    	});
	}
	
	this.playerHitStar = function(player, star) {
		game.physics.arcade.moveToObject(star, {x:w, y:0}, 100, 300);
	}
}
