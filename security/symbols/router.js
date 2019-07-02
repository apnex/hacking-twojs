function router() {
	// setup painter (default style and line-routing)
	let myPainter = paint();
	myPainter.opts({
		handles: 0
	}).style({
		fill: colours['mWhite'],
		stroke: colours['mRed-900'],
		linewidth: 10
	});

	// build grid (coordinate structure)
	let myGrid = grid();
	myGrid([
		[0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,18,19,0,15,16,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,2,0,0,0,20,0,21,0,0,0,9,0,0,0,0],
		[7,0,0,0,1,0,0,0,0,0,0,0,0,0,8,0,0,0,14],
		[0,0,0,0,0,0,0,3,0,99,0,10,0,0,0,0,0,0,0],
		[6,0,0,0,5,0,0,0,0,0,0,0,0,0,12,0,0,0,13],
		[0,0,0,0,4,0,0,0,27,0,28,0,0,0,11,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,25,26,0,22,23,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0]
	]);
	myGrid.painter(myPainter);
	myGrid.x(20);
	myGrid.y(20);
	myGrid.offset(myGrid.get(99)); // obtain center coord

	// build grid
	let symbol = new Two.Group();
	//symbol.add(myGrid.show());

	// draw border
	let mypoint = myGrid.get(99); // obtain center coord
	symbol.add(myGrid.makePath(
		makeShape(mypoint.x, mypoint.y, 15, 4),
		{
			close: 1,
			radius: 40
		}, {
			linewidth: 30,
			stroke: colours['mRed-100'],
			fill: colours['mRed-500']
		}
	));

	// draw paths
	[
		[1, 2, 3, 4, 5, 6, 7],
		[8, 9, 10, 11, 12, 13, 14],
		[15, 16, 17, 18, 19, 20, 21],
		[22, 23, 24, 25, 26, 27, 28],
	].forEach((link) => {
		symbol.add(myGrid.path(link, {
			close: 1,
			radius: 10
		}));
	});

	return symbol;
}
