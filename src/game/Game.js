make("Game", function(ClassUtil, assetsModel, view, msg, reelModel) {
	"use strict";

	function Game() {
		ClassUtil.bindAll(this);
		assetsModel.load(this.onAssetsLoaded);
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
