make("ReelModel", function(ClassUtil, Model, MathUtil, Symbol) {
	"use strict";

	function ReelModel() {
		Model.apply(this, arguments);
		this.NUM_ROWS = 3;
		this.NUM_COLUMNS = 1;
		this.SYMBOLS_GAP = 180;
		this.REEL_GAP = 300;
		this.MIN_SPINNING_TIME = 1.5;
		this.accelerationDuration = 0.8;
		this.accelerationDistance = 600;
		this.trackLength = 60;
		this.SYMBOL_TYPES = ["SYM1", "SYM3", "SYM4", "SYM5", "SYM6", "SYM7"];

		this.numReelSymbols = this.NUM_ROWS + 2;
		this.totalHeight = this.numReelSymbols * this.SYMBOLS_GAP;
		this.bottomBorder = this.NUM_ROWS * this.SYMBOLS_GAP;
		this.ranges = this.createRanges();
		this.track = this.generateRandomReelTrack(this.trackLength);
		this._iterator = -1;
		this.finalSymbols = this.generateRandomReelTrack(this.NUM_ROWS);
	}

	ClassUtil.extend(ReelModel, Model);

	ReelModel.prototype.createRanges = function() {
		var ranges = [];
		var h2 = this.NUM_ROWS * this.SYMBOLS_GAP / 2;
		for (var i = 0; i < this.NUM_ROWS + 1; i++) {
			ranges.push(this.SYMBOLS_GAP * i - h2);
		}
		return ranges;
	};

	ReelModel.prototype.getRow = function(position) {
		for (var i = this.ranges.length; i--;) {
			if (position > this.ranges[i]) {
				return i < this.NUM_ROWS ? i : undefined;
			}
		}
	};

	ReelModel.prototype.init = function() {
		this.reels = this.createReels();
		this.movement(0, 0);
		this.setSymbols();
		this.log(0);
	};

	ReelModel.prototype.generateRandomReelTrack = function(length) {
		var track = [];
		while (length--) {
			track.push(MathUtil.getRandomElement(this.SYMBOL_TYPES));
		}
		return track;
	};

	ReelModel.prototype.getNextSymbolType = function(distanceRemaining, symbol) {
		if (this.isOnFinalStretch(distanceRemaining, symbol)) {
			var row = this.getRow(distanceRemaining + symbol.y);
			if (!isNaN(row)) {
				return this.finalSymbols[row];
			}
		}
		return this.track[++this._iterator % this.trackLength];
	};

	ReelModel.prototype.isOnFinalStretch = function(distanceRemaining, symbol) {
		return distanceRemaining < this.totalHeight && (symbol.y + distanceRemaining < this.bottomBorder)
	};

	ReelModel.prototype.createReels = function() {
		var reels = [];
		for (var i = 0; i < this.NUM_COLUMNS; i++) {
			reels.push(this.createReel(i));
		}
		return reels;
	};

	ReelModel.prototype.createReel = function(reelId) {
		var reel = [];
		for (var i = 0, j = this.numReelSymbols; i < j; i++) {
			reel.push(this.createSymbol(reelId, i));
		}
		return reel;
	};

	ReelModel.prototype.createSymbol = function(reelId, index) {
		var symbol = new Symbol();
		symbol.setAnchor(0.5);
		symbol.x = reelId * this.REEL_GAP;
		symbol.y = index * this.SYMBOLS_GAP;
		return symbol;
	};

	ReelModel.prototype.setSymbols = function() {
		for (var i = 0; i < this.NUM_COLUMNS; i++) {
			this.setSymbolsForReel(this.reels[i]);
		}
	};

	ReelModel.prototype.setSymbolsForReel = function(reel) {
		for (var i = 0, j = reel.length; i < j; i++) {
			reel[i].type = this.getNextSymbolType();
		}
	};

	ReelModel.prototype.movement = function(delta, reel, distanceRemaining) {
		this.reels[reel].map(function(symbol) {
			symbol.y += delta;
			if (symbol.y >= this.bottomBorder) {
				symbol.y -= this.totalHeight;
				symbol.type = this.getNextSymbolType(distanceRemaining, symbol);
			}
		}.bind(this));
	};

	ReelModel.prototype.findDecelerationDistance = function(reel) {
		var max = Math.min();
		this.reels[reel].map(function(symbol) {
			if (Math.abs(symbol.y) < max) {
				max = symbol.y;
			}
		});
		this.deccelerationDistance = this.totalHeight - max;
		this.deccelerationDuration = this.deccelerationDistance / this.accelerationSpeed;
		console.log("credit-distance", this.deccelerationDistance, "when done", this.deccelerationDistance + max);
	};

	Object.defineProperty(ReelModel.prototype, "accelerationSpeed", {
		get: function() {
			return this.accelerationDistance / this.accelerationDuration;
		}
	});

	Object.defineProperty(ReelModel.prototype, "isSpinning", {
		get: function() {
			return this._isSpinning;
		},
		set: function(value) {
			this._isSpinning = value;
			if (value) {
				this.resetSession();
			}
		}
	});

	ReelModel.prototype.resetSession = function() {
		this._iterator = -1;
		this.finalSymbols = this.generateRandomReelTrack(this.NUM_ROWS);
		console.log("to win:", this.finalSymbols);
	};

	ReelModel.prototype.log = function(reel) {
		console.log("REEL", reel);
		this.reels[reel].map(function(symbol) {
			console.log(symbol.y);
		});
	};

	return ReelModel;
});
