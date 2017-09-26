make("Graphics", function(DisplayObject, ClassUtil) {
	"use strict";

	function Graphics() {
		DisplayObject.apply(this, arguments);
		this._commandsList = [];
		this.hasFillStyle = false;
		this.minX = 0;
		this.minY = 0;
		this.maxX = 0;
		this.maxY = 0;
	}

	ClassUtil.extend(Graphics, DisplayObject);

	Graphics.prototype.beginFill = function(color) {
		this._commandsList.push(["fillStyle", color]);
		this.hasFillStyle = true;
	};

	Graphics.prototype.drawRect = function(x, y, width, height) {
		this.minX = Math.min(this.minX, x);
		this.minY = Math.min(this.minY, y);
		this.maxX = Math.max(this.maxX, x + width);
		this.maxY = Math.max(this.maxY, y + height);

		this.origWidth = (this.maxX - this.minX);
		this.origHeight = (this.maxY - this.minY);

		if (this.hasFillStyle) {
			this._commandsList.push(["fillRect", arguments]);
		}
		else {
			this._commandsList.push(["strokeRect", arguments]);
		}
	};

	Graphics.prototype.render = function(renderer) {
		renderer.save();
		renderer.globalAlpha = this.world.alpha;
		renderer.globalCompositeOperation = this.blendMode;
		var cl = this._commandsList;
		for (var i = 0, j = cl.length; i < j; i++) {
			var c = cl[i];
			switch (c[0]) {
				case "fillStyle":
					renderer.fillStyle = c[1];
					break;
				case "fillRect" :
				case "strokeRect" :
					renderer[c[0]].apply(renderer, this.getFullCoords.apply(this, c[1]));
					break;
			}
		}
		renderer.restore();
	};

	Graphics.prototype.clear = function() {
		this._commandsList = null;
		this.minX = this.minY = this.maxX = this.maxY = 0;
	};

	Graphics.prototype.getFullCoords = function(x, y, w, h) {
		return [this.world.x + x * this.world.sx, this.world.y + y * this.world.sy, w * this.world.sx, h * this.world.sy];
	};

	return Graphics;
});
