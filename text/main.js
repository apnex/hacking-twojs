var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();
var main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);
two.add(main);

// setup painter (default style and line-routing)
let myPainter = paint();
myPainter.opts({
	handles: 0
}).style({
	stroke: colours['mRed-600'],
	fill: 'none',
	linewidth: 6
});

// build grid (coordinate structure)
let myGrid = grid();
myGrid([
	[1,0,0,0,2],
	[0,0,0,0,0],
	[5,0,9,0,0],
	[0,0,0,0,0],
	[4,0,0,0,3]
]);
myGrid.painter(myPainter);
myGrid.x(20);
myGrid.y(20);
myGrid.offset(myGrid.get(9));

// build grid
let symbol = new Two.Group();
//symbol.add(myGrid.show());

// write text
let p = myGrid.getTag(9);
let atext = new Two.Text('VM', p.x, p.y);
atext.stroke = 'mBlue-900';
atext.family = 'Courier New, Courier, monospace';
atext.baseline = 'middle';
atext.alignment = 'center';
atext.size = 30;
symbol.add(atext);

// draw paths
[
	[1, 2, 3, 4]
].forEach((link) => {
	symbol.add(myGrid.path(link, {
		close: 1,
		radius: 10
	}));
});

main.add(symbol);
main.center();
