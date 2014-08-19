var LevelManager = function(enemyManager){
	this.enemyManager = enemyManager;
	this.level;
	this.currentWave = 0;
	this.announcement = game.add.text(w/2, h/2, ' ', { font: '50px Arial bold', fill: '#fff' });
	this.announcement.anchor.set(0.5);
	this.tween = game.add.tween(this.announcement).to({y: h/2-50}, 500).to({y: h/2}, 1000);
	this.time = 0;
};

LevelManager.prototype = {
	constructor: LevelManager,

	update: function() {
		if (this.enemyManager.isOutOfEnemies) {
			this.currentWave++;
			if (this.currentWave<5){
				this.addEnemy(Math.floor((Math.random() * 5) + 1), this.enemyManager.getRandromPathType(), 5);
			}
			else if (this.currentWave==10){
				this.enemyManager.addBoss('boss', w/2, h/10, 500);
			}
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
};
