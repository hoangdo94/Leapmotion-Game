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
		this.player.mainBullet.enemyManager = this.enemyManager;
		this.player.subBullet.enemyManager = this.enemyManager;	

		//testing
		game.add.text(10,10, 'Testing mode \n - Q: add a random wave of emenies\n - W: toggle sub weapon\n - E: toogle main weapon Level', { font: '20px Arial', fill: '#fff' });
		game.add.text(10,h-80, 'Sub weapon enabled:\nMain weapon level: ', { font: '20px Arial', fill: '#fff' });
		this.swtext = game.add.text(220,h-80, 'false', { font: '20px Arial', fill: '#abc' });
		this.mwtext = game.add.text(220,h-56, '1', { font: '20px Arial', fill: '#abc' });
		this.addEnemy(2);
	},
	
	update: function() {
		//update background
		this.bg.tilePosition.y += 1;

		//update player
		this.player.update();

		//update enemies
		this.enemyManager.update();
		

		//for testing
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			if (game.time.now > this.time) {
				this.addEnemy(Math.floor((Math.random() * 5) + 1));
				this.time = game.time.now + 500;
			}
			
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
			if (game.time.now > this.time) {
				this.toggleSubBullet();
				this.time = game.time.now + 500;
			}
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.E)) {
			if (game.time.now > this.time) {
				this.toggleBulletLevel();
				this.time = game.time.now + 500;
			}
		}
	},

	//this is just some functions for testing the game
	addEnemy: function(type) {
		for (var i=0; i<5; i++){
			this.enemyManager.add(type, w/5 + 3*w/20*i, 0);
		};
	},

	toggleSubBullet: function() {
		this.player.subBullet.enabled = !this.player.subBullet.enabled;
		this.swtext.text = this.player.subBullet.enabled;
	},

	toggleBulletLevel: function() {
		this.player.level++;
		if (this.player.level > 5) this.player.level = 1;
		this.mwtext.text = this.player.level;
		this.player.mainBullet.setLevel(this.player.level);
	}

}
