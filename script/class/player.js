var Player = function(spriteName, startPosition) {
	this.HP = 3;
	this.level = 1;

	this.numOfPowerUpCollected = 0;
	this.subBulletTime = 0;

	//add sprite
	this.sprite = game.add.sprite(startPosition.x, startPosition.y, spriteName);
	this.sprite.anchor.set(0.5);
	this.sprite.animations.add('fly',[0, 1]);
	this.sprite.animations.add('injured', [2]);
	this.sprite.animations.play('fly', 5, true);
	this.sprite.owner = this;
	
	//enable aracade physics for player sprite
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true; 
	
	this.controller = null;
	this.mainBullet = new Laser('laser', this, null);
	this.subBullet = new HomingMissile('rocket', this, null);
	this.superBullet = new SuperBullet('superbullet', this, null);
	
	// Effects
	this.openGlowEffects = new OPenGlowEffects(3);
	this.openGlowEffects.play(startPosition.x, startPosition.y);
	
	//HUD
	this.HUD = new PlayerHUD(this, 10, 10);
};
	
Player.prototype = {

	constructor: Player,

	getPos: function() { return {x: this.sprite.x, y: this.sprite.y}},
	update: function() {
		this.controller.update();
		this.mainBullet.update();
		this.subBullet.update();
		this.superBullet.update();
		this.openGlowEffects.update(this.sprite.x, this.sprite.y);
		// update animations
		if (this.sprite.animations.currentAnim.loopCount > 0 && this.sprite.animations.currentAnim.name == 'injured') {
			this.sprite.animations.play('fly', 5, true);
		}
		//update sub bullet time
		if (this.subBulletTime > 0){
			this.subBullet.enabled = true;

			this.subBulletTime -= game.time.elapsed;
			if (this.subBulletTime <= 0) {
				this.subBulletTime = 0;
				this.subBullet.enabled = false;
			}
		}
		this.HUD.updateSubBulletTimeText();
	},
	
	fire: function() {
		this.mainBullet.fire();
		if (this.subBullet.enabled) this.subBullet.fire();
	},
	
	fireSuper: function() {
		this.superBullet.fire(5);
	},

	initBullet: function(enemyManager) {
		this.mainBullet.enemyManager = enemyManager;
		this.subBullet.enemyManager = enemyManager;
		this.superBullet.enemyManager = enemyManager;
	},

	mainBulletPowerUp: function() {
		if (this.level < 5) this.level++;
		this.mainBullet.setLevel(this.level);
	}
};

var PlayerHUD = function(player, x, y) {
	this.player = player;
	this.x = x;
	this.y = y;

	this.hud = game.add.group();

	//player lives
	this.playerIcon = game.add.sprite(this.x,this.y,'playerIcon');
	this.xIcon1 = game.add.sprite(this.x + 40, this.y + 5, 'number');
	this.xIcon1.frame = 10;
	this.hpCount = game.add.sprite(this.x + 60, this.y + 5, 'number');
	this.hpCount.frame = this.player.HP;

	//player level
	this.playerLevel = game.add.text(this.x, this.y + 30, 'M.Bullet Level:', { font: '16px Arial', fill: '#fff' });
	this.levelText = game.add.text(this.x + 120, this.y + 28, '1 (0/4)', { font: '18px Arial Bold', fill: '#fff' });

	//sub bullet time
	this.subBulletTime = game.add.text(this.x, this.y + 50, 'S.Bullet Time:', { font: '16px Arial', fill: '#fff' });
	this.timeText = game.add.text(this.x + 120, this.y + 48, '0s', { font: '18px Arial Bold', fill: '#fff' });
};

PlayerHUD.prototype = {

	constructor: PlayerHUD,

	updateHP: function(){
		this.hpCount.frame = this.player.HP;
	},

	updateLevel: function(){
		this.levelText.text = this.player.level + ' (' + this.player.numOfPowerUpCollected + '/' + Math.pow(2, this.player.level+1) + ')';
	},

	updateSubBulletTimeText: function(){
		this.timeText.text = Math.ceil(this.player.subBulletTime/1000) + 's';
	},
};