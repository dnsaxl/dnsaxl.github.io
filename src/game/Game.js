make("Game", function(ClassUtil, assetsModel, view, msg, reelModel) {
	"use strict";

	function Game() {
		ClassUtil.bindAll(this);
		view.showSplashScreen();
		msg.emit(msg.EVENTS.GAME.RESIZE);
		console.log(view.splashScreen.x, view.splashScreen.y, view.splashScreen.width, view.splashScreen.height);
		assetsModel.on("resources-changed", this.onAssetsLoaded);
		assetsModel.load();
	}

	Game.prototype.onAssetsLoaded = function() {
		setTimeout(function() {
			reelModel.init();
			view.init();
			msg.emit(msg.EVENTS.GAME.RESIZE);
			view.hideSplashScreen();
		}, 1000);
	};

	return Game;
});
