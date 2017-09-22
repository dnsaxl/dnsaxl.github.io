make("Sprite", function(DisplayObject, ClassUtil, assetsModel, MathUtil) {
	"use strict";

	function Sprite(source) {
		DisplayObject.apply(this, arguments);
		this.resource = assetsModel.resources[source];
		if (!this.resource || !this.resource.data) {
			throw Error("Wrong sprite source", source);
		}
		this.image = this.resource.data;
		this.origWidth = this.image.width;
		this.origHeight = this.image.height;
		this.anchorX = this.anchorY = 0;
	}

	ClassUtil.extend(Sprite, DisplayObject);

	Sprite.prototype.render = function(renderer) {
		DisplayObject.prototype.render.apply(this, arguments);
		if (!this.visible) {
			return;
		}
		var w = this.world;
		renderer.save();
		renderer.globalAlpha = w.alpha;
		renderer.drawImage(this.image,
			w.x - this.anchorX * this.width,
			w.y - this.anchorY * this.height,
			w.sx * this.origWidth,
			w.sy * this.origHeight
		);
		renderer.restore();
	};

	Sprite.prototype.hitTest = function(x, y) {
		var w = this.world;
		return MathUtil.containsPoint(
			w.x - this.anchorX * this.width,
			w.y - this.anchorY * this.height,
			w.sx * this.origWidth,
			w.sy * this.origHeight,
			x,
			y
		);
	};

	Sprite.prototype.setAnchor = function(value) {
		this.anchorX = this.anchorY = value;
	};

	return Sprite;
});
