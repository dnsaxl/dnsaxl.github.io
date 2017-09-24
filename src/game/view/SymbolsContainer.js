make("SymbolsContainer", function(Container, ClassUtil) {
	"use strict";

	function SymbolsContainer() {
		Container.apply(this, arguments);
	}

	ClassUtil.extend(SymbolsContainer, Container);

	return SymbolsContainer;
});
