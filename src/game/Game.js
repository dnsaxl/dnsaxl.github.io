make("Game", function(ClassUtil, assetsModel, view) {
	"use strict";

	function Game() {
		ClassUtil.bindAll(this);
		assetsModel.load(this.onAssetsLoaded);
	}

	Game.prototype.onAssetsLoaded = function() {
	    view.init();
	};

	return Game;
});
