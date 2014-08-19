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
		
		// CollisionManager
		this.collisionManager = new CollisionManager(this.player, this.enemyManager);

		this.boss = new Boss('boss1', w/2, h/10);

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
		
			// Collision
			this.collisionManager.update(this.player, this.enemyManager);
			
			
			if (this.enemyManager.isOutOfEnemies) {
				this.addEnemy(Math.floor((Math.random() * 5) + 1), this.enemyManager.getRandromPathType());
			}
			
			this.boss.update();
		}
	},

	//this is just some functions for testing the game
	addEnemy: function(type, path) {
		if (type < 3) {
			this.enemyManager.addEnemyGroup(type, 400, 50, 'enemylaserunchase', false, 5, path);
		} else {
			this.enemyManager.addEnemyGroup(type, 400, 50, 'enemylaserchase', true, 5, path);
		}
	},
};

