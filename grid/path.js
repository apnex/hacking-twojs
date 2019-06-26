#!/usr/bin/env node

// constructor
function path() {
	this.optDefaults = optDefaults;
	this.styleDefaults = styleDefaults;
	return this;
};
//module.exports = path;

const opts = {
	scale: {
		x: 10,
		y: 10
	}
};

function optDefaults(opt = {}) {
	// opt defaults
	if(typeof(opt.start) === 'undefined') {
		opt.start = 0;
	}
	if(typeof(opt.end) === 'undefined') {
		opt.end = 0;
	}
	if(typeof(opt.close) === 'undefined') {
		opt.close = 0;
	}
	if(typeof(opt.scale) === 'undefined') {
		opt.scale = opts.scale;
	}
	if(typeof(opt.radius) === 'undefined') {
		opt.radius = opts.scale.x / 2;
	}
	return opt;
}

function styleDefaults(style = {}, opt = optDefaults()) {
	// style defaults
	if(typeof(style.linewidth) === 'undefined') {
		style.linewidth = opt.scale.x / 2;
	}
	if(typeof(style.stroke) === 'undefined') {
		style.stroke = colours['mLight-Blue-600'];
	}
	if(typeof(style.fill) === 'undefined') {
		style.fill = 'none';
	}
	return style;
}

function makePath(points, opt = {}, style = {}) {
	opt = optDefaults(opt);
	style = styleDefaults(style, opt);

	// add a check for roundCorners (radius < 0.0001 ?)
	let newPoints = a.roundCorners(buildPath(points, opt.scale), opt.radius, opt.close);

	// gridLines
	if(opt.handles) {
		//main.add(showGrid(icon, opt)); // needs the grid 'icon'
		main.add(showHandles(newPoints, opt));
		style.fill = 'none';
		style.stroke = colours['mIndigo-400'];
		style.linewidth = opt.scale.x / 6;
	}

	let path = new Two.Path(a.toAnchors(newPoints, 1), false, false, true);
	path.linewidth = style.linewidth;
	path.stroke = style.stroke;
	path.fill = style.fill;
	return path;
}

// translate points to scale
function buildPath(points, scale) {
	return points.map((point) => {
		return {
			x: point.x, // * scale.x,
			y: point.y //* scale.y
		};
	});
}

// add path with end points
function addPath(points, opt = {}, style = {}) {
	opt = optDefaults(opt);
	style = styleDefaults(style, opt);
	let pGroup = new Two.Group();
	let newPath = buildPath(points, opt.scale);
	pGroup.add(makePath(points, opt, style));
	if(opt.start) {
		let start = opt.start.clone()
		start.translation.set(newPath[0].x, newPath[0].y);
		pGroup.add(start);
	}
	if(opt.end) {
		let end = opt.end.clone()
		end.translation.set(newPath[newPath.length - 1].x, newPath[newPath.length - 1].y);
		pGroup.add(end);
	}
	return pGroup;
}
