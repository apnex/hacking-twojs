function grid() {
	let scale = {
		x: 40,
		y: 40
	};
	let pMap = {};
	let pBody = [];

	function my(body) {
		body.forEach((row, y) => { // build points
			row.forEach((cell, x) => {
				if(cell > 0) {
					pMap[cell] = {
						x: x * scale.x,
						y: y * scale.y
					};
				}
			});
		});
		pBody = body;
	}

	my.point = function(points) {
		let paths = [];
		paths.push(points.reduce((path, cell) => {
			if(pMap[cell]) {
				path.push(pMap[cell]);
			}
			return path;
		}, []));
		return paths;
	};

	my.x = function(value) {
		if(!arguments.length) return scale.x;
		scale.x = value;
		return my;
	};

	my.y = function(value) {
		if(!arguments.length) return scale.y;
		scale.y = value;
		return my;
	};

	return my;
}
