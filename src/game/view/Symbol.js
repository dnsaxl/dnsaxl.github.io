make("Symbol", function(Container, ClassUtil) {
	"use strict";

	function Symbol() {
		Container.apply(this, arguments);
	}

	ClassUtil.extend(Symbol, Container);

	return Symbol;
});
