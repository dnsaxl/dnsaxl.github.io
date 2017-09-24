make("Sprite", function(DisplayObject, ClassUtil, assetsModel) {
	"use strict";

	function Sprite(source) {
		DisplayObject.apply(this, arguments);
		this.setFrame(source);
		this.origWidth = this.image.width;
		this.origHeight = this.image.height;
	}

	ClassUtil.extend(Sprite, DisplayObject);

	Sprite.prototype.setFrame = function(source) {
		this.resource = assetsModel.resources[source];
		if (!this.resource || !this.resource.data) {
			throw Error("Wrong sprite source", source);
		}
		else {
			this.origWidth = this.resource.data.width;
			this.origHeight = this.resource.data.height;
		}
		this.image = this.resource.data;
	};

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

	Object.defineProperty(Sprite.prototype, "width", {
		get: function() {
			return this.scaleX * this.origWidth;
		},
		set: function(value) {
			this.scaleX = value / this.origWidth;
		}
	});

	Object.defineProperty(Sprite.prototype, "height", {
		get: function() {
			return this.scaleY * this.origHeight;
		},
		set: function(value) {
			this.scaleY = value / this.origHeight;
		}
	});

	return Sprite;
});
