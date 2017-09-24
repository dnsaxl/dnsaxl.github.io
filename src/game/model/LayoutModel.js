make("LayoutModel", function(ClassUtil, Model, gameModel) {
	"use strict";

	function LayoutModel() {
		Model.apply(this, arguments);
		this.SCALE = {
			TO_FILL: 1,
			TO_FIT: 3,
			NONE: 5
		};
		this.ALIGN = {
			LEFT: 1,
			CENTER: 2,
			RIGHT: 3,
			TOP: 4,
			BOTTOM: 5
		};

		this.background = {
			scale: this.SCALE.TO_FIT,
			horizontal: this.ALIGN.CENTER,
			vertical: this.ALIGN.TOP
		};
	}

	ClassUtil.extend(LayoutModel, Model);

	LayoutModel.prototype.getAlignOffset = function(target, align, dimension) {
		var a = gameModel.canvas[dimension], b = target[dimension];
		switch (align) {
			case this.ALIGN.LEFT:
			case this.ALIGN.TOP:
				return b / 2;
				break;
			case this.ALIGN.CENTER:
				return a / 2;
				break;
			case this.ALIGN.RIGHT:
			case this.ALIGN.BOTTOM:
				return a - b / 2;
				break;
		}
	};

	LayoutModel.prototype.scaleToFill = function(target, w, h) {
		w = w || gameModel.canvas.width;
		h = h || gameModel.canvas.height;
		this.scaleTo(target, w, h, true);
	};

	LayoutModel.prototype.scaleToFit = function(target, w, h) {
		w = w || gameModel.canvas.width;
		h = h || gameModel.canvas.height;
		this.scaleTo(target, w, h, false);
	};

	LayoutModel.prototype.scaleTo = function(target, w, h, fill) {
		w = w || gameModel.canvas.width;
		h = h || gameModel.canvas.height;
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

	return LayoutModel;
});
