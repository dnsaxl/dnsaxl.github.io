make("SymbolsContainer", function(Container, ClassUtil, assetsModel, reelModel, PooledSprite) {
	"use strict";

	function SymbolsContainer() {
		Container.apply(this, arguments);
		this.createReel(0);

	}

	ClassUtil.extend(SymbolsContainer, Container);

	SymbolsContainer.prototype.createReel = function(reelId) {
		var symbols = assetsModel.getMatching(/^.+SYM\d+\.png/);
		this.totalHeight = symbols.length * reelModel.SYMBOLS_GAP;
		this.bottomBorder = reelModel.NUM_ROWS * reelModel.SYMBOLS_GAP;
		for (var i = 0, j = symbols.length; i < j; i++) {
			this.addChild(PooledSprite.fromPool(symbols[i].path, 0.5, 0.5, 1, reelId * reelModel.REEL_GAP, i * reelModel.SYMBOLS_GAP));
		}
		this.movement(0);
	};

	SymbolsContainer.prototype.movement = function(delta) {
		this.children.map(function(child) {
			child.y += delta;
			if(child.y >= this.bottomBorder){
				child.y -= this.totalHeight;
			}
		}.bind(this));
	};

	return SymbolsContainer;
});
