function server(scale = 1) {
	// setup painter (default style and line-routing)
	let myPainter = new paint();
	myPainter.opts({
		handles: 0
	}).style({
		stroke: colours['mGrey-600'],
		fill: colours['mGrey-400'],
		linewidth: 6
	});

	// build grid (coordinate structure)
	let myGrid = grid();
	myGrid([
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0],
		[0,0,0,0,0,0,0,21,0,0,0,0,0,0,0,0,0,0,0,22,0,0,0,0,0,27,0,0,0,0,0,0,0,0,0,0,0,28,0,0,0,0,0,0,0],
		[0,0,9,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,0,0,18,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,23,0,0,99,0,0,30,0,0,0,0,0,0,0,0,0,0,0,29,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,12,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,19,0,0],
		[0,0,0,0,0,0,0,26,0,0,0,0,0,0,0,0,0,0,0,25,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,31,0,0,0,0,0,0,0],
		[0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0],
		[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3]
	]);
	myGrid.painter(myPainter);
	myGrid.x(30);
	myGrid.y(30);
	myGrid.offset(myGrid.get(99));

	// build symbol
	let symbol = myGrid.main();
	//symbol.add(myGrid.show());

	// draw border
	/*let mypoint = myGrid.get(9); // obtain center coord
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
	));*/

	// draw outlines
	[
		[1, 2, 3, 4]
	].forEach((link) => {
		myGrid.addPath(link, {
			close: 1,
			radius: 40
		},{
			stroke: colours['mBlack'],
			fill: colours['mGrey-400'],
			linewidth: 12
		});
	});

	// draw face
	[
		[5, 6, 7, 8],
	].forEach((link) => {
		myGrid.addPath(link, {
			close: 1,
			radius: 40
		},{
			stroke: colours['mGrey-800'],
			fill: colours['mGrey-600'],
			linewidth: 8
		});
	});

	// draw badge
	[
		[13, 14, 15, 16]
	].forEach((link) => {
		myGrid.addPath(link, {
			close: 1,
			radius: 30
		},{
			stroke: colours['mGrey-200'],
			fill: colours['mGrey-700'],
			linewidth: 20
		});
	});

	// draw bottons
	[
		[9, 10, 11, 12],
		[17, 18, 19, 20]
	].forEach((link) => {
		myGrid.addPath(link, {
			close: 1,
			radius: 20
		},{
			stroke: colours['mGrey-200'],
			fill: colours['mGrey-700'],
			linewidth: 12
		});
	});

	// draw drives
	[
		[21, 22, 23, 24],
		[24, 23, 25, 26],
		[27, 28, 29, 30],
		[30, 29, 31, 32]
	].forEach((link) => {
		myGrid.addPath(link, {
			close: 1,
			radius: 20
		},{
			stroke: colours['mGrey-800'],
			fill: colours['mGrey-300'],
			linewidth: 10
		});
	});

	symbol.scale = scale;
	return symbol;
}
