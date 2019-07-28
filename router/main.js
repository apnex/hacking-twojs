// init
var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// attach to canvas
var main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);
two.add(main);

// add icons
main.add(router(1));
