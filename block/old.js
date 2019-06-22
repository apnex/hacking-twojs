var elem = document.getElementById('canvas');
var two = new Two({ fullscreen: true }).appendTo(elem);

var styles = {
	size: 12,
	family: 'Courier New'
}

let anchor = {
	x: 150,
	y: 100
};
var rectA = two.makeRectangle(150, 100, 200, 100);
rectA.stroke = 'orange';
let textA = two.makeText('Rectangle', 150, 100, styles);
let groupA = two.makeGroup(rectA, textA);

var rectB = two.makeRoundedRectangle(400, 100, 200, 100, 5);
rectB.stroke = colors['mBlue-600'];
rectB.fill = colors['mBlue-300'];
rectB.linewidth = 4;
two.makeText('Rounded Rectangle', 400, 100, styles);

var rectC = two.makeRoundedRectangle(650, 100, 200, 100, 50);
rectC.stroke = 'green';
rectC.linewidth = 2;
two.makeText('Rounded Rectangle (II)', 650, 100, styles);

var circA = two.makeCircle(150, 250, 75);
circA.fill = 'yellow';
circA.noStroke();
two.makeText('Circle', 150, 250, styles);

var ellipseA = two.makeEllipse(400, 250, 100, 75);
ellipseA.fill = 'pink';
ellipseA.stroke = 'red';
ellipseA.linewidth = 4;
two.makeText('Ellipse', 400, 250, styles);

var ellipseB = two.makeEllipse(650, 300, 75, 100);
ellipseB.fill = 'white';
ellipseB.stroke = 'black';
ellipseB.linewidth = 20;
two.makeText('Ellipse (II)', 650, 300, styles);

// render
two.update();
