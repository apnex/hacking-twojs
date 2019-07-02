var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();
let main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);

// get lb
let lb = loadbalancer();
lb.scale = 0.1;
let rt = router();
rt.scale = 0.2;
let sw = netswitch();
sw.scale = 0.1;
let fw = firewall();
fw.scale = 0.13;
let avm = vm();
avm.scale = 0.2;
let ct = container();
ct.scale = 0.2;
let srv = server();
srv.scale = 0.2;
let nbm = nsxbm();
nbm.scale = 0.5;
let ncl = cluster();
ncl.scale = 0.5;

// path1
let aPainter = paint();
aPainter.opts({
	handles: 0
}).style({
	fill: 'none',
	stroke: colours['mBlue-600'],
	linewidth: 20
});
let aGrid = grid();
aGrid([
	[0,0,0,0,0,0,0,0,0,0,0],
	[21,0,11,12,13,14,15,16,17,18,22],
	[0,0,0,0,0,9,0,0,0,0,0],
	[0,0,1,2,3,4,5,6,7,8,0],
	[0,0,0,0,0,0,0,19,0,20,0]
]);
aGrid.painter(aPainter);
aGrid.x(120);
aGrid.y(120);
aGrid.offset(aGrid.get(9)); // obtain center coord
//aGrid.center(9);

// build paths
[
	[1, 11],
	[2, 12],
	[3, 13],
	[4, 14],
	[6, 16],
	[8, 18],
	[21, 22]
].forEach((link) => {
	main.add(aGrid.addPath(link, {
		radius: 20
	}, {
		stroke: colours['mGreen-900'],
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
placeIcon(fw, [11,12,13,14,18]);
placeIcon(avm, [1,2]);
placeIcon(ct, [3,4]);
placeIcon(ncl, [8]);
placeIcon(nbm, [6]);
placeIcon(rt, [22]);

// bug: if tag not exist - whole image errors - add handling
placeIcon(textBlock('NSX', {
	fill: colours['mWhite'],
	size: 50
}, {}), [21]);
placeIcon(textBlock('Bare-Metal', {
	fill: colours['mLight-Green-100'],
	size: 30
}), [19]);
placeIcon(textBlock('Zone-Based', {
	fill: colours['mLight-Green-100'],
	size: 30
}), [20]);

// add groups
//main.add(aGrid.show());
main.add(icons);
two.add(main);
