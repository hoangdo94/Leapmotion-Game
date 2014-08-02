var playState = {

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
	
		//add background
		this.bg = game.add.tileSprite(0, 0, 2365, 1536, 'bg');
		var scale = w/this.bg.width;
		this.bg.scale.x =  scale;
		this.bg.scale.y =  scale;

		//add player
		var startPosition = {x:w / 2, y: h / 2}
		this.player = new Player(game, 'playerSprite', startPosition);
	},
	
	update: function() {
		//update background
		this.bg.tilePosition.y += 1;

		//update player
		this.player.update();
	},
}
