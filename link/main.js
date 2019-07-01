var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();

// get lb
let lb = loadbalancer();
lb.scale = 0.2;
let rt = router();
rt.scale = 0.2;
let sw = netswitch();
sw.scale = 0.2;
let fw = firewall();
fw.scale = 0.2;


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
aGrid.x(40);
aGrid.y(40);
aGrid.offset(aGrid.get(9)); // obtain center coord
//aGrid.center(9);

let sym = new Two.Group();
//sym.add(aGrid.show()); // doesnt work - needs offset applied
[
	[1, 2, 3, 4]
].forEach((link) => {
	sym.add(aGrid.addPath(link, {
		close: 1,
		radius: 40
		//start: lb,
		//end: lb
	}));
});

let icons = new Two.Group();
[1, 3].forEach((tag) => {
	let p = aGrid.get(tag); // obtain center coord
	let px = aGrid.at(p.x, p.y); // relative to offset!!
	let moo = lb.clone();
	moo.translation.set(px.x, px.y);
	icons.add(moo);
});
[2].forEach((tag) => {
	let p = aGrid.get(tag); // obtain center coord
	let px = aGrid.at(p.x, p.y); // relative to offset!!
	let moo = rt.clone();
	moo.translation.set(px.x, px.y);
	icons.add(moo);
});
[3].forEach((tag) => {
	let p = aGrid.get(tag); // obtain center coord
	let px = aGrid.at(p.x, p.y); // relative to offset!!
	let moo = sw.clone();
	moo.translation.set(px.x, px.y);
	icons.add(moo);
});
[4].forEach((tag) => {
	let p = aGrid.get(tag); // obtain center coord
	let px = aGrid.at(p.x, p.y); // relative to offset!!
	let moo = fw.clone();
	moo.translation.set(px.x, px.y);
	icons.add(moo);
});

// set main
let main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);

main.add(sym);
main.add(icons);
two.add(main);


