var Level = function() {
	this.time = 0;
	this.enemies = [];
};

Level.prototype = {

	constructor: Level,

	addTimeMilestone: function(time) {
		this.enemies.push({timeMilestone: time, enemiesList: []});
	},

	addEnemy: function(time, enemyType, x, y) {
		//find if the time milstone is alreadry added
		var index = -1;
		for (var i=0; i<this.enemies.length; i++){
			if (time == this.enemies[i].timeMilestone) {
				index = i;
				break;
			}
		}
		//if not found, add timeMileStone, then this time index = enemies.length-1
		if (index == -1) {
			this.addTimeMilestone(time);
			index = this.enemies.length-1;
		}

		this.enemies[index].enemiesList.push({type: enemyType, position.x: x, position.y: y});
	},

	sort: function(){
		
	}
	
};

var LevelManager = function(enemyManager){
	this.enemyManager = enemyManager;
	this.level = null;
	this.currentWave = null;
	this.nextWave = null;
};

LevelManager.prototype = {

	constructor: LevelManager,

	loadLevel: function(level){
		this.level = level;
	},

	update: function() {

	},
};