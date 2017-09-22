make("GameStage", function(Stage, ClassUtil, Tween, msg, Observer) {
	"use strict";

	function GameStage() {
		Stage.apply(this, arguments);
		this.screenObserver = new Observer(window, ["innerWidth", "innerHeight"], this.onWindowResize);
	}

	ClassUtil.extend(GameStage, Stage);

	GameStage.prototype.onFrame = function() {
		Tween.tick();
		Stage.prototype.onFrame.apply(this, arguments);
		msg.emit(msg.EVENTS.GAME.FRAME);
	};

	GameStage.prototype.onWindowResize = function() {
		var w = window.innerWidth;
		var h = window.innerHeight;
		this.canvas.width = w;
		this.canvas.height = h;
		msg.emit(msg.EVENTS.GAME.RESIZE, w, h);
	};

	return GameStage;
});
