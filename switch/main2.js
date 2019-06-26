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
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
		[0,0,0,0,0,0,0,7,0,0,0,0,0,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0],
		[0,0,0,0,0,0,0,6,0,0,0,0,0,5,0,0,0,0,0],
		[0,0,0,0,0,11,0,0,0,99,0,0,0,4,0,0,0,0,0],
		[0,0,0,0,0,12,0,0,0,0,0,13,0,0,0,0,0,0,0],
		[0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,8,0,0,0,0,0,14,0,0,0,0,0,0,0],
		[0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	link: [
		[99],
		[1, 2, 3, 4, 5, 6, 7],
		[8, 9, 10, 11, 12, 13, 14]
	]
};

// globals
var gridPoints = [];
var handles = [];
var spots = [];

// Build Symbol
let symbol = new Two.Group();
main.add(showGrid(icon, {
	scale: {x:20, y:20}
}));
let mygrid = mapPath(icon);

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
		stroke: colours['mRed-100'],
		fill: colours['mRed-500']
	}
));

// Icon
let newOpts = {
	close: 1,
	scale: {x:20, y:20},
	handles: 0,
	radius: 10
};
let newStyle = {
	fill: colours['mWhite'],
	stroke: colours['mRed-900']
	//linewidth: 14
};
mygrid.forEach((path) => {
	if(path.length > 1) {
		symbol.add(makePath(path, newOpts, newStyle));
	}
});


// add to main
main.add(symbol);
main.center();
