make("Game", function(ClassUtil, assetsModel, view, msg, reelModel) {
	"use strict";

	function Game() {
		ClassUtil.bindAll(this);
		view.showSplashScreen();
		msg.emit(msg.EVENTS.GAME.RESIZE);
		assetsModel.on("resources-changed", this.onAssetsLoaded);
		assetsModel.load();
	}

	Game.prototype.onAssetsLoaded = function() {
		setTimeout(function() {
			reelModel.init();
			view.init();
			msg.emit(msg.EVENTS.GAME.RESIZE);
			view.hideSplashScreen();
			msg.emit(msg.EVENTS.GAME.READY);
		}, 1000);
	};

	return Game;
});
