var canvas = document.getElementById('canvas');
var two = new Two({
	fullscreen: true
}).appendTo(canvas);

//two.load('https://s3.eu-central-1.amazonaws.com/besports-files/images/platform/pixels/Chest.svg', function(svg) {
//two.load('https://s3.eu-central-1.amazonaws.com/besports-files/images/platform/pixels/asset.svg', function(svg) {

two.load('./code-stream.svg', function(svg) {
	//svg.center(); // I center the object's shapes
	//svg.translation.set(two.width / 2, two.height / 2); // move to the center of the canvas
	two.update();
});
