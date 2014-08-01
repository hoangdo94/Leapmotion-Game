var playState = {

	create: function() {
		this.bg = game.add.tileSprite(0, 0, 2365, 1536, 'bg');
		var scale = w/this.bg.width;
		this.bg.scale.x =  scale;
		this.bg.scale.y =  scale;
	},
	
	update: function() {
		this.bg.tilePosition.y += 1;
	},
}
