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


