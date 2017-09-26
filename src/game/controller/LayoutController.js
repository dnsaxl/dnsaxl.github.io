make("LayoutController", function(ClassUtil, msg, view, gameModel, layoutModel, ObjectUtil) {
	"use strict";

	function LayoutController() {
		ClassUtil.bindAll(this);
		msg.on(msg.EVENTS.GAME.RESIZE, this.onResize, msg.PRIORITY_LOWEST);
	}

	LayoutController.prototype.onResize = function(w, h) {

		if (view.splashScreen) {
			this.scale(view.splashScreen, layoutModel.splashScreen.scale);
			this.align(view.splashScreen, layoutModel.splashScreen.horizontal, layoutModel.splashScreen.vertical);
		}

		if (view.background) {
			this.scale(view.background, layoutModel.background.scale);
			this.align(view.background, layoutModel.background.horizontal, layoutModel.background.vertical);

			if (view.spinButton) {
				this.copyLayout(view.spinButton, view.background);
				view.spinButton.x += view.background.width * 0.41;
			}

			if (view.symbolsContainer) {
				this.copyLayout(view.symbolsContainer, view.background);
				view.symbolsContainer.x -= view.background.width * 0.055;
			}

			if (view.globalMask) {
				this.copyLayout(view.globalMask, view.background);
			}
		}
	};

	LayoutController.prototype.copyLayout = function(to, from) {
		ObjectUtil.mixinSpecific(to, from, ["x", "y", "scaleX", "scaleY"]);
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