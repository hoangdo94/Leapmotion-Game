var Player = function(spriteName, startPosition, hp) {
	this.HP = hp;
	this.level = 1;
	this.starNum = 0;
	this.power = 0;

	this.numOfPowerUpCollected = {temp: 0, total: 0};
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

var PlayerHUD = function(player, posX, posY) {
	this.player = player;
	
	// This section is for new HUD
	this.hubBackgroundData = {x: posX, y: posY, originWidth: 356}
	this.scale = this.hubBackgroundData.originWidth / 237;
	this.maxHP = this.player.HP;
	//HP bar
	this.hpbarData = {x: this.hubBackgroundData.x + 57 * this.scale, y: this.hubBackgroundData.y + 10.5 * this.scale, originWidth: 173 * this.scale}
	this.hpbar = game.add.sprite(this.hpbarData.x, this.hpbarData.y, 'playerHPbar');
	this.hpbar.frame = 1;
	this.hpbar.height = 10 * this.scale;
	this.hpbar.width = this.hpbarData.originWidth;
	
	this.rechargebarData = {x: this.hubBackgroundData.x + 11 * this.scale, y: this.hubBackgroundData.y + 48.5 * this.scale, originWidth: 37 * this.scale, originHeight: -43 * this.scale}
	this.rechargebar = game.add.sprite(this.rechargebarData.x, this.rechargebarData.y, 'playerRechargebar');
	this.rechargebar.height = this.rechargebarData.originHeight;
	this.rechargebar.width = this.rechargebarData.originWidth;
	this.hubBackground = game.add.sprite(this.hubBackgroundData.x, this.hubBackgroundData.y, 'hubBG')

	//Bullet bar
	this.bulletbarData = {x: this.hubBackgroundData.x + 57 * this.scale, y: this.hubBackgroundData.y + 28.5 * this.scale, originWidth: 173 * this.scale}
	this.bulletbar = game.add.sprite(this.bulletbarData.x, this.bulletbarData.y, 'playerbulletbar');
	this.bulletbar.height = 9 * this.scale;
	this.bulletbar.width = 0;
	
	//star
	this.star = game.add.sprite(this.hubBackgroundData.x + 100, this.hubBackgroundData.y + 75, 'starnum');
	this.star.animations.add('normal', [0]);
	this.star.animations.add('change', [1]);
	this.star.animations.play('normal', 5, true);
	game.physics.enable(this.star, Phaser.Physics.ARCADE);
	this.starNum = game.add.text(this.star.x + 40, this.star.y + 12, 'unknown', { font: '20px Arial Bold', fill: '#fff' });

	this.hubBackground = game.add.sprite(this.hubBackgroundData.x, this.hubBackgroundData.y, 'hubBG')

	//text
	this.bulletText = game.add.text(this.bulletbarData.x + this.bulletbarData.originWidth/2, this.bulletbarData.y + 7, 'LEVEL 1', { font: '16px Arial Bold', fill: '#fff' });
	this.bulletText.anchor.set(0.5);
	this.timeText = game.add.text(this.hubBackgroundData.x + 38, this.hubBackgroundData.y + 92, '0s', { font: '18px Arial Bold', fill: '#fff' });
	this.timeText.anchor.set(0.5);
};

PlayerHUD.prototype = {

	constructor: PlayerHUD,

	updateHP: function(){
		if (this.hpbarData.originWidth * this.player.HP / this.maxHP < 0)
			this.hpbar.width = 0;
		else
			this.hpbar.width = this.hpbarData.originWidth * this.player.HP / this.maxHP;
	},

	updateLevel: function(){
		if (this.player.level < 5) {
			this.bulletbar.width = this.bulletbarData.originWidth * this.player.numOfPowerUpCollected.total / 60;
			this.bulletText.text = 'LEVEL ' + this.player.level;
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
		if (Math.abs(this.rechargebarData.originHeight) * this.player.power / 100 < 0)
			this.rechargebar.height = 0;
		else
			this.rechargebar.height = -Math.abs(this.rechargebarData.originHeight) * this.player.power / 100;
	}
};