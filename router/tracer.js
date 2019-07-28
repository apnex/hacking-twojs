// tracer constructor
var tracer = function(path, obj) {
	this.pos = 0;
	this.path = path;
	this.length = path.getTotalLength();
	this.speed = path.getTotalLength() / 1000;
	//this.obj = obj;
	//this.box = obj.getBBox();

	this.running = 0;
	this.distance;
	this.timer;
	this.fps = 60;
	this.dur = 4000;
	this.state = {
		int: 1000 / this.fps,
		distpnt: this.length / this.dur,
		distint: (this.length / this.dur) * (1000 / this.fps)
	}
	//console.log('length: ' + this.length + ' duration: ' + this.dur + ' distance: ' + this.state.distint);
	return this;
};
tracer.prototype.start = function() {
	if(!this.running) {
		console.log('start trace: ' + this.path.id);
		this.distance = 0;
		this.running = 1;
		this.timer = setInterval(this.update.bind(this), this.state.int);
	} else {
		console.log('trace: ' + this.path.id + ' already running!');
	}
};
tracer.prototype.update = function() {
	this.distance += this.state.distint;
	this.path.style.strokeDasharray = [this.distance, this.length].join(' ');
	if(this.distance >= this.length) {
		console.log('end trace: ' + this.path.id + ' distance: ' + this.distance + ' length: ' + this.length); // not ending properly
		clearInterval(this.timer);
		this.running = 0;
	}
};
tracer.prototype.stop = function() {
	console.log('stop trace: ' + this.path.id);
	clearInterval(this.timer);
	this.running = 0;
	this.path.style.stroke = '';
	this.path.style.strokeDasharray = '';
};
