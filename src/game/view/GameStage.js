make("GameStage", function(Stage, ClassUtil, Tween, msg) {
	"use strict";

	function GameStage() {
		Stage.apply(this, arguments);
	}

	ClassUtil.extend(GameStage, Stage);

	GameStage.prototype.onFrame = function() {
		Tween.tick();
		Stage.prototype.onFrame.apply(this, arguments);
		this.checkForResize();
		msg.emit(msg.EVENTS.GAME.FRAME);
	};


	GameStage.prototype.checkForResize = function() {
		var w = window.innerWidth;
		var h = window.innerHeight;
		if (w !== this.canvas.width || h !== this.canvas.height) {
			this.canvas.width = w;
			this.canvas.height = h;
			msg.emit(msg.EVENTS.GAME.RESIZE, w, h);
		}
	};

	return GameStage;
});
