// arrow constructor
var Arrow = function(obj, path) {
	this.obj = obj;
	this.pos = 0;
	this.path = path;
	this.length = path.getTotalLength();
	this.speed = path.getTotalLength() / 1000;
	this.box = obj.getBBox();
};
Arrow.prototype.update = function() {
	this.pos += this.speed;
	this.pos = this.pos >= this.length ? 0 : this.pos;
	this.render();
};
Arrow.prototype.pathDir = function(path) {
	var pt1 = path.getPointAtLength(this.pos - 2);
	var pt2 = path.getPointAtLength(this.pos + 2);
	var angle = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x) * (180 / Math.PI);
	return angle;
};
Arrow.prototype.render = function() {
	// as the arrow doesn't start at 0,0 we need to calculate its centre
	var X = +(this.box.x + (this.box.width / 2)).toFixed(1);
	var Y = +(this.box.y + (this.box.height / 2)).toFixed(1);
	// find out it's point along the path, then calculate the new X and Y positions:
	let mp = this.path.getPointAtLength(this.pos);
	let tX = mp.x - X;
	let tY = mp.y - Y;
	// get the rotation at the path point:
	let tR = this.pathDir(this.path) - 180; // adjusted to face the correct direction
	// apply the new attributes - note: setting X and Y on the rotate is essential if not at 0,0!
	this.obj.setAttribute('transform', 'translate(' + tX + ', ' + tY + ') rotate(' + tR + ' ' + X + ' ' + Y + ') scale(0.3 0.3)');
	this.obj.setAttribute('opacity', 1);
};
