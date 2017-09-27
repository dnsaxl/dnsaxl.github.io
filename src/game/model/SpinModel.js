make("SpinModel", function(Model, ClassUtil, Reel, gameModel) {
	"use strict";

	function SpinModel() {
		Model.apply(this, arguments);
		this.reels = [];
	}

	ClassUtil.extend(SpinModel, Model);

	SpinModel.prototype.init = function() {
		for (var i = 0; i < gameModel.numReels; i++) {
			this.reels[i] = new Reel(i);
		}
	};

	SpinModel.prototype.getSymbolAt = function(column, row) {
		return this.reels[column].getSymbolAt(row);
	};

	return SpinModel;
});
