make("SymbolsContainer", function(Container, ClassUtil, assetsModel, reelModel, PooledSprite) {
	"use strict";

	function SymbolsContainer() {
		Container.apply(this, arguments);
		this.createReel(0);

	}

	ClassUtil.extend(SymbolsContainer, Container);

	SymbolsContainer.prototype.createReel = function(reelId) {
		var symbols = assetsModel.getMatching(/^.+SYM\d+\.png/);
		for (var i = 0, j = symbols.length; i < j; i++) {
			this.addChild(PooledSprite.fromPool(symbols[i].path, 0.5, 0.5, 1, reelId * reelModel.REEL_GAP, i * reelModel.SYMBOLS_GAP));
		}
	};

	SymbolsContainer.prototype.movement = function(delta) {
		this.children.map(function(child) {
			child.y += delta;
		})
	};

	return SymbolsContainer;
});
