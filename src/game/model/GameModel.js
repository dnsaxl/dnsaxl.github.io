make("GameModel", function(stage) {
	"use strict";

	function GameModel() {
		this.stage = stage;
	}

	GameModel.prototype.getAssetsServerURL = function() {
	    return "./assets/";
	};

	Object.defineProperty(GameModel.prototype, "canvas", {
		get: function() {
			return this.stage.canvas;
		}
	});

	return GameModel;
});
