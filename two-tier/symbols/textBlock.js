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
