//#!/usr/bin/env node

function hilbert(n, d) {
	var rx, ry, t = d;
	var x = 0, y = 0;
	for (var s = 1; s < n; s *= 2) {
		rx = 1 & (t / 2);
		ry = 1 & (t ^ rx);
		if(ry == 0) {
			if(rx == 1) {
				x = s - 1 - x;
				y = s - 1 - y;
			}
			let tmp = x;
			x = y;
			y = tmp;
		}
		x += s * rx;
		y += s * ry;
		t /= 4;
	}
	return {x: x, y: y};
}

console.log('start curve');
//for(let d = 0; d < 15; d++) {
//	console.log(hilbert(4, d));
//}
