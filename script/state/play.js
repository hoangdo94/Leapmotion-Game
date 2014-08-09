var playState = {

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.time = 0;
	
		//add background
		this.bg = game.add.tileSprite(0, 0, 2365, 1536, 'bg');
		var scale = w/this.bg.width;
		this.bg.scale.x =  scale;
		this.bg.scale.y =  scale;

		//add player
		var startPosition = {x:w / 2, y: h / 2}
		this.player = new Player('player', startPosition);

        //set the controller
		this.player.controller = new KeyboardController(this.player);
		//this.player.controller = new LeapController(this.player);

		//add enemy manager
		this.enemyManager = new EnemyManager(game, this.player);
		this.player.initBullet(this.enemyManager);

	},
	
	update: function() {
		//update background
		this.bg.tilePosition.y += 1;

		//update player
		this.player.update();

		//update enemies
		this.enemyManager.update(this.player);
		

		//for testing
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			if (game.time.now > this.time) {
				this.addEnemy(Math.floor((Math.random() * 5) + 1));
				this.time = game.time.now + 500;
			}
			
		}
	},

	//this is just some functions for testing the game
	addEnemy: function(type) {
		if (type < 3) {
			for (var i=0; i<5; i++){
				this.enemyManager.add(type, w/5 + 3*w/20*i, 0, 'enemylaserunchase', false);
			};
		} else {
			for (var i=0; i<5; i++){
				this.enemyManager.add(type, w/5 + 3*w/20*i, 0, 'enemylaserchase', true);
			};
		}
		
	},
}
