var playState = {

	create: function() {
		this.bg = game.add.tileSprite(0, 0, 2365, 1536, 'bg');
		var scale = w/this.bg.width;
		this.bg.scale.x =  scale;
		this.bg.scale.y =  scale;
		
		
		var playerSprite = game.add.sprite(100, 100, 'playerSprite');
		var controller = new Controller(this.game);
		this.player = new Player(controller, playerSprite);
	},
	
	update: function() {
		this.bg.tilePosition.y += 1;
		
		
		this.player.update();
	},
}
