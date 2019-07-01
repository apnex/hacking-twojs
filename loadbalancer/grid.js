function grid() {
	let scale = {
		x: 40,
		y: 40
	};
	let offset = {
		x: 0,
		y: 0
	};
	let pMap = {};
	let pBody = [];
	let painter = paint();

	function my(body) {
		pBody = body;
		body.forEach((row, y) => { // build points
			row.forEach((cell, x) => {
				if(cell > 0) {
					pMap[cell] = {x, y};
				}
			});
		});
	}

	my.path = (points, opts, style) => {
		return painter.makePath(my.point(points)[0], opts, style, scale);
	};

	my.addPath = (points, opts, style) => {
		return painter.addPath(my.point(points)[0], opts, style, scale);
	};

	my.makePath = (points, opts, style) => {
		return painter.makePath(points.map((point) => {
			return my.at(point.x, point.y);
		}), opts, style, scale);
	};

	my.offset = (point) => {
		if(typeof(point) === 'undefined') {
			return offset;
		}
		offset = point;
		return my;
	};

	my.at = (x, y) => {
		return {x: (x - offset.x) * scale.x, y: (y - offset.y) * scale.y};
	};

	my.get = (tag) => {
		return {x: pMap[tag].x, y: pMap[tag].y};
	};

	my.painter = function(value) {
		if(typeof(value) === 'undefined') {
			return painter;
		}
		painter = value;
		return my;
	};

	my.show = () => {
		return showGrid(pBody, {scale});
	};

	my.x = function(value) {
		if(typeof(value) === 'undefined') {
			return scale.x;
		}
		scale.x = value;
		return my;
	};

	my.y = function(value) {
		if(typeof(value) === 'undefined') {
			return scale.y;
		}
		scale.y = value;
		return my;
	};

	my.point = function(points) {
		let paths = [];
		paths.push(points.reduce((path, cell) => {
			if(pMap[cell]) {
				path.push(my.at(pMap[cell].x, pMap[cell].y));
			}
			return path;
		}, []));
		return paths;
	};

	return my;
}

// get grid height / width
function getSize(body) {
	return {
		x: body[0].length,
		y: body.length
	};
}

// flip grid on x-axis
function flipx(body) {
	let data = JSON.parse(JSON.stringify(body));
	data.forEach((row) => {
		row.reverse();
	});
	return data;
}

// flip grid on y-axis
function flipy(body) {
	let data = JSON.parse(JSON.stringify(body));
	data.reverse();
	return data;
}

// show grid points + lines
function showGrid(grid, opt) {
	let gridGroup = new Two.Group();
	gridGroup.add(showGridLines(grid, opt));
	gridGroup.add(showGridPoints(grid, opt));
	return gridGroup;
}

// show grid points
function showGridPoints(body, opt) {
	let gGroup = new Two.Group();
	body.forEach((row, y) => { // build points
		row.forEach((cell, x) => {
			let point = {x: x * opt.scale.x, y: y * opt.scale.y};
			let handle = new Two.Circle(point.x, point.y, opt.scale.x / 20);
			handle.fill = colours['mBlue-100'];
			handle.stroke = colours['mBlue-300'];
			handle.linewidth = opt.scale.x / 30;
			gGroup.add(handle);
		});
	});
	return gGroup;
}

// show grid lines
function showGridLines(body, opt) {
	let size = getSize(body);
	let lGroup = new Two.Group();
	for(y = 0; y < size.y; y++) { // y-axis
		let pathPoints = [
			{x: -1 * opt.scale.x, y: y * opt.scale.y},
			{x: size.x * opt.scale.x, y: y * opt.scale.y}
		];
		let path = new Two.Path(a.toAnchors(pathPoints), false, false, true);
		path.stroke = colours['mGrey-300'];
		path.linewidth = opt.scale.x / 30;
		path.opacity = 0.5;
		path.dashes[0] = 5;
		lGroup.add(path);
	}
	for(let x = 0; x < size.x; x++) { // x-axis
		let pathPoints = [
			{x: x * opt.scale.x, y: -1 * opt.scale.y},
			{x: x * opt.scale.x, y: size.y * opt.scale.y}
		];
		let path = new Two.Path(a.toAnchors(pathPoints), false, false, true);
		path.stroke = colours['mGrey-300'];
		path.linewidth = opt.scale.x / 30;
		path.opacity = 0.5;
		path.dashes[0] = 5;
		lGroup.add(path);
	}
	return lGroup;
}
