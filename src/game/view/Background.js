make("Background", function(Sprite, ClassUtil, msg, gameModel) {
	"use strict";

	function Background() {
		Sprite.apply(this, arguments);
		this.SCALE_MODES = {
			SCALE_TO_FILL: 1,
			SCALE_TO_FIT: 3,
			NONE: 5
		};
		this.scaleMode = this.SCALE_MODES.SCALE_TO_FIT;
		msg.on(msg.EVENTS.GAME.RESIZE, this.onResize);
		this.onResize();
	}

	ClassUtil.extend(Background, Sprite);

	Background.prototype.onResize = function(w, h) {
		w = w || gameModel.canvas.width;
		h = h || gameModel.canvas.height;
		if (this.scaleMode === this.SCALE_MODES.SCALE_TO_FILL) {
			this.scaleToFill(w, h);
		}
		else if (this.scaleMode === this.SCALE_MODES.SCALE_TO_FIT) {
			this.scaleToFit(w, h);
		}
		this.align();
	};

	Background.prototype.scaleToFill = function(w, h) {
		var sr = w / h;
		var tr = this.origWidth / this.origHeight;
		if (sr < tr) {
			this.height = h;
			this.width = h * tr;
		}
		else {
			this.width = w;
			this.height = w / tr;
		}
	};

	Background.prototype.scaleToFit = function(w, h) {
		var sr = w / h;
		var tr = this.origWidth / this.origHeight;
		if (sr > tr) {
			this.height = h;
			this.width = h * tr;
		}
		else {
			this.width = w;
			this.height = w / tr;
		}
	};
	
	Background.prototype.align = function() {
	  this.x = gameModel.canvas.width / 2;
	  this.y = gameModel.canvas.height / 2;
	};

	return Background;
});
