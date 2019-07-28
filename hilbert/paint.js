function paint() {
	let opts = optDefaults();
	let style = styleDefaults();

	function my() {
		console.log('new painter');
	}

	my.opts = (value) => {
		if(typeof(value) === 'undefined') {
			return opts;
		}
		opts = optDefaults(value);
		return my;
	};

	my.style = (value) => {
		if(typeof(value) === 'undefined') {
			return style;
		}
		style = styleDefaults(value);
		return my;
	};

	my.makePath = makePath;
	my.addPath = addPath;
	my.addIcon = addIcon;

	return my;
}

function optDefaults(opt = {}, gridopts) { // merge
	if(typeof(opt.start) === 'undefined') {
		opt.start = 0;
	}
	if(typeof(opt.end) === 'undefined') {
		opt.end = 0;
	}
	if(typeof(opt.close) === 'undefined') {
		opt.close = 0;
	}
	if(typeof(opt.radius) === 'undefined') {
		//opt.radius = gridopts.scale.x / 2;
		opt.radius = 10;
	}
	return opt;
}

function styleDefaults(style = {}) { // merge
	if(typeof(style.linewidth) === 'undefined') {
		style.linewidth = 2;
	}
	if(typeof(style.stroke) === 'undefined') {
		style.stroke = colours['mLight-Blue-600'];
	}
	if(typeof(style.fill) === 'undefined') {
		style.fill = 'none';
	}
	return style;
}

function makePath(points, o, s, scale) {
	// merge current values with provided values
	let opt = Object.assign({...this.opts()}, o); // deep merge/copy of keys
	let style = Object.assign({...this.style()}, s);
	let newPoints = a.roundCorners(points, opt.radius, opt.close);

	// gridLines
	if(opt.handles) {
		main.add(showHandles(newPoints, opt, scale));
		style.fill = 'none';
		style.stroke = colours['mIndigo-400'];
		style.linewidth = scale.x / 6;
	}

	let path = new Two.Path(a.toAnchors(newPoints, 1), false, false, true);
	path.linewidth = style.linewidth;
	path.stroke = style.stroke;
	path.fill = style.fill;
	path.cap = 'round';
	if(opt.id) {
		path.id = opt.id;
	}
	path.cap = 'round';
	//path.dashes[0] = 20;
	return path;
}

function addPath(points, o, s, scale) {
	// merge current values with provided values
	let opt = Object.assign({...this.opts()}, o); // deep merge/copy of keys
	let style = Object.assign({...this.style()}, s);
	let newPoints = a.roundCorners(points, opt.radius, opt.close);

	let pGroup = new Two.Group();
        let path = new Two.Path(a.toAnchors(newPoints, 1), false, false, true);
	path.linewidth = style.linewidth;
	path.stroke = style.stroke;
	path.fill = style.fill;
	path.cap = 'round';
	if(opt.id) {
		path.id = opt.id;
	}
	path.cap = 'round';
	//path.dashes[0] = style.dashes; // testing

	/*
	pGroup.add(path);
	if(opt.start) {
		let icon = opt.start.clone()
		icon.translation.set(newPoints[0].x, newPoints[0].y);
		pGroup.add(icon);
	}
	if(opt.end) {
		let icon = opt.end.clone()
		icon.translation.set(newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);
		pGroup.add(icon);
	}
	return pGroup;
	*/

	return path;
}

// show handles
function showHandles(points, opt, scale) {
	let hGroup = new Two.Group();
	let rGroup = new Two.Group();
	points.forEach((point) => {
		if(point.command == 'Q') {
			let inner = new Two.Circle(point.x + point.controls.left.x, point.y + point.controls.left.y, opt.radius / 4);
			inner.fill = colours['mYellow-300'];
			inner.stroke = colours['mYellow-700'];
			inner.linewidth = scale.x / 30;
			rGroup.add(inner);
			let outer = new Two.Circle(point.x + point.controls.left.x, point.y + point.controls.left.y, opt.radius);
			outer.fill = colours['mLight-Green-100'];
			outer.stroke = colours['mLight-Green-500'];
			outer.linewidth = scale.x / 30;
			outer.opacity = 0.5;
			outer.dashes[0] = 5;
			rGroup.add(outer);
			let handle = new Two.Circle(point.x, point.y, scale.x / 5);
			handle.fill = colours['mRed-100'];
			handle.stroke = colours['mRed-500'];
			handle.linewidth = scale.x / 20;
			hGroup.add(handle);
		}
		if(point.command == 'L') {
			let handle = new Two.Circle(point.x, point.y, scale.x / 5);
			handle.fill = colours['mRed-100'];
			handle.stroke = colours['mRed-500'];
			handle.linewidth = scale.x / 20;
			hGroup.add(handle);
		}
	});
	let handleGroup = new Two.Group();
	handleGroup.add(rGroup);
	handleGroup.add(hGroup);
	return handleGroup;
}

function addIcon(grid, icon, tags = []) {
	let group = [];
	tags.forEach((tag) => {
		grid.getTags(tag).forEach((cell) => {
			let symbol = icon.clone();
			symbol.translation.set(cell.x, cell.y);
			group.push(symbol);
		});
	});
	return group;
}
