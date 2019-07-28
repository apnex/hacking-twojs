function multi(scale = 1, astyle) {
	let theme = symStyle(astyle);

	// build grid
	let aGrid = grid();
	aGrid([
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
	aGrid.x(10);
	aGrid.y(10);
	aGrid.offset(aGrid.get(99)); // obtain center coord

	// draw paths
	[
		[1, 2, 3, 4, 5, 6, 7],
		[8, 9, 10, 11, 12, 13, 14],
		[15, 16, 17, 18, 19, 20, 21],
		[22, 23, 24, 25, 26, 27, 28],
	].forEach((link) => {
		aGrid.addPath(link, {
			close: 1,
			radius: 4
		}, {
			stroke: theme.symbol.pri,
			fill: theme.symbol.sec,
			linewidth: 6
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
	bGrid.addIcon(aGrid.main(), [9]);
	bGrid.addIcon(firewall(0.4, {
		symbol: 'Orange',
		shape: 'Orange'
	}), [1]);
	bGrid.addIcon(loadbalancer(0.4, {
		symbol: 'Light-Blue',
		shape: 'Light-Blue'
	}), [2]);

	// return group
	let symbol = bGrid.main();
	symbol.scale = scale;
	return symbol;
}
