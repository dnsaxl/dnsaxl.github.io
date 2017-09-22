make("Game", function(ClassUtil, assetsModel, view, msg) {
	"use strict";

	function Game() {
		ClassUtil.bindAll(this);
		assetsModel.load(this.onAssetsLoaded);
	}

	Game.prototype.onAssetsLoaded = function() {
	    view.init();
		setTimeout(function() {

		msg.emit(msg.EVENTS.GAME.RESIZE);
		}, 300);
	};

	return Game;
});
