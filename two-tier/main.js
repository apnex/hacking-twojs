var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// grid
let aGrid = grid();
aGrid([
	[0,0,0,0,0],
	[4,0,3,0,5],
	[1,0,9,0,2],
	[0,0,0,0,0],
	[0,0,0,0,0],
]);
aGrid.x(135);
aGrid.y(135);
aGrid.offset(aGrid.get(9));
var main = aGrid.main();
main.translation.set(two.width / 2, two.height / 2);
two.add(main);

// add paths
[
	[3,4,1],
	[3,5,2]
].forEach((link) => {
	aGrid.addPath(link, {
		close: 0,
		radius: 40
	}, {
		linewidth: 20,
		stroke: colours['mLight-Blue-600']
	});
});

// add icons
aGrid.addIcon(tenant(0.6), [1,2]);
aGrid.addIcon(multi(0.6, {
	shape: 'Red',
	symbol: 'Red'
}), [3]);
