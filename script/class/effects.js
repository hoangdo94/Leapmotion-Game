var BulletHitEffects = function() {
    this.effects = game.add.group();
    this.effects.createMultiple(60, 'bulletHit', false);
    this.effects.setAll('anchor.x', 0.5);
    this.effects.setAll('anchor.y', 0.5);
    this.effects.callAll('animations.add', 'animations', 'hit',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 50, false);
    
    this.play = function(x, y) {
        var hit = this.effects.getFirstExists(false);
        if (hit) {
            hit.frame = 0;
            hit.reset(x, y - 50);
            hit.animations.play('hit');
        }
    }
    
    this.update = function() {
        this.effects.forEach(function(hit){
			if(hit.frame != 0){
				hit.kill();
			}
    	});
        
	}	
}

var BoomEffects = function() {
    this.effects = game.add.group();
    this.effects.createMultiple(60, 'explose', false);
    this.effects.setAll('anchor.x', 0.5);
    this.effects.setAll('anchor.y', 0.5);
    this.effects.callAll('animations.add', 'animations', 'boom',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20, false);
    
    this.play = function(x, y) {
        var boom = this.effects.getFirstExists(false);
        if (boom) {
            boom.frame = 0;
            boom.reset(x, y - 50);
            boom.animations.play('boom');
        }
    }
    
    this.update = function() {
        this.effects.forEach(function(hit){
			if(hit.frame != 0){
				hit.kill();
			}
    	});
        
	}	
}
