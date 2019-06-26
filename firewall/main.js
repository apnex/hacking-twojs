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
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,13,0,0,0,0,0,0,0,0,14,17,0,0,0,0,0,18,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,16,0,0,0,0,0,0,0,0,15,20,0,0,0,0,0,19,0],
		[0,1,0,0,0,2,5,0,0,0,0,0,6,9,0,0,0,10,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,99,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,4,0,0,0,3,8,0,0,0,0,0,7,12,0,0,0,11,0],
		[0,21,0,0,0,0,0,22,25,0,0,0,0,0,0,0,0,26,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,24,0,0,0,0,0,23,28,0,0,0,0,0,0,0,0,27,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	link: [
		[99],
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, 16],
		[17, 18, 19, 20],
		[21, 22, 23, 24],
		[25, 26, 27, 28]
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
	scale: {x:40, y:40}
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
	//linewidth: 15
};
mygrid.forEach((path) => {
	if(path.length > 1) {
		symbol.add(makePath(path, newOpts, newStyle));
	}
});

// add to main
main.add(symbol);
main.center();
