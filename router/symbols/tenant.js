function tenant(scale = 1, props) {
	// main grid
	let aGrid = grid();
	aGrid([
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,1,9,3,0],
		[0,2,0,4,0],
		[0,0,0,0,0]
	]);
	aGrid.x(225);
	aGrid.y(160);
	aGrid.offset(aGrid.get(9));
	let aGroup = aGrid.main();

	// logical switch
	[
		[9,1,2],
		[9,3,4]
	].forEach((link) => {
		aGrid.addPath(link, {
			close: 0,
			radius: 40
		}, {
			linewidth: 20,
			stroke: colours['mLight-Blue-600']
		});
	});

	// logical-switch grid
	let bGrid = grid();
	bGrid([
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[2,0,0,0,0,0,0,0,0,0,0,0,5],
		[3,0,0,8,0,0,1,0,0,11,0,0,6],
		[4,0,0,0,0,0,0,0,0,0,0,0,7],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,9,0,0,0,0,0,12,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,10,0,0,0,0,0,13,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0]
	]);
	bGrid.x(30);
	bGrid.y(40);
	bGrid.offset(bGrid.get(1)); // obtain center coord
	let bGroup = bGrid.main();

	// logical switch
	[
		[2,4],
		[5,7],
		[3,6]
	].forEach((link) => {
		bGrid.addPath(link, {
			close: 0
		}, {
			linewidth: 20,
			stroke: colours['mLight-Blue-600']
		});
	});

	// logical ports
	[
		[8,10],
		[11,13]
	].forEach((link) => {
		bGrid.addPath(link, {
			close: 0
		}, {
			linewidth: 20,
			stroke: colours['mLight-Blue-600']
		});
		//setTimeout(() => { // need a timeout to allow for render
		//	path._renderer.elem.classList.add('moo');
		//}, 100);
	});

	// add icons
	bGrid.addIcon(firewall(0.4), [9,12]);
	bGrid.addIcon(vm(0.4), [10,13]);
	bGrid.addIcon(port(1), [1,8,11]);

	// main grid
	aGrid.addIcon(bGroup, [2, 4]);
	aGrid.addIcon(router(0.6), [9]);

	aGroup.scale = scale;
	return aGroup;
}
