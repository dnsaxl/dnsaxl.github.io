make("GameBackground", function(Container, Sprite, ClassUtil, msg, gameModel) {
	"use strict";

	function GameBackground() {
		Container.apply(this, arguments);
		this.SCALE_MODES = {
			SCALE_TO_FILL: 1,
			SCALE_TO_FIT: 3,
			NONE: 5
		};
		this.ALIGN_MODES = {
			LEFT: 1,
			CENTER: 2,
			RIGHT: 3,
			TOP: 4,
			BOTTOM: 5
		};

		this.scaleMode = this.SCALE_MODES.SCALE_TO_FILL;
		this.horizontalAlign = this.ALIGN_MODES.RIGHT;
		this.verticalAlign = this.ALIGN_MODES.TOP;

		this.image = this.createImage();

		msg.on(msg.EVENTS.GAME.RESIZE, this.onResize);
		this.onResize();
	}

	ClassUtil.extend(GameBackground, Container);

	GameBackground.prototype.createImage = function() {
		var image = new Sprite("images/BG.png");
		image.setAnchor(0.5);
		return this.addChild(image);
	};

	GameBackground.prototype.onResize = function(w, h) {
		w = w || gameModel.canvas.width;
		h = h || gameModel.canvas.height;
		if (this.scaleMode === this.SCALE_MODES.SCALE_TO_FILL) {
			this.scaleTo(this.image, w, h, true);
		}
		else if (this.scaleMode === this.SCALE_MODES.SCALE_TO_FIT) {
			this.scaleTo(this.image, w, h, false);
		}
		this.align();
	};

	GameBackground.prototype.scaleTo = function(target, w, h, fill) {
		var tr = target.origWidth / target.origHeight;
		var rw = w / h < tr;
		if ((fill && rw) || !fill && !rw) {
			target.height = h;
			target.width = h * tr;
		}
		else {
			target.width = w;
			target.height = w / tr;
		}
	};

	GameBackground.prototype.align = function() {
		this.image.x = this.getAlignOffset(this.image, this.horizontalAlign, "width");
		this.image.y = this.getAlignOffset(this.image, this.verticalAlign, "height");
	};

	GameBackground.prototype.getAlignOffset = function(target, align, dimension) {
		var a = gameModel.canvas[dimension], b = target[dimension];
		switch (align) {
			case(this.ALIGN_MODES.LEFT):
			case(this.ALIGN_MODES.TOP):
				return b / 2;
				break;
			case(this.ALIGN_MODES.CENTER):
				return a / 2;
				break;
			case(this.ALIGN_MODES.RIGHT):
			case(this.ALIGN_MODES.BOTTOM):
				return a - b / 2;
				break;
		}
	};

	return GameBackground;
});
