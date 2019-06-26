var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();
var main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);
two.add(main);

// build an arrow;
let icon = {
	body: [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,14,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,25,0,0,0,26,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,15,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,5,0,0,0,6,0,0,0,0,0,0,0,9,0,0,0,10,0],
		[0,0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,21,0,0,0,99,0,0,0,22,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,4,0,3,0,0,0,0,0,0,0,0],
		[0,8,0,0,0,7,0,0,0,0,0,0,0,12,0,0,0,11,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,0,0,18,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,24,0,0,0,23,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,19,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	link: [
		[99],
		[21, 22],
		[23, 24, 25, 26],
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, 16],
		[17, 18, 19, 20]
	]
};

// globals
var gridPoints = [];
var handles = [];
var spots = [];

// Build Symbol
let symbol = new Two.Group();
let mygrid = mapPath(icon);
// turn into grid object
// owns the 'scale'
// can grid.getPoint(29);
// can grid.getPoint([1, 2, 3, 4]);
/*main.add(showGrid(icon, {
	scale: {x:20, y:20}
}));*/
let mySize = getSize(icon);

// Build Border
// grid.getPoint(29);
symbol.add(makePath(
	makeShape(mygrid[0][0].x, mygrid[0][0].y, 15, 4),
	{
		close: 1,
		scale: {x:20, y:20},
		handles: 0,
		radius: 40
	}, {
		linewidth: 30,
		fill: colours['mRed-500'],
		stroke: colours['mRed-100']
	}
));

// Lines
let newOpts2 = {
	scale: {x:20, y:20},
	radius: 10,
	handles: 0
};
let newStyle2 = {
	stroke: colours['mRed-900'],
	linewidth: 20
};
symbol.add(makePath(mygrid[1], newOpts2, newStyle2));
symbol.add(makePath(mygrid[2], newOpts2, newStyle2));

// Squares
let newOpts = {
	close: 1,
	scale: {x:20, y:20},
	radius: 10,
	handles: 0
};
let newStyle = {
	fill: colours['mWhite'],
	stroke: colours['mRed-900']
	//linewidth: 14,
};
mygrid.slice(3).forEach((path) => {
	if(path.length > 1) {
		//console.log(path);
		symbol.add(makePath(path, newOpts, newStyle));
	}
});

// add to main
main.add(symbol);
main.center();
