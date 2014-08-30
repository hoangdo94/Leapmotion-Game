var LevelManager = function(enemyManager){
	this.enemyManager = enemyManager;
	this.level;
	this.currentWave = 0;
	this.announcement = game.add.text(w/2, h/2, 'text ', { font: '50px Arial bold', fill: '#fff' });
	this.announcement.anchor.set(0.5);
	this.tween = game.add.tween(this.announcement).to({y: h/2-50}, 500).to({y: h/2}, 1000).start();
	this.time = 0;
	this.requestNextWave = false;
	this.requested = false;
};

LevelManager.prototype = {
	constructor: LevelManager,
	update: function() {
		if (this.enemyManager.isOutOfEnemies && !this.requested) {
		 	this.requestNextWave = true;
		}
		if (this.requestNextWave){
			this.requestNextWave = false;
			this.requested = true;
			game.time.events.add(1000, function() {
	 			this.currentWave++;
				if (this.currentWave<1){
					this.addEnemy((Math.floor(this.currentWave/2) + 1)%5 + 1, this.enemyManager.getRandromPathType(), this.currentWave%5 + 5);
				}
				else if (this.currentWave==1){
					this.enemyManager.addBoss('boss2', w/2, h/10, 500, 2);
				}
				this.requested = false;
		 	}, this);
		 }
		
	},

	loadLevel: function(level) {
		this.level = level;
		currentWave = 0;
	},

	addEnemy: function(type, path, count) {
		if (type < 3) {
			this.enemyManager.addEnemyGroup(type, 400, 50, 'enemylaserunchase', false, count, path);
		} else {
			this.enemyManager.addEnemyGroup(type, 400, 50, 'enemylaserchase', true, count, path);
		}
	},

	wave_1: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 3; i++) {
			if (type < 3)
				this.enemyManager.addEnemy(type, 200*i + 50, 0, 'enemylaserunchase', false, 1, this.enemyManager.STRAIGHTPATH);
			else
				this.enemyManager.addEnemy(type, 200*i + 50, 0, 'enemylaserchase', true, 1, this.enemyManager.STRAIGHTPATH);
		}
	},

	wave_2: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 3; i++) {
			if (type < 3)
				this.enemyManager.addEnemy(type, w - (200*i + 50), 0, 'enemylaserunchase', false, 2, this.enemyManager.STRAIGHTPATH);
			else {
				this.enemyManager.addEnemy(type, w - (200*i + 50), 0, 'enemylaserchase', true, 2, this.enemyManager.STRAIGHTPATH);
			}
		}
	},

	wave_3: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 3; i++) {
			if (type < 3)
				this.enemyManager.addEnemy(type, 200*i - 50, -150*i, 'enemylaserunchase', false, 1, this.enemyManager.CROSSPATH);
			else
				this.enemyManager.addEnemy(type, 200*i - 50, -150*i, 'enemylaserchase', true, 1, this.enemyManager.CROSSPATH);
		}
	},

	wave_4: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 3; i++) {
			if (type < 3)
				this.enemyManager.addEnemy(type, w - (200*i - 50), -150*i, 'enemylaserunchase', false, 2, this.enemyManager.CROSSPATH);
			else
				this.enemyManager.addEnemy(type, w - (200*i - 50), -150*i, 'enemylaserchase', true, 2, this.enemyManager.CROSSPATH);
		}
	},

	wave_5: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 3; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, -100*i + 200, -70*i, 'enemylaserunchase', false, 1, this.enemyManager.CHAINEDPATH);
				this.enemyManager.addEnemy(type, w - (-100*i + 200), -70*i, 'enemylaserunchase', false, 2, this.enemyManager.CHAINEDPATH);
			}
			else {
				this.enemyManager.addEnemy(type, -100*i + 200, -70*i, 'enemylaserchase', true, 1, this.enemyManager.CHAINEDPATH);
				this.enemyManager.addEnemy(type, w - (-100*i + 200), -70*i, 'enemylaserchase', true, 2, this.enemyManager.CHAINEDPATH);
			}
		}
	},

	wave_6: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 5; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, -100*i, -150*i, 'enemylaserunchase', false, 1, this.enemyManager.CROSSPATH);
				this.enemyManager.addEnemy(type, w - (-100*i), -150*i - 75, 'enemylaserunchase', false, 2, this.enemyManager.CROSSPATH);
			}
			else {
				this.enemyManager.addEnemy(type, -100*i, -150*i, 'enemylaserchase', true, 1, this.enemyManager.CROSSPATH);
				this.enemyManager.addEnemy(type, w - (-100*i), -150*i - 75, 'enemylaserchase', true, 2, this.enemyManager.CROSSPATH);
			}
		}
	},

	wave_7: function() {
		var type = Math.floor(Math.random()*5) + 1;
		for (var i = 0; i < 10; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, Math.random()*(w-150) + 150, Math.random()*(-200)-50, 'enemylaserunchase', false, 1, this.enemyManager.RANDOMPATH);
			}
			else {
				this.enemyManager.addEnemy(type, Math.random()*(w-150) + 150, Math.random()*(-200)-50, 'enemylaserchase', true, 1, this.enemyManager.RANDOMPATH);
			}
		}
	}
};
