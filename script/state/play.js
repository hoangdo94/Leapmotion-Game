var playState = {

	create: function() {
		playing = true;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.time = 0;
	
		//add background
		this.bg = new BackgroundControl();
		
		//add player
		var startPosition = {x:w / 2, y: h / 2}
		this.player = new Player('player', startPosition);

		this.bg.getOriginalPos(this.player);

        //set the controller
		if (controllerType == 1) this.player.controller = new KeyboardController(this.player);
		else this.player.controller = new LeapController(this.player);

		//add enemy manager
		this.enemyManager = new EnemyManager(this.player);
		this.player.initBullet(this.enemyManager);
		
		//Level Manager
		this.levelManager = new LevelManager(this.enemyManager);

		// CollisionManager
		this.collisionManager = new CollisionManager(this.player, this.enemyManager);
	},
	
	update: function() {
		if (playing) {
			//update background
			//this.bg.tilePosition.y += 1;
			this.bg.update(this.player);

			//update player
			this.player.update();

			//update enemies
			this.enemyManager.update(this.player);
		
			//update enemy waves
			this.levelManager.update();

			// Collision
			this.collisionManager.update(this.player, this.enemyManager);
			
			
		}
	},
	
};

