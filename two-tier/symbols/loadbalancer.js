function loadbalancer(scale = 1, astyle) {
	let theme = symStyle(astyle);

	// build grid (coordinate structure)
	let aGrid = grid();
	aGrid([
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
	]);
	aGrid.x(20);
	aGrid.y(20);
	aGrid.offset(aGrid.get(99)); // obtain center coord

	// draw paths
	[
		[21, 22],
		[23, 24, 25, 26]
	].forEach((link) => {
		aGrid.addPath(link, {
			close: 0,
			radius: 10
		}, {
			linewidth: 15,
			stroke: theme.symbol.pri,
			fill: 'none'
		});
	});

	// draw squares
	[
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, 16],
		[17, 18, 19, 20]
	].forEach((link) => {
		aGrid.addPath(link, {
			close: 1,
			radius: 10
		}, {
			stroke: theme.symbol.pri,
			fill: theme.symbol.sec,
			linewidth: 20
		});
	});

	// build grid
	let bGrid = grid();
	bGrid([
		[1,0,2],
		[0,9,0],
		[4,0,3]
	]);
	bGrid.x(120);
	bGrid.y(120);
	bGrid.offset(bGrid.get(9));
	//bGrid.center();
	//bGrid.show();

	// draw path
	[
		[1, 2, 3, 4]
	].forEach((link) => {
		bGrid.addPath(link, {
			close: 1,
			radius: 20
		}, {
			stroke: theme.shape.pri,
			fill: theme.shape.sec,
			linewidth: 15
		});
	});

	// assemble layers
	let aNew = aGrid.main();
	aNew.scale = 0.5;
	bGrid.addIcon(aNew, [9]);

	// return group
	let symbol = bGrid.main();
	symbol.scale = scale;
	return symbol;
}
