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
		renderer.drawImage(this.image, w.x, w.y, w.w, w.h);
		renderer.restore();
	};

	return Sprite;
});
