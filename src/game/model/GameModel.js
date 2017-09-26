make("GameModel", function(ClassUtil, Model, stage) {
	"use strict";

	function GameModel() {
		Model.apply(this, arguments);
		this.stage = stage;
	}
	
	ClassUtil.extend(GameModel, Model);

	Object.defineProperty(GameModel.prototype, "canvas", {
		get: function() {
			return this.stage.canvas;
		}
	});

	return GameModel;
});
