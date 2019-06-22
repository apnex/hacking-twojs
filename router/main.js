var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();
var main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);
two.add(main);

var opts = {
	scale: {
		x: 10,
		y: 10
	}
};

// build an arrow;
let arrows = {
	body: [
		[0,0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,18,19,0,15,16,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,2,0,0,0,20,0,21,0,0,0,9,0,0,0,0,0],
		[7,0,0,0,0,1,0,0,0,0,0,0,0,0,0,8,0,0,0,0,14],
		[0,0,0,0,0,0,0,0,3,0,0,0,10,0,0,0,0,0,0,0,0],
		[6,0,0,0,0,5,0,0,0,0,0,0,0,0,0,12,0,0,0,0,13],
		[0,0,0,0,0,4,0,0,0,27,0,28,0,0,0,11,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,25,26,0,22,23,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0]
	],
	link: [
		[1, 2, 3, 4, 5, 6, 7],
		[8, 9, 10, 11, 12, 13, 14],
		[15, 16, 17, 18, 19, 20, 21],
		[22, 23, 24, 25, 26, 27, 28]
	]
};

// add hex border
main.add(makePath(
	makeHex(0, 0, 13),
	{
		close: 1,
		radius: 20
	}, {
		linewidth: 15,
		stroke: colours['mRed-100'],
		fill: colours['mRed-500']
	}
));

let symbol = new Two.Group();
let arrowList = mapPath(arrows);
symbol.add(makePath(arrowList[0], {close: 1}));
symbol.add(makePath(arrowList[1], {close: 1}));
symbol.add(makePath(arrowList[2], {close: 1}));
symbol.add(makePath(arrowList[3], {close: 1}));
symbol.center();
symbol.stroke = colours['mRed-50'];
main.add(symbol);

//let size = buildPath([getSize(arrows)])[0];
//console.log(size);

/*
let circle = two.makeCircle(0, 0, (size.x / 2) + 20);
circle.fill = 'none';
circle.stroke = colours['mLight-Green-300'];
circle.linewidth = 8;
main.add(circle);
*/


function getSize(grid) {
	return {
		x: grid.body[0].length,
		y: grid.body.length
	};
}

function shiftx(grid) {
	let data = JSON.parse(JSON.stringify(grid));
	data.body.forEach((row) => {
		row.reverse();
	});
	return data;
}

function flipx(grid) {
	let data = JSON.parse(JSON.stringify(grid));
	data.body.forEach((row) => {
		row.reverse();
	});
	return data;
}

function flipy(grid) {
	let data = JSON.parse(JSON.stringify(grid));
	data.body.reverse();
	return data;
}

function addPath(points, opt = {}, style = {}) {
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
	if(typeof(opt.radius) === 'undefined') {
		opt.radius = opts.scale.x / 2;
	}
	// style defaults
	if(typeof(style.linewidth) === 'undefined') {
		style.linewidth = 8;
	}
	if(typeof(style.stroke) === 'undefined') {
		style.stroke = colours['mLight-Blue-600'];
	}
	if(typeof(style.fill) === 'undefined') {
		style.fill = 'none';
	}

	let newPath = buildPath(points);
	let path = new Two.Path(a.toAnchors(a.roundCorners(newPath, opt.radius, opt.close)), false, false, true);
	path.linewidth = style.linewidth;
	path.stroke = style.stroke;
	path.fill = style.fill;

	main.add(path);
	if(opt.start) {
		let circle = two.makeCircle(newPath[0].x, newPath[0].y, 15);
		circle.fill = colours['mLight-Green-300'];
		circle.stroke = colours['mLight-Green-600'];
		circle.linewidth = 4;
		main.add(circle);
	}
	if(opt.end) {
		let circle = two.makeCircle(newPath[newPath.length - 1].x, newPath[newPath.length - 1].y, 15);
		circle.fill = colours['mLight-Green-300'];
		circle.stroke = colours['mLight-Green-600'];
		circle.linewidth = 4;
		main.add(circle);
	}
}

function makePath(points, opt = {}, style = {}) {
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
	if(typeof(opt.radius) === 'undefined') {
		opt.radius = opts.scale.x / 2;
	}
	// style defaults
	if(typeof(style.linewidth) === 'undefined') {
		style.linewidth = 8;
	}
	if(typeof(style.stroke) === 'undefined') {
		style.stroke = colours['mLight-Blue-600'];
	}
	if(typeof(style.fill) === 'undefined') {
		style.fill = 'none';
	}

	let newPath = buildPath(points);
	let path = new Two.Path(a.toAnchors(a.roundCorners(newPath, opt.radius, opt.close)), false, false, true);
	path.linewidth = style.linewidth;
	path.stroke = style.stroke;
	path.fill = style.fill;
	return path;
}

// translate points to scale
function buildPath(points) {
	return points.map((point) => {
		return {
			x: point.x * opts.scale.x,
			y: point.y * opts.scale.y
		};
	});
}

function makeHex(mx = 100, my = 100, msize = 20) {
	let points = [];
	for(mside = 0; mside < 6; mside++) {
		points.push({
			x: mx + msize * Math.cos(mside * 2 * Math.PI / 6),
			y: my + msize * Math.sin(mside * 2 * Math.PI / 6)
		});
	}
	return points;
}
