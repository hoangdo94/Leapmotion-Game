var playState = {

	create: function() {
		playing = true;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.time = 0;
	
		//add background
		this.bg = new BackgroundControl();
		
		//add player
		this.playerPosition = {x:w / 2, y: h - 100};
		this.player = new Player('player', this.playerPosition, 70);

		this.bg.getOriginalPos(this.player);

		//set the controller
		if (controllerType == 1) this.player.controller = new KeyboardController(this.player);
		else this.player.controller = new LeapController(this.player);

		//add enemy manager
		this.enemyManager = new EnemyManager(this.player);
		this.player.initBullet(this.enemyManager);
		
		//Level Manager
		this.levelManager = new LevelManager(this.player, this.enemyManager);

		// CollisionManager
		this.collisionManager = new CollisionManager(this.player, this.enemyManager);

		gameMusic = game.add.audio('gameMusic',1,true);
		gameMusic.play();
	},
	
	update: function() {
		//update background
		this.bg.update();

		//update player
		this.player.update();

		//update enemies
		this.enemyManager.update(this.player);
		
		//update enemy waves
		this.levelManager.update();

		// Collision
		this.collisionManager.update(this.player, this.enemyManager);
	},
	
// 	render: function() {
// 		this.levelManager.render();
// 	}
};

