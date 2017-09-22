make("LayoutController", function(ClassUtil, msg, view, gameModel, layoutModel) {
	"use strict";

	function LayoutController() {
		ClassUtil.bindAll(this);
		msg.on(msg.EVENTS.GAME.RESIZE, this.onResize, msg.PRIORITY_LOWEST);
	}

	LayoutController.prototype.onResize = function(w, h) {
		console.log("RESIZE", view.background);
		view.background.scaleX = view.background.scaleY = 0.5;
		view.background.x = view.background.width / 2;
		view.background.y = view.background.height / 2;
		console.log("bgw", view.background.width);
		
		// this.scale(view.background, layoutModel.background.scale);
		// this.align(view.background, layoutModel.background.horizontal, layoutModel.background.vertical);
		// console.log(view.background.x, view.background.y, view.background.width, view.background.height);
		// view.spinButton.scaleX = view.background.scaleX;
		// view.spinButton.scaleY = view.background.scaleY;
		// view.spinButton.x = view.background.x;// + view.background.width * 0.85;
		// view.spinButton.y = view.background.y;// + view.background.height * 0.5;

	};

	LayoutController.prototype.scale = function(target, mode) {
		switch (mode) {
			case layoutModel.SCALE.TO_FILL:
				return layoutModel.scaleToFill(target);
			case layoutModel.SCALE.TO_FIT:
				return layoutModel.scaleToFit(target);
		}
	};

	LayoutController.prototype.align = function(target, horizontal, vertical) {
		target.x = layoutModel.getAlignOffset(target, horizontal, "width");
		target.y = layoutModel.getAlignOffset(target, vertical, "height");
	};

	return LayoutController;
});