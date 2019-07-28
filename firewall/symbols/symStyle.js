function symStyle(astyle) {
	// style
	let cstyle = Object.assign({
		symbol: 'Red',
		shape: 'Red'
	}, astyle);
	let theme = {
		symbol: {
			pri: colours['m' + cstyle.symbol + '-900'],
			sec: colours['m' + cstyle.symbol + '-100']
		},
		shape: {
			pri: colours['m' + cstyle.shape + '-900'],
			sec: colours['m' + cstyle.shape + '-200']
		}
	};
	switch(cstyle.symbol) {
		case('White'):
			theme.symbol.pri = colours['mWhite'],
			theme.symbol.sec = colours['mWhite']
		break;
		case('none'):
			theme.symbol.pri = 'none',
			theme.symbol.sec = 'none'
		break;
	}
	switch(cstyle.shape) {
		case('White'):
			theme.shape.pri = colours['mWhite'],
			theme.shape.sec = colours['mWhite']
		break;
		case('none'):
			theme.shape.pri = 'none',
			theme.shape.sec = 'none'
		break;
	}
	return theme;
}
