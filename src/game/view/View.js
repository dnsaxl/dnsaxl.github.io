make("View", function(stage, GameBackground, SpinButton) {
	"use strict";

	function View() {

	}

	View.prototype.init = function() {
		this.background = stage.addChild(new GameBackground());
		this.spinButton = stage.addChild(new SpinButton());
	};

	return View;
});
