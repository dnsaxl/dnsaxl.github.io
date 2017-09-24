make("View", function(stage, GameBackground, SpinButton, SymbolsContainer) {
	"use strict";

	function View() {

	}

	View.prototype.init = function() {
		this.background = stage.addChild(new GameBackground());
		this.symbolsContainer = stage.addChild(new SymbolsContainer());
		this.spinButton = stage.addChild(new SpinButton());

	};

	return View;
});
