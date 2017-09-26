make("Game", function(ClassUtil, assetsModel, view, msg, reelModel) {
	"use strict";

	function Game() {
		ClassUtil.bindAll(this);
		assetsModel.on("resources-changed", this.onAssetsLoaded);
		assetsModel.load();
	}

	Game.prototype.onAssetsLoaded = function() {
		reelModel.init();
	    view.init();
		setTimeout(function() {

		msg.emit(msg.EVENTS.GAME.RESIZE);
		}, 30);
	};

	return Game;
});
