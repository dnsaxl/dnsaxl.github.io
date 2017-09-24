make("LayoutController", function(ClassUtil, msg, view, gameModel, layoutModel) {
	"use strict";

	function LayoutController() {
		ClassUtil.bindAll(this);
		msg.on(msg.EVENTS.GAME.RESIZE, this.onResize, msg.PRIORITY_LOWEST);
	}

	LayoutController.prototype.onResize = function(w, h) {

		this.scale(view.background, layoutModel.background.scale);
		this.align(view.background, layoutModel.background.horizontal, layoutModel.background.vertical);
		// view.background.setScale(0.5);
		// view.background.x = view.background.y = 200;

		view.spinButton.scaleX = view.background.scaleX;
		view.spinButton.scaleY = view.background.scaleY;
		view.spinButton.x = view.background.x + view.background.width * 0.41;
		view.spinButton.y = view.background.y;

		view.symbolsContainer.scaleX = view.background.scaleX;
		view.symbolsContainer.scaleY = view.background.scaleY;
		view.symbolsContainer.x = view.background.x;
		view.symbolsContainer.y = view.background.y;

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