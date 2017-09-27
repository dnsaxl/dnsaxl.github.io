make("ReelModel", function(ClassUtil, Model, MathUtil, Symbol, gameModel) {
	"use strict";

	function ReelModel(reelId) {
		Model.apply(this, arguments);
		this.reelId = reelId;
		this.NUM_ROWS = gameModel.numRows;
		this.SYMBOLS_GAP = 180;
		this.horizontalOffset = this.getHorizontalOffset();
		this.MIN_SPINNING_TIME = 1.5;
		this.accelerationDuration = 0.8;
		this.accelerationDistance = 600;
		this.accelerationEasing = "inBack";
		this.deccelerationEasing = "outBack";

		this.SYMBOL_TYPES = ["SYM1", "SYM3", "SYM4", "SYM5", "SYM6", "SYM7"];
		this.numReelSymbols = this.NUM_ROWS + 2;
		this.totalHeight = this.numReelSymbols * this.SYMBOLS_GAP;
		this.bottomBorder = this.NUM_ROWS * this.SYMBOLS_GAP;

		this._iterator = -1;
		this.finalSymbols = [];

		this.ranges = this.createRanges();
		this.symbols = this.createSymbols();
		this.resetSession();
		this.setSymbols(this.symbols);
		this.movement(0, 0);
	}

	ClassUtil.extend(ReelModel, Model);

	ReelModel.prototype.getHorizontalOffset = function() {
		var pos = gameModel.reelGap * (this.reelId + 1);
		var wid = gameModel.reelGap * (gameModel.numReels - 1);
		var sub = (wid / 2 + gameModel.reelGap);
		return pos - sub;
	};

	ReelModel.prototype.createRanges = function() {
		var ranges = [];
		var h2 = this.NUM_ROWS * this.SYMBOLS_GAP / 2;
		for (var i = 0; i < this.NUM_ROWS + 1; i++) {
			ranges.push(this.SYMBOLS_GAP * i - h2);
		}
		return ranges;
	};

	ReelModel.prototype.createSymbols = function() {
		var symbols = [];
		for (var i = 0, j = this.numReelSymbols; i < j; i++) {
			symbols.push(this.createSymbol(this.reelId, i));
		}
		return symbols;
	};

	ReelModel.prototype.createSymbol = function(reelId, index) {
		var symbol = new Symbol();
		symbol.setAnchor(0.5);
		symbol.x = this.horizontalOffset;
		symbol.y = index * this.SYMBOLS_GAP;
		return symbol;
	};

	ReelModel.prototype.setSymbols = function(symbols) {
		for (var i = 0, j = symbols.length; i < j; i++) {
			symbols[i].type = this.getNextSymbolType();
		}
	};

	ReelModel.prototype.movement = function(delta, distanceRemaining) {
		this.symbols.map(function(symbol) {
			symbol.y += delta;
			if (symbol.y >= this.bottomBorder) {
				symbol.y -= this.totalHeight;
				symbol.type = this.getNextSymbolType(distanceRemaining, symbol);
			}
		}.bind(this));
	};

	ReelModel.prototype.getNextSymbolType = function(distanceRemaining, symbol) {
		if (this.isOnFinalStretch(distanceRemaining, symbol)) {
			var row = this.getRow(distanceRemaining + symbol.y);
			if (!isNaN(row)) {
				this.finalSymbols[row] = symbol;
				return this.finalSymbolNames[row];
			}
		}
		return this.track[++this._iterator % this.track.length];
	};

	ReelModel.prototype.isOnFinalStretch = function(distanceRemaining, symbol) {
		return distanceRemaining < this.totalHeight && (symbol.y + distanceRemaining < this.bottomBorder)
	};

	ReelModel.prototype.getRow = function(position) {
		for (var i = this.ranges.length; i--;) {
			if (position > this.ranges[i]) {
				return i < this.NUM_ROWS ? i : undefined;
			}
		}
	};

	ReelModel.prototype.resetSession = function() {
		this._iterator = -1;
		this.finalSymbols = [];
		this.finalSymbolNames = this.generateRandomReelTrack(this.NUM_ROWS);
		this.track = this.generateRandomReelTrack(60);
	};

	ReelModel.prototype.generateRandomReelTrack = function(length) {
		var track = [];
		while (length--) {
			track.push(MathUtil.getRandomElement(this.SYMBOL_TYPES));
		}
		return track;
	};

	ReelModel.prototype.findDecelerationDistance = function() {
		var max = Math.min();
		this.symbols.map(function(symbol) {
			if (Math.abs(symbol.y) < max) {
				max = symbol.y;
			}
		});
		this.deccelerationDistance = this.totalHeight - max;
		this.deccelerationDuration = this.deccelerationDistance / this.accelerationSpeed;
	};

	Object.defineProperty(ReelModel.prototype, "accelerationSpeed", {
		get: function() {
			return this.accelerationDistance / this.accelerationDuration;
		}
	});

	return ReelModel;
});
