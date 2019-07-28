/*
setTimeout(() => { // need a timeout to allow for render
	path._renderer.elem.classList.add('moo');
}, 100);
*/

// build tracers
var tracers = [];
two.update();
if(typeof(timeline) !== 'undefined') {
	setTimeout(() => {
		timeline.forEach((item) => {
			let query = item.query;
			if(query) {
				[...document.querySelectorAll(query)].forEach((e) => {
					tracers.push(new tracer(e));
				});
			}
		});
	}, 100);
}

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
		console.log('slide:start');
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
