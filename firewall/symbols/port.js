function port(scale = 1) {
	// setup painter (default style and line-routing)
	let myPainter = new paint();
	myPainter.opts({
		handles: 0
	}).style({
		fill: colours['mWhite'],
		stroke: colours['mLight-Blue-900'],
		linewidth: 8
	});

	// build grid (coordinate structure)
	let myGrid = grid();
	myGrid([
		[1,0,2],
		[0,9,0],
		[4,0,3]
	]);
	myGrid.painter(myPainter);
	myGrid.x(10);
	myGrid.y(10);
	myGrid.offset(myGrid.get(9)); // obtain center coord

	// build grid
	let symbol = myGrid.main();
	//symbol.add(myGrid.show());

	// draw paths
	[
		[1, 2, 3, 4]
	].forEach((link) => {
		myGrid.addPath(link, {
			close: 1,
			radius: 5
		});
	});

	symbol.scale = scale;
	return symbol;
}
