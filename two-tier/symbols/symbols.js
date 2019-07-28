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
function firewall(scale = 1, astyle) {
	let theme = symStyle(astyle);

	// build grid (coordinate structure)
	let aGrid = grid();
	aGrid([
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,13,0,0,0,0,0,0,0,0,14,17,0,0,0,0,0,18,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,16,0,0,0,0,0,0,0,0,15,20,0,0,0,0,0,19,0],
		[0,1,0,0,0,2,5,0,0,0,0,0,6,9,0,0,0,10,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,99,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,4,0,0,0,3,8,0,0,0,0,0,7,12,0,0,0,11,0],
		[0,21,0,0,0,0,0,22,25,0,0,0,0,0,0,0,0,26,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,24,0,0,0,0,0,23,28,0,0,0,0,0,0,0,0,27,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	]);
	aGrid.x(10);
	aGrid.y(10);
	aGrid.offset(aGrid.get(99));

	// draw paths
	[
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, 16],
		[17, 18, 19, 20],
		[21, 22, 23, 24],
		[25, 26, 27, 28]
	].forEach((link) => {
		aGrid.addPath(link, {
			close: 1,
			radius: 10
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

	// return group
	let symbol = bGrid.main();
	symbol.scale = scale;
	return symbol;
}
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
function netswitch(scale = 1) {
	// setup painter (default style and line-routing)
	let myPainter = new paint();
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
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
		[0,0,0,0,0,0,0,7,0,0,0,0,0,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0],
		[0,0,0,0,0,0,0,6,0,0,0,0,0,5,0,0,0,0,0],
		[0,0,0,0,0,11,0,0,0,0,0,0,0,4,0,0,0,0,0],
		[0,0,0,0,0,12,0,0,0,0,0,13,0,0,0,0,0,0,0],
		[0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,8,0,0,0,0,0,14,0,0,0,0,0,0,0],
		[0,0,0,0,0,9,0,0,0,99,0,0,0,16,0,0,0,0,0],
		[0,0,0,0,0,0,0,21,0,0,0,0,0,15,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,0],
		[0,0,0,0,0,0,0,20,0,0,0,0,0,19,0,0,0,0,0],
		[0,0,0,0,0,25,0,0,0,0,0,0,0,18,0,0,0,0,0],
		[0,0,0,0,0,26,0,0,0,0,0,27,0,0,0,0,0,0,0],
		[0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,22,0,0,0,0,0,28,0,0,0,0,0,0,0],
		[0,0,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	]);
	myGrid.painter(myPainter);
	myGrid.x(20);
	myGrid.y(20);
	myGrid.offset(myGrid.get(99));

	// build grid
	let symbol = myGrid.main();
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
		[22, 23, 24, 25, 26, 27, 28]
	].forEach((link) => {
		myGrid.addPath(link, {
			close: 1,
			radius: 10
		});
	});

	symbol.scale = scale;
	return symbol;
}
function nsxbm() {
	// get symbols
	let srv = server(); // overload colours
	srv.scale = 0.2;
	let fw = firewall();
	fw.scale = 0.15;

	// path1
	let aPainter = paint();
	aPainter.opts({
		handles: 0
	}).style({
		fill: 'none',
		stroke: colours['mBlue-600'],
		linewidth: 40
	});
	let aGrid = grid();
	aGrid([
		[10,0,0,0,0,0,0,0,11],
		[0,1,0,0,0,4,0,0,0],
		[0,2,0,0,9,5,0,0,0],
		[0,3,0,0,0,6,0,0,0],
		[13,0,0,0,0,0,0,0,12]
	]);
	aGrid.painter(aPainter);
	aGrid.x(60);
	aGrid.y(80);
	aGrid.offset(aGrid.get(9));

	// set main
	let main = new Two.Group();
	main.translation.set(two.width / 2, two.height / 2);
	//main.add(aGrid.show());

	// build border
	[
		[10, 11, 12, 13]
	].forEach((link) => {
		main.add(aGrid.addPath(link, {
			close: 1,
			radius: 20
		}, {
			stroke: colours['mLight-Green-400'],
			fill: colours['mLight-Green-100'],
			linewidth: 10,
			dashes: 30
		}));
	});

	// build paths
	[
		[1, 4],
		[2, 5],
		[3, 6]
	].forEach((link) => {
		main.add(aGrid.addPath(link, {
			close: 1,
			radius: 20
		}, {
			linewidth: 10
		}));
	});

	let icons = new Two.Group();
	function placeIcon(icon, tags) {
		tags.forEach((tag) => {
			let p = aGrid.getTag(tag);
			let symbol = icon.clone();
			symbol.translation.set(p.x, p.y);
			icons.add(symbol);
		});
	}

	placeIcon(srv, [4,5,6]);
	placeIcon(fw, [1,2,3]);
	main.add(icons);

	return main;
};
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
function router(scale = 1, astyle) {
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

	// return group
	let symbol = bGrid.main();
	symbol.scale = scale;
	return symbol;
}
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
function symStyle(astyle) {
	// style
	let cstyle = Object.assign({
		symbol: 'Red',
		shape: 'Red'
	}, astyle);
	let theme = {
		symbol: {
			pri: colours['m' + cstyle.symbol + '-900'],
			sec: colours['m' + cstyle.symbol + '-100']
		},
		shape: {
			pri: colours['m' + cstyle.shape + '-900'],
			sec: colours['m' + cstyle.shape + '-200']
		}
	};
	switch(cstyle.symbol) {
		case('White'):
			theme.symbol.pri = colours['mWhite'],
			theme.symbol.sec = colours['mWhite']
		break;
		case('none'):
			theme.symbol.pri = 'none',
			theme.symbol.sec = 'none'
		break;
	}
	switch(cstyle.shape) {
		case('White'):
			theme.shape.pri = colours['mWhite'],
			theme.shape.sec = colours['mWhite']
		break;
		case('none'):
			theme.shape.pri = 'none',
			theme.shape.sec = 'none'
		break;
	}
	return theme;
}
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
			linewidth: 15,
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
			linewidth: 15,
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
			linewidth: 15,
			stroke: colours['mLight-Blue-600']
		});
		//setTimeout(() => { // need a timeout to allow for render
		//	path._renderer.elem.classList.add('moo');
		//}, 100);
	});

	// add icons
	bGrid.addIcon(firewall(0.4, {
		symbol: 'Orange',
		shape: 'Orange'
	}), [9,12]);
	//bGrid.addIcon(vm(0.4), [10,13]);
	bGrid.addIcon(gcp(0.4), [10,13]);
	bGrid.addIcon(port(1), [1,8,11]);

	// main grid
	aGrid.addIcon(bGroup, [2, 4]);
	aGrid.addIcon(router(0.6, {
		shape: 'Light-Green',
		symbol: 'Light-Green'
	}), [9]);

	aGroup.scale = scale;
	return aGroup;
}
function textBlock(msg, s, box) {
	// default style
	let style = Object.assign({...s}, {
		stroke: colours['mBlack'],
		fill: colours['mBlack'],
		family: 'Courier New, Courier, monospace',
		baseline: 'middle',
		alignment: 'center',
		size: 20,
		linewidth: 1,
		weight: 500
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
	myGrid.x(40);
	myGrid.y(40);
	myGrid.offset(myGrid.get(9));

	// main group
	let main = new Two.Group();
	//main.add(myGrid.show());

	// draw paths
	if(typeof(box) !== 'undefined') {
		[
			[1, 2, 3, 4]
		].forEach((link) => {
			main.add(myGrid.path(link, {
				close: 1,
				radius: 20
			}, {
				fill: colours['mBlue-600'],
				stroke: colours['mBlue-100'],
				linewidth: 10
			}));
		});
	}

	// write text
	let p = myGrid.getTag(9);
	let atext = new Two.Text(msg, p.x, p.y);

	//Object.entries((item) => {
	//	atext[item[0]] = item[1];
	//});
	Object.assign(atext, s);

	//atext.fill = colours['mWhite'];
	//atext.family = 'Courier New, Courier, monospace';
	//atext.baseline = 'middle';
	//atext.alignment = 'center';
	//atext.size = 50;
	main.add(atext);

	return main;
}
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

