#!/usr/bin/env node

// constructor
function grid() {
	this.optDefaults = optDefaults;
	this.styleDefaults = styleDefaults;
	return this;
};
//module.exports = grid;

// get grid height / width
function getSize(grid) {
	return {
		x: grid.body[0].length,
		y: grid.body.length
	};
}

// flip grid on x-axis
function flipx(grid) {
	let data = JSON.parse(JSON.stringify(grid));
	data.body.forEach((row) => {
		row.reverse();
	});
	return data;
}

// flip grid on y-axis
function flipy(grid) {
	let data = JSON.parse(JSON.stringify(grid));
	data.body.reverse();
	return data;
}

// show handles
function showHandles(points, opt) {
	let hGroup = new Two.Group();
	let rGroup = new Two.Group();
	points.forEach((point) => {
		if(point.command == 'Q') {
			let inner = new Two.Circle(point.x + point.controls.left.x, point.y + point.controls.left.y, opt.radius / 4);
			inner.fill = colours['mYellow-300'];
			inner.stroke = colours['mYellow-700'];
			inner.linewidth = opt.scale.x / 30;
			rGroup.add(inner);
			let outer = new Two.Circle(point.x + point.controls.left.x, point.y + point.controls.left.y, opt.radius);
			outer.fill = colours['mLight-Green-100'];
			outer.stroke = colours['mLight-Green-500'];
			outer.linewidth = opt.scale.x / 30;
			outer.opacity = 0.5;
			outer.dashes[0] = 5;
			rGroup.add(outer);
			let handle = new Two.Circle(point.x, point.y, opt.scale.x / 5);
			handle.fill = colours['mRed-100'];
			handle.stroke = colours['mRed-500'];
			handle.linewidth = opt.scale.x / 20; // scale to radius
			hGroup.add(handle);
		}
		if(point.command == 'L') {
			let handle = new Two.Circle(point.x, point.y, opt.scale.x / 5);
			handle.fill = colours['mRed-100'];
			handle.stroke = colours['mRed-500'];
			handle.linewidth = opt.scale.x / 20; // scale to radius
			hGroup.add(handle);
		}
	});
	let handleGroup = new Two.Group();
	handleGroup.add(rGroup);
	handleGroup.add(hGroup);
	return handleGroup;
}

// show grid points + lines
function showGrid(grid, opt) {
	let gridGroup = new Two.Group();
	gridGroup.add(showGridLines(grid, opt));
	gridGroup.add(showGridPoints(grid, opt));
	return gridGroup;
}

// show grid points
function showGridPoints(grid, opt) {
	let gGroup = new Two.Group();
	grid.body.forEach((row, y) => { // build points
		row.forEach((cell, x) => {
			let point = {
				x: x * opt.scale.x,
				y: y * opt.scale.y
			};
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
function showGridLines(grid, opt) {
	let size = getSize(grid);
	let lGroup = new Two.Group();
	for(y = 0; y < size.y; y++) { // y-axis
		let pathPoints = buildPath([
			{x: -1, y: y},
			{x: size.x, y: y}
		], opt.scale);
		let path = new Two.Path(a.toAnchors(pathPoints), false, false, true);
		path.stroke = colours['mGrey-300'];
		path.linewidth = opt.scale.x / 30;
		path.opacity = 0.5;
		path.dashes[0] = 5;
		lGroup.add(path);
	}
	for(let x = 0; x < size.x; x++) { // x-axis
		let pathPoints = buildPath([
			{x: x, y: -1},
			{x: x, y: size.y}
		], opt.scale);
		let path = new Two.Path(a.toAnchors(pathPoints), false, false, true);
		path.stroke = colours['mGrey-300'];
		path.linewidth = opt.scale.x / 30;
		path.opacity = 0.5;
		path.dashes[0] = 5;
		lGroup.add(path);
	}
	return lGroup;
}
