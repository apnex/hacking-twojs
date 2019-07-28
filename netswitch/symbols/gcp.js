function gcp(scale = 1) {

	// build grid
	let aGrid = grid();
	aGrid([
		[0,0,10,12,14,0,0],
		[0,5,9,11,13,6,0],
		[32,31,1,0,2,15,16],
		[30,29,0,99,0,17,18],
		[28,27,4,0,3,19,20],
		[0,8,25,23,21,7,0],
		[0,0,26,24,22,0,0]
	]);
	aGrid.x(20);
	aGrid.y(20);
	aGrid.offset(aGrid.get(99));
	//aGrid.center();
	//aGrid.show();

	// draw outer square
	[
		[5, 6, 7, 8]
	].forEach((link) => {
		aGrid.addPath(link, {
			close: 1,
			//radius: 15
		}, {
			stroke: colours['mLight-Blue-900'],
			fill: colours['mLight-Blue-400'],
			linewidth: 15
		});
	});

	// draw inner square
	[
		[1, 2, 3, 4]
	].forEach((link) => {
		aGrid.addPath(link, {
			close: 1,
			//radius: 15
		}, {
			stroke: colours['mLight-Blue-900'],
			fill: colours['mLight-Blue-100'],
			linewidth: 15
		});
	});

	// draw lines
	[
		[9,10],
		[11,12],
		[13,14],
		[15,16],
		[17,18],
		[19,20],
		[21,22],
		[23,24],
		[25,26],
		[27,28],
		[29,30],
		[31,32]
	].forEach((link) => {
		aGrid.addPath(link, {
			close: 0,
		}, {
			stroke: colours['mLight-Blue-900'],
			fill: 'none',
			linewidth: 15
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
			stroke: colours['mLight-Blue-900'],
			fill: colours['mLight-Blue-100'],
			linewidth: 15
		});
	});

	// assemble layers
	bGrid.addIcon(aGrid.main(), [9]);

	// return group
	let symbol = bGrid.main();
	symbol.scale = scale;
	return symbol;
}
