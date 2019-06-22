var canvas = document.getElementById('canvas');
var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(canvas);

var size = 50;
var points = [];

// Generate points from the bottom left corner
// moving clockwise to create the custom path.
for (var i = 0; i < 7; i++) {
	var point = new Two.Anchor();

	// In order to make your own custom path you
	// need to tell the renderer how you'd like
	// to draw each connection.
	switch (i) {
		case 3:
			point.command = Two.Commands.curve;
			point.x = 0;
			point.y = - size * 0.75;
			// Handlers are relative to the anchor point
			point.controls.left.x = - size * 0.25;
			point.controls.right.x = size * 0.25;
		break;
		case 2:
			point.command = Two.Commands.curve;
			point.x = - size * 0.25;
			point.y = - size * 0.5;
		break;
		case 4:
			point.command = Two.Commands.curve;
			point.x = size * 0.25;
			point.y = - size * 0.5;
		break;
		case 0:
		case 1:
		case 5:
		case 6:
			point.command = Two.Commands.line;
			if (i <= 0) {
				point.command = Two.Commands.move;
			}
			point.x = size * 0.5;
			point.y = size * 0.5;
			if (i <= 1) {
				point.x *= - 1;
			}
			if (i > 0 && i < 6) {
				point.y *= - 1
			}
	}
	points.push(point);
}



// Now construct a custom path with the points,
// where the path is closed, not curved, and manually
// commanded.
var path = new Two.Path(points, true, false, true);

// Don't forget to add it to the scene
two.add(path);

// Move the path to the center of the stage.
path.translation.set(two.width / 2, two.height / 2);
