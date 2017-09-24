make("ReelModel", function(ClassUtil, Model, MathUtil) {
	"use strict";

	function ReelModel() {
		Model.apply(this, arguments);
		this.NUM_ROWS = 3;
		this.NUM_COLUMNS = 1;
		this.SYMBOLS_GAP = 200;
		this.REEL_GAP = 200;
		this.MIN_SPINNING_TIME = 3;
		this.accelerationDuration = 0.8;
		this.accelerationDistance = 900;
		this.trackLength = 60;
		this.SYMBOL_TYPES = ["SYM1", "SYM3", "SYM4", "SYM5", "SYM6", "SYM7"];

		this.track = this.generateRandomReelTrack(this.trackLength);
		this._iterator = -1;
		console.log(this.track);
	}

	ClassUtil.extend(ReelModel, Model);

	ReelModel.prototype.generateRandomReelTrack = function(length) {
		var track = [];
		while (length--) {
			track.push(MathUtil.getRandomElement(this.SYMBOL_TYPES));
		}
		return track;
	};

	ReelModel.prototype.getNextSymbolType = function() {
		return this.track[++this._iterator % this.trackLength];
	};

	return ReelModel;
});
