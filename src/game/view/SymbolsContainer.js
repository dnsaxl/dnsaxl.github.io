make("SymbolsContainer", function(Container, ClassUtil, assetsModel, reelModel, Symbol) {
	"use strict";

	function SymbolsContainer() {
		Container.apply(this, arguments);
		this.reels = this.createReels();
		this.movement(0);
		this.setSymbols();
	}

	ClassUtil.extend(SymbolsContainer, Container);


	SymbolsContainer.prototype.createReels = function() {
		var reels = [];
		for (var i = 0; i < reelModel.NUM_COLUMNS; i++) {
			reels.push(this.createReel(i));
		}
		return reels;
	};

	SymbolsContainer.prototype.createReel = function(reelId) {
		var reel = [];
		this.numReelSymbols = reelModel.NUM_ROWS + 2;
		this.totalHeight = this.numReelSymbols * reelModel.SYMBOLS_GAP;
		this.bottomBorder = reelModel.NUM_ROWS * reelModel.SYMBOLS_GAP;
		for (var i = 0, j = this.numReelSymbols; i < j; i++) {
			reel.push(this.createSymbol(reelId, i));
		}
		return reel;
	};

	SymbolsContainer.prototype.createSymbol = function(reelId, index) {
		var symbol = new Symbol();
		symbol.setAnchor(0.5);
		symbol.x = reelId * reelModel.REEL_GAP;
		symbol.y = index * reelModel.SYMBOLS_GAP;
		return this.addChild(symbol);
	};

	SymbolsContainer.prototype.setSymbols = function() {
		for (var i = 0; i < reelModel.NUM_COLUMNS; i++) {
			this.setSymbolsForReel(this.reels[i]);
		}
	};

	SymbolsContainer.prototype.setSymbolsForReel = function(reel) {
		for (var i = 0, j = reel.length; i < j; i++) {
			reel[i].type = reelModel.getNextSymbolType();
		}
	};

	SymbolsContainer.prototype.movement = function(delta) {
		this.children.map(function(symbol) {
			symbol.y += delta;
			if (symbol.y >= this.bottomBorder) {
				symbol.y -= this.totalHeight;
				symbol.type = reelModel.getNextSymbolType();
			}
		}.bind(this));
	};

	return SymbolsContainer;
});
