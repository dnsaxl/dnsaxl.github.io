make("ReelModel", function(ClassUtil, Model) {
	"use strict";

	function ReelModel() {
		Model.apply(this, arguments);
		this.SYMBOLS_GAP = 200;
		this.REEL_GAP = 200;
		this.NUM_ROWS = 3;
		this.MIN_SPINNING_TIME = 3;
		this.accelerationDuration = 0.8;
		this.accelerationSpeed = 900;
	}

	ClassUtil.extend(ReelModel, Model);

	return ReelModel;
});
