var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// init anchor
var main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);
two.add(main);

let symbol = loadbalancer();
main.add(symbol);
main.center();
