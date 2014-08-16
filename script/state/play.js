var playState = {

	create: function() {
		playing = true;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.time = 0;
	
		//add background
		/*this.bg = game.add.tileSprite(0, 0, 2365, 1536, 'bg');
		var scale = w/this.bg.width;
		this.bg.scale.x =  scale;
		this.bg.scale.y =  scale;*/
		
		this.bg = new BackgroundControl();
		//add player
		var startPosition = {x:w / 2, y: h / 2}
		this.player = new Player('player', startPosition);

		this.bg.getOriginalPos(this.player);

		
        //set the controller
		if (controllerType == 1) this.player.controller = new KeyboardController(this.player);
		else this.player.controller = new LeapController(this.player);

		//add enemy manager
		this.enemyManager = new EnemyManager(game, this.player);
		this.player.initBullet(this.enemyManager);

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
		

			if (this.enemyManager.isOutOfEnemies) {
				this.addEnemy(Math.floor((Math.random() * 5) + 1), this.enemyManager.getRandromPathType());
			}
		}
	},

	//this is just some functions for testing the game
	addEnemy: function(type, path) {
		if (type < 3) {
			/*for (var i=0; i<5; i++){
				this.enemyManager.add(type, w/5 + 3*w/20*i, 50, 'enemylaserunchase', false, path);
			};*/
			this.enemyManager.addGroupPath(type, 400, 50, 'enemylaserunchase', false, 5, path);
		} else {
			/*for (var i=0; i<5; i++){
				this.enemyManager.add(type, w/5 + 3*w/20*i, 50, 'enemylaserchase', true, path);
			};*/
			this.enemyManager.addGroupPath(type, 400, 50, 'enemylaserchase', true, 5, path);
		}
	},
};

