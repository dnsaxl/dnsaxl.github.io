make("Game", function(ClassUtil, assetsModel, stage, GameBackground) {
	"use strict";

	function Game() {
		ClassUtil.bindAll(this);
		assetsModel.load(this.onAssetsLoaded);
	}

	Game.prototype.onAssetsLoaded = function() {
	    stage.addChild(new GameBackground());
	};

	return Game;
});
