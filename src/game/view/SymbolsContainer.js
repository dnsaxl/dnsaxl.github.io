make("SymbolsContainer", function(Container, ClassUtil, reelModel) {
	"use strict";

	function SymbolsContainer() {
		Container.apply(this, arguments);
		
		reelModel.reels.map(this.addReel);
	}

	ClassUtil.extend(SymbolsContainer, Container);

	SymbolsContainer.prototype.addReel = function(reel) {
	    reel.map(this.addChild);
	};

	return SymbolsContainer;
});
