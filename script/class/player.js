var Player = function(spriteName, startPosition, hp) {
	this.HP = hp;
	this.level = 1;
	this.starNum = 0;
	this.power = 0;

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
	this.mainBullet = new Laser('laser', this);
	this.subBullet = new HomingBullet('homingbullet', this, null);
	this.superBullet = new SuperBullet('superbullet', this);
	
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
		if (this.HP > 0){
			game.world.bringToTop(this.sprite);
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
		
			this.power = this.superBullet.recharge * 100 / 1000;
			if (this.power > 100)
				this.power = 100;
			this.HUD.updatePower();
			this.HUD.updateSubBulletTimeText();
			this.HUD.updateStar();
		}
		
	},
	
	fire: function() {
		this.mainBullet.fire();
		if (this.subBullet.enabled) this.subBullet.fire();
	},
	
	fireSuper: function() {
		this.superBullet.fire(5);
	},

	initBullet: function(enemyManager) {
		this.subBullet.enemyManager = enemyManager;
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

	//player lives
	this.playerIcon = game.add.sprite(this.x,this.y,'playerIcon');
	this.xIcon1 = game.add.sprite(this.x + 40, this.y + 5, 'number');
	this.xIcon1.frame = 10;
	this.hpCount = game.add.sprite(this.x + 60, this.y + 5, 'number');
	this.hpCount.frame = this.player.HP;
	
	
	// This section is for new HUD
	this.hubBackgroundData = {x: this.x, y: this.y + 200, originWidth: 356}
	this.scale = this.hubBackgroundData.originWidth / 237;
	this.maxHP = this.player.HP;
	this.hpbarData = {x: this.hubBackgroundData.x + 57 * this.scale, y: this.hubBackgroundData.y + 10.5 * this.scale, originWidth: 173 * this.scale}
	this.hpbar = game.add.sprite(this.hpbarData.x, this.hpbarData.y, 'playerHPbar');
	this.hpbar.frame = 1;
	this.hpbar.height = 10 * this.scale;
	this.hpbar.width = this.hpbarData.originWidth;
	
	this.rechargebarData = {x: this.hubBackgroundData.x + 57 * this.scale, y: this.hubBackgroundData.y + 28.5 * this.scale, originWidth: 173 * this.scale}
	this.rechargebar = game.add.sprite(this.rechargebarData.x, this.rechargebarData.y, 'playerRechargebar');
	this.rechargebar.height = 9 * this.scale;
	this.rechargebar.width = this.rechargebarData.originWidth;
	this.hubBackground = game.add.sprite(this.hubBackgroundData.x, this.hubBackgroundData.y, 'hubBG')


	
	
	//player level
	this.playerLevel = game.add.text(this.x, this.y + 30, 'M.Bullet Level:', { font: '16px Arial', fill: '#fff' });
	this.levelText = game.add.text(this.x + 120, this.y + 28, '1 (0/4)', { font: '18px Arial Bold', fill: '#fff' });

	//sub bullet time
	this.subBulletTime = game.add.text(this.x, this.y + 50, 'S.Bullet Time:', { font: '16px Arial', fill: '#fff' });
	this.timeText = game.add.text(this.x + 120, this.y + 48, '0s', { font: '18px Arial Bold', fill: '#fff' });
	
	//star
	this.star = game.add.sprite(this.x + 100, this.y - 9, 'starnum');
	this.star.animations.add('normal', [0]);
	this.star.animations.add('change', [1]);
	this.star.animations.play('normal', 5, true);
	game.physics.enable(this.star, Phaser.Physics.ARCADE);
	this.starNum = game.add.text(this.star.x + 40, this.star.y + 12, 'unknown', { font: '20px Arial Bold', fill: '#fff' });

	//power
	this.power = game.add.text(this.x, this.y + 70, 'Skill Recharged: ', { font: '16px Arial', fill: '#fff' });
	this.powerText = game.add.text(this.x + 120, this.y + 70, '0%', { font: '18px Arial Bold', fill: '#fff' });
};

PlayerHUD.prototype = {

	constructor: PlayerHUD,

	updateHP: function(){
		this.hpCount.frame = this.player.HP;
		if (this.hpbarData.originWidth * this.player.HP / this.maxHP < 0)
			this.hpbar.width = 0;
		else
			this.hpbar.width = this.hpbarData.originWidth * this.player.HP / this.maxHP;
	},

	updateLevel: function(){
		if (this.player.level < 5) {
			this.levelText.text = this.player.level + ' (' + this.player.numOfPowerUpCollected + '/' + Math.pow(2, this.player.level+1) + ')';
		}
		else {
			this.levelText.text = '5 (MAXED)';
		}
	},

	updateSubBulletTimeText: function(){
		this.timeText.text = Math.ceil(this.player.subBulletTime/1000) + 's';
	},
	
	updateStar: function() {
		this.starNum.text = this.player.starNum;
		if (this.star.animations.currentAnim.loopCount > 0 && this.star.animations.currentAnim.name == 'change') {
			this.star.animations.play('normal', 5, true);
		}
	},
	
	updatePower: function() {
		this.powerText.text = this.player.power + '%';
		if (this.rechargebarData.originWidth * this.player.power / 100 < 0)
			this.rechargebar.width = 0;
		else
			this.rechargebar.width = this.rechargebarData.originWidth * this.player.power / 100;

	}
};