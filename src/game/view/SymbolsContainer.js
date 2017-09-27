make("SymbolsContainer", function(Container, ClassUtil, spinModel) {
	"use strict";

	function SymbolsContainer() {
		Container.apply(this, arguments);
		spinModel.reels.map(this.addReel);
	}

	ClassUtil.extend(SymbolsContainer, Container);

	SymbolsContainer.prototype.addReel = function(reel) {
	    reel.symbols.map(this.addChild);
	};

	return SymbolsContainer;
});
