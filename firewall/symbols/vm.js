function vm(scale = 1) {
	// setup painter (default style and line-routing)
	let myPainter = new paint();
	myPainter.opts({
		handles: 0
	}).style({
		stroke: colours['mRed-800'],
		fill: colours['mRed-200'],
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
	myGrid.x(10);
	myGrid.y(10);
	myGrid.offset(myGrid.get(9));

	// build symbol
	let symbol = myGrid.main();
	//symbol.add(myGrid.show());

	// draw border
	let mypoint = myGrid.get(9); // obtain center coord
	symbol.add(myGrid.makePath(
		makeShape(mypoint.x, mypoint.y, 15, 4),
		{
			close: 1,
			radius: 40
		}, {
			linewidth: 20,
			stroke: colours['mRed-300'],
			fill: colours['mWhite']
		}
	));

	// write text
	let p = myGrid.getTag(9);
	let atext = new Two.Text('vm', p.x, p.y);
	atext.fill = colours['mRed-300'];
	//atext.stroke = colours['mRed-900'];
	//atext.linewidth = 1;
	atext.weight = 900;
	//atext.family = 'Courier New, Courier, monospace';
	//atext.family = 'monospace, monospace';
	atext.family = 'Arial, Helvetica, sans-serif';
	atext.baseline = 'middle';
	atext.alignment = 'center';
	atext.size = 100;
	symbol.add(atext);

	// draw paths
	/*[
		[1, 2, 3, 4]
	].forEach((link) => {
		symbol.add(myGrid.path(link, {
			close: 1,
			radius: 10
		}));
	});*/

	symbol.scale = scale;
	return symbol;
}
