var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);
two.renderer.domElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
const a = anchor();

// dimension a new grid
var hsize = 8; // size of x/y on grid
var hrow = [];
for(let i = 0; i < hsize; i++) {
	let hcol = [];
	for(let j = 0; j < hsize; j++) {
		hcol.push(0);
	}
	hrow.push(hcol);
}

// grid
var myGrid = new grid();
myGrid(hrow);
myGrid.x(80);
myGrid.y(80);
myGrid.offset({x: hsize / 2, y: hsize / 2});

// paths
let main = new Two.Group();
//main.add(myGrid.show());

// hilbert
var hpoints = [];
var hnum = (hsize ** 2); // length of curve
console.log(hnum);
for(let i = 0; i < hnum; i++) {
	let p = hilbert(hsize, i);
	hpoints.push(p);
	myGrid.setTag(p, (i + 1));

	// place a square at each point
	var pa = myGrid.getTag(i + 1);
	var than = new Two.RoundedRectangle(pa.x, pa.y, 80, 80, 2);
	than.fill = colours['mYellow-300'];
	than.stroke = colours['mYellow-800'];
	main.add(than);

}

var hpath = myGrid.makePath(hpoints, {
	id: 'order1',
	close: 0,
	radius: 10
}, {
	linewidth: 6,
	stroke: colours['mLight-Blue-500']
});
main.add(hpath);

// final
main.translation.set(two.width / 2, two.height / 2);
two.add(main);

// timeline
let timeline = [
	{
		action: 'trace',
		pathid: 'order1'
	}
];

// build tracers
var tracers = [];
two.update();
timeline.forEach((item) => {
	tracers.push(new tracer(document.getElementById(item.pathid)));
});

// key controls
var afocus = two.makeRoundedRectangle(20, 20, 20, 20, 4);
afocus.fill = colours['mRed-100'];
afocus.stroke = colours['mRed-400'];
afocus.linewidth = 2;
var keys = {
	'left': 37,
	'up': 38,
	'right': 39,
	'down': 40
};
window.onfocus = function() {
	console.log('focus is set');
	afocus.fill = colours['mLight-Green-300'];
	afocus.stroke = colours['mLight-Green-500'];
};
window.addEventListener("message", function(e) {
	if(e.data == 'slide:start') {
		setTimeout(() => {
			window.focus();
		}, 100);
	}
}, false);
window.addEventListener("keyup", function(e) {
	console.log('key: ' + e.keyCode);
	if(e.keyCode === keys.right) { // refocus parent
		afocus.fill = colours['mRed-100'];
		afocus.stroke = colours['mRed-400'];
		window.parent.focus();
	}
	if(e.keyCode === keys.left) {
		tracers.forEach((trace) => {
			trace.start();
		});
	}
}, false);
