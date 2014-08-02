/*
 * Bullet Class
 */

var Bullet = function(script, strength) {
	this.script = script;
};

Bullet.prototype = {

	constructor: Bullet,
	
	fire: function() {
		
	},
	
	update: function() {
		
	}
	
	
};

/*
 * Laser class, inherits from Bullet
 */


var Laser = function(script, strength) {
	Bullet.call(this, script, strength);
}

Laser.prototype = Object.create(Bullet.prototype);

Laser.prototype.constructor = Laser;

Laser.prototype.fire = function() {
	
}

Laser.prototype.update = function() {
	
}