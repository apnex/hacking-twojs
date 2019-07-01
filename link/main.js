var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();

// get lb
let lb = loadbalancer();
lb.scale = 0.4;
let rt = router();
rt.scale = 0.4;
let sw = netswitch();
sw.scale = 0.4;
let fw = firewall();
fw.scale = 0.4;


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
	[1,0,0,0,2],
	[0,0,0,0,0],
	[0,0,9,0,0],
	[0,0,0,0,0],
	[4,0,0,0,3]
]);
aGrid.painter(aPainter);
aGrid.x(80);
aGrid.y(80);
aGrid.offset(aGrid.get(9)); // obtain center coord
//aGrid.center(9);

// set main
let main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);
//main.add(aGrid.show()); // doesnt work - needs offset applied
[
	[1, 2, 3, 4]
].forEach((link) => {
	main.add(aGrid.addPath(link, {
		close: 1,
		radius: 40
		//start: lb,
		//end: lb
	}));
});

let icons = new Two.Group();
function placeIcon(icon, tags) {
	tags.forEach((tag) => {
		let p = aGrid.get(tag);
		let px = aGrid.at(p.x, p.y);
		let symbol = icon.clone();
		symbol.translation.set(px.x, px.y);
		icons.add(symbol);
	});
}
placeIcon(lb, [1]);
placeIcon(sw, [2]);
placeIcon(fw, [3]);
placeIcon(rt, [4]);

main.add(icons);
two.add(main);


