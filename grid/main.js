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
		[0,0,0,0,0,2,0,0,0],
		[7,0,0,0,0,1,0,0,0],
		[0,0,0,0,9,0,0,0,3],
		[6,0,0,0,0,5,0,0,0],
		[0,0,0,0,0,4,0,0,0]
	],
	opts: {
		scale: {
			x: 80,
			y: 80
		}
	}
};

let myGrid = grid();
myGrid.x(80);
myGrid.y(80);
myGrid(icon.body);
let link = myGrid.point([1, 2, 3, 4, 5, 6, 7]);
console.log(link);

// Squares
let newOpts = {
	close: 1,
	//scale: {x:20, y:20},
	radius: 10,
	handles: 0
};
let newStyle = {
	fill: colours['mWhite'],
	stroke: colours['mRed-900']
	//linewidth: 15
};
let symbol = new Two.Group();
link.forEach((path) => {
	symbol.add(makePath(path, newOpts, newStyle));
});

// add to main
main.add(symbol);
main.center();
