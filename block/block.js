var canvas = document.getElementById('canvas');
var two = new Two({
	fullscreen: true
}).appendTo(canvas);

var styles = {
	size: 12,
	family: 'Courier New'
}
var center = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2
};

var myNodes = [];
var mySize = 0;
makeNode({
	x: 100,
	y: 100,
	r: 10,
	text: 'MooooootA'
});
makeNode({
	x: 100,
	y: 100,
	r: 10,
	text: 'MooooootB'
});
makeNode({
	x: 100,
	y: 100,
	r: 10,
	text: 'MooooootC'
});
makeNode({
	x: 100,
	y: 100,
	r: 10,
	text: 'MooooootC'
});

// iterate through nodes and align
var prevWidth = 0;
myNodes.forEach((group) => {
	group.translation.set(prevWidth, 0);
	let myWidth = group.getBoundingClientRect(true).width;
	prevWidth += myWidth;
});

// build a zero anchor formula
let groupAll = two.makeGroup(myNodes);
groupAll.translation.set((center.x - (prevWidth / 2)), center.y);

// render
two.update();

// construct node
function makeNode(opts) {
	var rect = two.makeRoundedRectangle(0, 0, opts.x, opts.y, opts.r);
	rect.stroke = colors['mBlue-400'];
	rect.fill = colors['mBlue-200'];
	rect.linewidth = 2;
	let text = two.makeText(opts.text, 0, 0, styles);
	let group = two.makeGroup([
		rect,
		text
	]);
	myNodes.push(group);
	return group;
}
