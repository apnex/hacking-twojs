function container() {
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
		[0,0,9,0,0],
		[0,0,0,0,0],
		[4,0,0,0,3]
	]);
	myGrid.painter(myPainter);
	myGrid.x(20);
	myGrid.y(20);
	myGrid.offset(myGrid.get(9));

	// build symbol
	let symbol = new Two.Group();
	//symbol.add(myGrid.show());

	// draw border
	/*let apoint = myGrid.get(9); // obtain center coord
	let outline = myGrid.makePath(
		makeShape(apoint.x, apoint.y, 20, 4),
		{
			close: 1,
			radius: 40
		}, {
			linewidth: 30,
			stroke: colours['mBlue-500'],
			fill: colours['mWhite'],
			dashes: 20
		}
	);
	outline.dashes[0] = 40;
	symbol.add(outline);*/

	// draw border
	let mypoint = myGrid.get(9); // obtain center coord
	//symbol.add(myGrid.makePath(
	let moo = myGrid.makePath(
		makeShape(mypoint.x, mypoint.y, 15, 4),
		{
			close: 1,
			radius: 40
		}, {
			linewidth: 30,
			stroke: colours['mRed-100'],
			fill: colours['mRed-500']
		}
	);
	//moo.dashes[0] = 30;
	symbol.add(moo);

	// write text
	let p = myGrid.getTag(9);
	let atext = new Two.Text('app', p.x, p.y);
	atext.fill = colours['mWhite'];
	atext.stroke = colours['mRed-900'];
	atext.linewidth = 6;
	atext.weight = 900;
	//atext.family = 'Courier New, Courier, monospace';
	atext.family = 'monospace, monospace';
	atext.baseline = 'middle';
	atext.alignment = 'center';
	atext.size = 160;
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
	return symbol;
}
