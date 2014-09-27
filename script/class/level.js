var LevelManager = function(player, enemyManager){
	this.player = player;
	this.enemyManager = enemyManager;
	this.level;
	this.currentWave = 0;
	this.announcement = game.add.text(w/2, h/2, 'text ', { font: '50px Arial bold', fill: '#fff' });
	this.announcement.anchor.set(0.5);
	this.tween = game.add.tween(this.announcement).to({y: h/2-50}, 500).to({y: h/2}, 1000).start();
	this.time = 0;
	this.requestNextWave = false;
	this.requested = false;

	this.line1;
	this.line2;
	this.line3;
	this.line4;
	this.line5;
	this.flag = true;

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
				switch (this.currentWave) {
					case 1:
						this.wave_1();
						break;
					case 2:
						this.wave_2();
						break;
					case 3:
						this.wave_3();
						break;
					case 4:
						this.wave_4();
						break;
			 		case 5:
						this.wave_5();
						break;
					case 6:
						this.wave_6();
						break;
					case 7:
						this.wave_7();
						break;
					case 8:
						this.wave_8();
						break;
					case 9:
						this.wave_9();
						break;
					case 10:
						this.wave_10();
						break;
					case 11:
						this.wave_11();
						break;
					case 12:
						this.wave_12();
						break;
					case 13:
						this.wave_13();
						break;
					case 14:
						this.wave_14();
						break;
					case 15:
						this.wave_15();
						break;
					case 16:
						this.wave_16();
						break;
					case 17:
						this.wave_17();
						break;
					case 18:
						this.wave_18();
						break;
					case 19:
						this.wave_19();
						break;
					case 20:
						this.wave_20();
						break;
					case 21:
						this.wave_21();
						break;
					default:
						status = 1; //win
        				score = this.player.starNum;
        				game.time.events.add(1000, function(){
        					gameMusic.stop();
        					game.state.start('end');
        				});
        				break;
				}
				
				this.requested = false;
			}, this);
		}
		
		if (this.currentWave == 8 || this.currentWave == 9 || this.currentWave == 18) {
			this.line1.fromSprite(this.enemyManager.sprites.getAt(0), this.enemyManager.sprites.getAt(3), false);
			this.line2.fromSprite(this.enemyManager.sprites.getAt(1), this.enemyManager.sprites.getAt(2), false);
			this.line3.fromSprite(this.enemyManager.sprites.getAt(1), this.enemyManager.sprites.getAt(4), false);
			this.line4.fromSprite(this.enemyManager.sprites.getAt(3), this.enemyManager.sprites.getAt(2), false);
			this.line5.fromSprite(this.enemyManager.sprites.getAt(4), this.enemyManager.sprites.getAt(0), false);
			if (this.currentWave == 9 && this.enemyManager.sprites.getAt(0).y >= 450 && this.enemyManager.sprites.length == 10) {
				for (var i = 0; i < 5; i++) {
					this.enemyManager.sprites.getAt(i).body.velocity.x = 0;
					this.enemyManager.sprites.getAt(i).body.velocity.y = 0;
				}
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
		for (var i = 0; i < 3; i++) {
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
		for (var i = 0; i < 5; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, Math.random()*(w-150) + 150, Math.random()*(-200)-50, 'enemylaserunchase', false, 1, this.enemyManager.RANDOMPATH);
			}
			else {
				this.enemyManager.addEnemy(type, Math.random()*(w-150) + 150, Math.random()*(-200)-50, 'enemylaserchase', true, 1, this.enemyManager.RANDOMPATH);
			}
		}
	},

	wave_8: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		if (type < 3) {
			this.enemyManager.addEnemy(type, w/2, 0, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
			this.enemyManager.addEnemy(type, w/2 - 150, -200, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
			this.enemyManager.addEnemy(type, w/2 + 150, -200, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
			this.enemyManager.addEnemy(type, w/2 - 75, -460, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
			this.enemyManager.addEnemy(type, w/2 + 75, -460, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
		}
		else {
			this.enemyManager.addEnemy(type, w/2, 0, 'enemylaserchase', true, 3, this.enemyManager.STRAIGHTPATH);
			this.enemyManager.addEnemy(type, w/2 - 150, -200, 'enemylaserchase', true, 3, this.enemyManager.STRAIGHTPATH);
			this.enemyManager.addEnemy(type, w/2 + 150, -200, 'enemylaserchase', true, 3, this.enemyManager.STRAIGHTPATH);
			this.enemyManager.addEnemy(type, w/2 - 75, -460, 'enemylaserchase', true, 3, this.enemyManager.STRAIGHTPATH);
			this.enemyManager.addEnemy(type, w/2 + 75, -460, 'enemylaserchase', true, 3, this.enemyManager.STRAIGHTPATH);		
		}

		for (var i = 0; i < 5; i++) {
			this.enemyManager.sprites.getAt(i).owner.HP = 10;
		}

		this.line1 = new Phaser.Line(this.enemyManager.sprites.getAt(0).x, this.enemyManager.sprites.getAt(0).y, this.enemyManager.sprites.getAt(4).x, this.enemyManager.sprites.getAt(4).y);
		this.line2 = new Phaser.Line(this.enemyManager.sprites.getAt(1).x, this.enemyManager.sprites.getAt(1).y, this.enemyManager.sprites.getAt(2).x, this.enemyManager.sprites.getAt(2).y);
		this.line3 = new Phaser.Line(this.enemyManager.sprites.getAt(1).x, this.enemyManager.sprites.getAt(1).y, this.enemyManager.sprites.getAt(4).x, this.enemyManager.sprites.getAt(4).y);
		this.line4 = new Phaser.Line(this.enemyManager.sprites.getAt(3).x, this.enemyManager.sprites.getAt(3).y, this.enemyManager.sprites.getAt(2).x, this.enemyManager.sprites.getAt(2).y);
		this.line5 = new Phaser.Line(this.enemyManager.sprites.getAt(0).x, this.enemyManager.sprites.getAt(0).y, this.enemyManager.sprites.getAt(3).x, this.enemyManager.sprites.getAt(3).y);
	},

	wave_9: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		this.wave_8();
		for (var i = 0; i < 5; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, w/2, -200 * i, 'enemylaserunchase', false, 3, this.enemyManager.CIRCLEPATH);
			}
			else
				this.enemyManager.addEnemy(type, w/2, -200 * i, 'enemylaserchase', true, 3, this.enemyManager.CIRCLEPATH);
		}
	},

	wave_10: function() {
		this.enemyManager.addBoss(w/2, h/10, 200, 1);
	},
	
	wave_11: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 5; i++) {
			if (type < 3)
				this.enemyManager.addEnemy(type, w/5 + 200*i, -50, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
			else
				this.enemyManager.addEnemy(type, w/5 + 200*i, -50, 'enemylaserchase', true, 3, this.enemyManager.STRAIGHTPATH);
		}
	},
	
	wave_12: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 5; i++) {
			this.enemyManager.addEnemy(type, w/5, -200 * i, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
		}
	},
	
	wave_13: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 5; i++) {
			if (type < 3)
				this.enemyManager.addEnemy(type, 4*w/5, -200 * i, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
			else
				this.enemyManager.addEnemy(type, 4*w/5, -200 * i, 'enemylaserchase', true, 3, this.enemyManager.STRAIGHTPATH);
		}
	},

	wave_14: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 5; i++) {
			if (type < 3)
				this.enemyManager.addEnemy(type, 4*w/5, -100 * i, 'enemylaserunchase', false, 3, this.enemyManager.CHAINEDPATH);
			else
				this.enemyManager.addEnemy(type, 4*w/5, -100 * i, 'enemylaserchase', true, 3, this.enemyManager.CHAINEDPATH);
		}
	},
	
	wave_15: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 5; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, w/4, -200 * i, 'enemylaserunchase', false, 1, this.enemyManager.CIRCLEPATH);
				this.enemyManager.addEnemy(type, 2*w/3, -200 * i, 'enemylaserunchase', false, 2, this.enemyManager.CIRCLEPATH);
			}
			else {
				this.enemyManager.addEnemy(type, w/4, -200 * i, 'enemylaserchase', true, 1, this.enemyManager.CIRCLEPATH);
				this.enemyManager.addEnemy(type, 2*w/3, -200 * i, 'enemylaserchase', true, 2, this.enemyManager.CIRCLEPATH);
			}
		}
	},
	
	wave_16: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 3; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, w/2, -200 * i, 'enemylaserunchase', false, 3, this.enemyManager.CIRCLEPATH);
				this.enemyManager.addEnemy(type, w/5, -250 * i, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
				this.enemyManager.addEnemy(type, 4*w/5, -250 * i, 'enemylaserunchase', false, 3, this.enemyManager.STRAIGHTPATH);
			}
			else {
				this.enemyManager.addEnemy(type, w/2, -200 * i, 'enemylaserchase', true,3, this.enemyManager.CIRCLEPATH);
				this.enemyManager.addEnemy(type, w/5, -250 * i, 'enemylaserchase', true, 3, this.enemyManager.STRAIGHTPATH);
				this.enemyManager.addEnemy(type, 4*w/5, -250 * i, 'enemylaserchase', true, 3, this.enemyManager.STRAIGHTPATH);
			}
		}
	},
	
	wave_17: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 3; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, w/2, -250 * i, 'enemylaserunchase', false, 1, this.enemyManager.BARPATH);
				this.enemyManager.addEnemy(type, w/5, -300 * i, 'enemylaserunchase', false, 1, this.enemyManager.BARPATH);
				this.enemyManager.addEnemy(type, 4*w/5, -300 * i, 'enemylaserunchase', false, 1, this.enemyManager.BARPATH);
			}
			else {
				this.enemyManager.addEnemy(type, w/2, -250 * i, 'enemylaserchase', true, 1, this.enemyManager.BARPATH);
				this.enemyManager.addEnemy(type, w/5, -300 * i, 'enemylaserchase', true, 1, this.enemyManager.BARPATH);
				this.enemyManager.addEnemy(type, 4*w/5, -300 * i, 'enemylaserchase', true, 1, this.enemyManager.BARPATH);
			}
		}
	},
	
	wave_18: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		this.wave_8();
		for (var i = 0; i < 3; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, w/5, -300 * i, 'enemylaserunchase', false, 1, this.enemyManager.BARPATH);
				this.enemyManager.addEnemy(type, 4*w/5, -300 * i, 'enemylaserunchase', false, 1, this.enemyManager.BARPATH);
			}
			else {
				this.enemyManager.addEnemy(type, w/5, -300 * i, 'enemylaserchase', true, 1, this.enemyManager.BARPATH);
				this.enemyManager.addEnemy(type, 4*w/5, -300 * i, 'enemylaserchase', true, 1, this.enemyManager.BARPATH);
			}
		}
	},
	
	wave_19: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 5; i++) {
			if (type < 3) {
				this.enemyManager.addEnemy(type, w/6 -50 - 300*i, -100 - 200*i, 'enemylaserunchase', false, 5, this.enemyManager.CIRCLEPATH); 				
			}
			else {
				this.enemyManager.addEnemy(type, w/6 -50 - 300*i, -100 - 200*i, 'enemylaserchase', true, 5, this.enemyManager.CIRCLEPATH);
			}
		}
	},
	
	wave_20: function() {
		var type = (Math.floor(this.currentWave/2) + 1)%5 + 1;
		for (var i = 0; i < 5; i++) {
		if (type < 3) {
			this.enemyManager.addEnemy(type, 4*w/5 - 50 + 300*i, -100 - 200*i, 'enemylaserunchase', false, 4, this.enemyManager.CIRCLEPATH);
			}
		else {
			this.enemyManager.addEnemy(type, 4*w/5 - 50 + 300*i, -100 - 200*i, 'enemylaserchase', true, 4, this.enemyManager.CIRCLEPATH);
			}
		}
	},
	
	wave_21: function() {
		this.enemyManager.addBoss(w/2, h/10, 500, 2);
	},
	

	render: function() {
		if ((this.currentWave == 8 && this.enemyManager.sprites.length == 5) || (this.currentWave == 9 && this.enemyManager.sprites.length == 10)) {
			game.debug.geom(this.line1, 'rgb(255,255,255)');
			game.debug.geom(this.line2, 'rgb(255,255,255)');
			game.debug.geom(this.line3, 'rgb(255,255,255)');
			game.debug.geom(this.line4, 'rgb(255,255,255)');
			game.debug.geom(this.line5, 'rgb(255,255,255)');
		}
	}
};
