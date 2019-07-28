function cluster() {
	// get symbols
	let srv = server(); // overload colours
	srv.scale = 0.2;

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
		[10,0,0,0,11],
		[0,0,1,0,0],
		[0,0,9,0,0],
		[0,0,2,0,0],
		[13,0,0,0,12]
	]);
	aGrid.painter(aPainter);
	aGrid.x(80);
	aGrid.y(80);
	aGrid.offset(aGrid.get(9));

	// set main
	let main = new Two.Group();
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

	let icons = new Two.Group();
	function placeIcon(icon, tags) {
		tags.forEach((tag) => {
			let p = aGrid.getTag(tag);
			let symbol = icon.clone();
			symbol.translation.set(p.x, p.y);
			icons.add(symbol);
		});
	}

	placeIcon(srv, [1,9,2]);
	main.add(icons);

	return main;
};


