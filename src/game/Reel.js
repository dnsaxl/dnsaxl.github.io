make("Reel", function(ReelController, ReelModel) {
	"use strict";

	function Reel(column) {
		this.model = new ReelModel(column);
		this.controller = new ReelController(this.model);
	}

	Reel.prototype.getSymbolAt = function(row) {
		return this.model.finalSymbols[row];
	};

	Object.defineProperty(Reel.prototype, "symbols", {
		get: function() {
			return this.model.symbols;
		}
	});

	return Reel;
});
