make("ReelModel", function(ClassUtil, Model) {
	"use strict";

	function ReelModel() {
		Model.apply(this, arguments);
		this.SYMBOLS_GAP = 155;
		this.REEL_GAP = 200;
	}

	ClassUtil.extend(ReelModel, Model);

	return ReelModel;
});
