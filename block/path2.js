var canvas = document.getElementById('canvas');
var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(canvas);

var size = 50;
//var points = [];

/*
var point = new Two.Anchor();
point.x = 0;
point.y = - size * 0.75;
points.push(point);
*/

var points = [
	new Two.Anchor(0, 0),
	new Two.Anchor(100, 0),
	new Two.Anchor(100, 50),
	new Two.Anchor(200, 50)
];

// Now construct a custom path with the points,
// where the path is closed, not curved, and manually
// commanded.
//var path = new Two.Path(points, true, false, true);

//my path
var path = new Two.Path(points, false, true);
path.stroke = colors['mBlue-600'];
//path.fill = colors['mBlue-300'];
path.linewidth = 3;

// Don't forget to add it to the scene
two.add(path);

// Move the path to the center of the stage.
path.translation.set(two.width / 2, two.height / 2);
